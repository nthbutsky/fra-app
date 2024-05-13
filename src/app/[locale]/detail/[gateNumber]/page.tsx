"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import clsx from "clsx";

import DetailBgImage from "@/assets/images/detail-page-bg.png";

import Icon from "@/components/Icon";

import {
  EOperationName,
  QUERY,
  IFlightData,
  IFlightPayload,
} from "@/types/api/flight";
import { FORMAT } from "@/types/format";
import { ROUTE_LIST } from "@/types/route-list";

import { getFlightData } from "@/api/flight";
import { useTranslations } from "next-intl";
import { TLocale } from "@/lang/i18n";
import { EGateNumber } from "@/types/gate-number";
import useDateFormat from "@/utils/useDateFormat";
import { useIntervalTimer } from "@/utils/useIntervalTimer";
import Skeleton from "@/components/Skeleton";

export default function Detail({
  params: { locale, gateNumber },
}: {
  params: { locale: TLocale; gateNumber: string };
}) {
  const SECONDS_IN_MINUTE = 60;

  const [flightDetail, setFlightDetail] = useState({} as IFlightData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listExpired, setListExpired] = useState(false);
  const [walkingTime, setWalkingTime] = useState("");
  const [walkingTimeCardDisabled, setWalkingTimeCardDisabled] = useState(true);

  const router = useRouter();
  const t = useTranslations("page.detail");

  // Detail list
  const getFlightDetail = async () => {
    setLoading(true);

    try {
      const response = await getFlightData({
        operation: EOperationName.GET_UPCOMING,
        gate: {
          number:
            gateNumber === EGateNumber.AIRAIL ||
            gateNumber === EGateNumber.BWEST
              ? "a16"
              : gateNumber,
          type: "current_gate",
        },
        query: QUERY.FLIGHT_DETAILS,
      } as IFlightPayload);

      if ("errors" in response.data) {
        setError(true);
        console.log(response.data.errors);
        return;
      }

      const flightDetails = response?.data.filter(
        (flight: IFlightData) =>
          flight.flight_key === window.location.hash.substring(1),
      )[0];

      if (!flightDetails) {
        setListExpired(true);
        handleClickOnBack();
        return;
      }

      setFlightDetail(flightDetails);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Walking time card
  const handleClickOnWalkingTimeCard = () => {
    const startGate = gateNumber.toLowerCase();

    const depGate = flightDetail.dep_gate
      ? flightDetail.dep_gate
      : flightDetail.orig_dep_gate;

    const destGate = depGate?.toLowerCase().replace(/([a-z])0(?=\d)/g, "$1");

    router.push(
      `https://map.frankfurt-airport.com/?start=gate-${startGate}&dest=gate-${destGate}&utm_source=fraalliance&utm_medium=website&utm_campaign=passengerservices&utm_content=startseite`,
    );
  };
  useEffect(() => {
    if (
      !flightDetail?.walking_time_to_gate ||
      gateNumber === EGateNumber.AIRAIL ||
      gateNumber === EGateNumber.BWEST
    ) {
      setWalkingTime("");
      return;
    }

    const [minutes, seconds] = flightDetail.walking_time_to_gate
      .split(":")
      .map(Number);
    const totalMinutes = minutes + seconds / SECONDS_IN_MINUTE;

    if (totalMinutes < 1) {
      setWalkingTime(t("walkTimeLessMin"));
    } else {
      const roundedMinutes = Math.ceil(totalMinutes);
      setWalkingTime(`${roundedMinutes} ${t("walkTimeMin")}`);
    }
  }, [flightDetail]);
  useEffect(() => {
    setWalkingTimeCardDisabled(
      !flightDetail?.walking_time_to_gate ||
        gateNumber === EGateNumber.AIRAIL ||
        gateNumber === EGateNumber.BWEST,
    );
  }, [flightDetail]);

  useEffect(() => {
    useIntervalTimer({
      callback: getFlightDetail,
    });
  }, []);

  const handleClickOnRefresh = () => {
    getFlightDetail();
  };
  const handleClickOnBack = () => {
    router.back();
  };

  return (
    <main className="flex flex-col gap-4">
      {/* HEADER */}
      <div className="grid grid-cols-3 items-center px-5">
        {!error && (
          <button
            type="button"
            className="h-11 w-11 rounded-md border-[0.5px] border-neutral-1-12 bg-neutral-2-60 p-[10px]"
            onClick={handleClickOnBack}
          >
            <Icon name="chevronLeft" className="h-6 w-6 text-color-1" />
          </button>
        )}

        <div className="flex justify-center">
          {!loading && !error && (
            <div className="font-5 justify-self-center text-color-1">
              {t("flight") +
                flightDetail.airline_cd +
                " " +
                flightDetail.flight_number}
            </div>
          )}

          {error && <div>""</div>}
          {loading && (
            <Skeleton
              className="justify-self-center"
              height="14px"
              width="72px"
            />
          )}
        </div>

        {error && (
          <button
            type="button"
            className="h-11 w-11 justify-self-end p-[10px]"
            onClick={handleClickOnRefresh}
          >
            <Icon name="refresh" className="text-color-1" />
          </button>
        )}
      </div>

      <div className="px-5">
        {!error && (
          <div className="flex flex-col gap-4">
            {/* CANCELLED FLIGHT BANNER */}
            {Number(flightDetail.cancel_status) !== 0 && !loading && (
              <div className="flex gap-2 rounded-xl border border-error bg-error-12 px-6 py-4">
                <Icon name="warning" className="text-error" />

                <span className="font-7 text-error">
                  {t("cancelledFlight")}
                </span>
              </div>
            )}

            {/* INFO CARD */}
            {/* <aio-info-card
          :flight-data="flightDetail"
          :gate-type="'departure_gate'"
          :is-loading="isLoading"
          /> */}

            {/* TERMINALS & GATES CARD BEGINS */}
            <div className="flex h-[180px] w-full flex-row justify-between rounded-xl bg-neutral-2 px-6 py-[18px] shadow-40">
              {/* LEFT COL BEGINS */}
              <div className="flex flex-col items-start gap-3">
                <Icon name="departure" className="h-6 w-auto text-color-1" />

                {/* TERMINAL PART */}
                <div className="flex flex-col gap-1">
                  <div className="font-8 text-color-1-50">{t("terminal")}</div>

                  {!loading && (
                    <div className="font-5 text-color-1">
                      {flightDetail.dep_terminal
                        ? flightDetail.dep_terminal
                        : FORMAT.UNDEFINED}
                    </div>
                  )}

                  {loading && (
                    <div className="h-6">
                      <Skeleton className="mt-1" height="14px" width="22px" />
                    </div>
                  )}
                </div>

                {/* GATE PART */}
                <div className="flex flex-col gap-1">
                  <div className="font-8 text-color-1-50">{t("gate")}</div>

                  {!loading && (
                    <div className="font-5 text-color-1">
                      <span
                        className={clsx({
                          "line-through":
                            flightDetail.orig_dep_gate &&
                            flightDetail.orig_dep_gate !==
                              flightDetail.dep_gate,
                        })}
                      >
                        {flightDetail.orig_dep_gate
                          ? flightDetail.orig_dep_gate
                          : FORMAT.UNDEFINED}
                      </span>
                      {flightDetail.orig_dep_gate !== flightDetail.dep_gate && (
                        <span className="ml-1 text-error">
                          {flightDetail.dep_gate
                            ? flightDetail.dep_gate
                            : FORMAT.UNDEFINED}
                        </span>
                      )}
                    </div>
                  )}

                  {loading && (
                    <div className="h-6">
                      <Skeleton className="mt-1" height="14px" width="22px" />
                    </div>
                  )}
                </div>
              </div>
              {/* LEFT COL ENDS */}

              {/* RIGHT COL BEGINS */}
              <div className="flex flex-col items-end gap-3">
                <Icon name="arrival" className="h-6 w-auto text-color-1" />

                {/* TERMINAL PART */}
                <div className="flex flex-col items-end gap-1">
                  <div className="font-8 text-color-1-50">{t("terminal")}</div>

                  {!loading && (
                    <div className="font-5 text-color-1">
                      {flightDetail.arr_terminal
                        ? flightDetail.arr_terminal
                        : FORMAT.UNDEFINED}
                    </div>
                  )}

                  {loading && (
                    <div className="h-6">
                      <Skeleton className="mt-1" height="14px" width="22px" />
                    </div>
                  )}
                </div>

                {/* GATE PART */}
                <div className="flex flex-col items-end gap-1">
                  <div className="font-8 text-color-1-50">{t("gate")}</div>

                  {!loading && (
                    <div className="font-5 text-color-1">
                      {flightDetail.arr_gate
                        ? flightDetail.arr_gate
                        : FORMAT.UNDEFINED}
                    </div>
                  )}

                  {loading && (
                    <div className="h-6">
                      <Skeleton className="mt-1" height="14px" width="36px" />
                    </div>
                  )}
                </div>
              </div>
              {/* RIGHT COL ENDS */}
            </div>
            {/* TERMINALS & GATES CARD ENDS */}

            {/* DATE, BOARDING, CLOSE GATE CARD */}
            <div className="flex h-[84px] w-full flex-row justify-between gap-4 rounded-xl bg-neutral-2 px-6 py-[18px] shadow-40">
              {/* DATE PART */}
              <div className="flex flex-col gap-1">
                <div className="font-8 text-color-1-50">{t("date")}</div>

                {!loading && (
                  <div className="font-5 text-color-1">
                    {useDateFormat(
                      flightDetail.sched_dep_datetime_loc,
                      FORMAT.DATE,
                      locale,
                    )}
                  </div>
                )}

                {loading && (
                  <div className="h-6">
                    <Skeleton className="mt-[5px]" height="14px" width="48px" />
                  </div>
                )}
              </div>

              {/* BOARDING PART */}
              <div className="flex flex-col gap-1">
                <div className="font-8 text-color-1-50">{t("boarding")}</div>

                {!loading && (
                  <div className="font-5 text-color-1">
                    {useDateFormat(
                      flightDetail.sched_boarding_datetime_loc,
                      FORMAT.TIME,
                      locale,
                    )}
                  </div>
                )}

                {loading && (
                  <div className="h-6">
                    <Skeleton className="mt-[5px]" height="14px" width="48px" />
                  </div>
                )}
              </div>

              {/* GATE CLOSE PART */}
              <div className="flex flex-col gap-1">
                <div className="font-8 text-color-1-50">{t("closeGate")}</div>

                {!loading && (
                  <div className="font-5 text-color-1">
                    {useDateFormat(
                      flightDetail.gate_closure_datetime_loc,
                      FORMAT.TIME,
                      locale,
                    )}
                  </div>
                )}

                {loading && (
                  <div className="h-6">
                    <Skeleton className="mt-[5px]" height="14px" width="48px" />
                  </div>
                )}
              </div>
            </div>

            {/* CODESHARE CARD */}
            {/* <aio-codeshare
          :data="flightDetail.codeshare_fltnums"
          :is-loading="isLoading"
        /> */}

            {/* WALKING TIME TO GATE CARD */}
            <button
              disabled={walkingTimeCardDisabled}
              type="button"
              className="relative flex h-fit min-h-[132px] w-full flex-col items-center overflow-hidden rounded-xl bg-neutral-2 p-2 shadow-40"
              onClick={handleClickOnWalkingTimeCard}
            >
              <Image
                src={DetailBgImage}
                className="absolute left-1/2 top-1/2 h-[calc(100%-16px)] w-[calc(100%-16px)] -translate-x-1/2 -translate-y-1/2 rounded object-cover opacity-5"
                alt=""
              />

              <div className="absolute left-1/2 top-1/2 h-[calc(100%-16px)] w-[calc(100%-16px)] -translate-x-1/2 -translate-y-1/2 rounded bg-color-1 object-cover opacity-[0.02]" />

              <div className="flex flex-col items-center justify-start gap-[6px] p-3">
                <Icon name="route" className="text-color-1" />

                {!walkingTimeCardDisabled && (
                  <div className="font-8 text-center text-color-1-50">
                    {t("walkTimeText")}
                  </div>
                )}

                {!loading && walkingTime && (
                  <div className="font-2-header text-color-2">
                    {walkingTime}
                  </div>
                )}

                {!loading && !walkingTime && (
                  <div className="font-10 max-w-64 rounded-lg bg-color-1-05 px-2 py-1 text-color-1-50">
                    {t("walkTimeEmpty")}
                  </div>
                )}

                {loading && (
                  <Skeleton className="my-2" height="24px" width="68px" />
                )}

                {!walkingTimeCardDisabled && (
                  <div className="font-5 flex gap-2 text-color-1">
                    <span>{t("walkingTimeCta")}</span>
                    <Icon name="chevronRight" className="text-color-1" />
                  </div>
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
