import React, { useState } from "react";

import Skeleton, { SKELETON_COLOR } from "@/components/Skeleton";
import Icon from "@/components/Icon";

import clsx from "clsx";

import { LOCALE, TLocale } from "@/lang/i18n";

import useDateFormat from "@/utils/useDateFormat";

import { IFlightData } from "@/types/api/flight";
import { FORMAT } from "@/types/format";

export default function InfoCard({
  flightData,
  gateType,
  loading,
  locale,
  children,
}: {
  flightData: IFlightData;
  gateType: "departure_gate" | "arrival_gate";
  loading: boolean;
  locale: TLocale;
  children?: React.ReactNode;
}) {
  const [error, setError] = useState(false);

  const flightDurationTimeFormat = () => {
    if (flightData.flight_duration) {
      const [hours, minutes] = flightData.flight_duration
        .split(":")
        .map(Number);
      return `${hours > 0 ? `${hours}h` : ""}${minutes > 0 ? `${minutes}m` : ""}`;
    }
    return FORMAT.UNDEFINED;
  };

  return (
    <div
      className={clsx(
        "h-[170px] w-full rounded-xl shadow-20",
        gateType === "departure_gate" ? "bg-gradient-1" : "bg-gradient-2",
      )}
    >
      <div className="flex h-full flex-col justify-between px-7 py-5">
        <div>
          <div className="relative flex flex-row justify-between">
            {!loading && (
              <span
                className={clsx(
                  "font-8",
                  gateType === "departure_gate"
                    ? "text-neutral-2-50"
                    : "text-color-1-50",
                )}
              >
                {locale === LOCALE.DE
                  ? flightData.orig_name_de
                  : flightData.orig_name}
              </span>
            )}

            {loading && (
              <Skeleton
                className="mt-1"
                height="10px"
                width="72px"
                color={SKELETON_COLOR.LIGHT}
              />
            )}

            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              {children}
            </div>

            {!loading && (
              <span
                className={clsx(
                  "font-8",
                  gateType === "departure_gate"
                    ? "text-neutral-2-50"
                    : "text-color-1-50",
                )}
              >
                {locale === LOCALE.DE
                  ? flightData.dest_name_de
                  : flightData.dest_name}
              </span>
            )}

            {loading && (
              <Skeleton
                className="mt-1"
                height="10px"
                width="72px"
                color={SKELETON_COLOR.LIGHT}
              />
            )}
          </div>

          {/* ROW WITH AIRPORT CODES BEGINS */}
          <div className="flex flex-row justify-between">
            {!loading && (
              <span
                className={clsx(
                  "font-2-header",
                  gateType === "departure_gate"
                    ? "text-neutral-2"
                    : "text-color-1",
                )}
              >
                {flightData.orig_iata_cd
                  ? flightData.orig_iata_cd
                  : FORMAT.UNDEFINED}
              </span>
            )}

            {loading && (
              <Skeleton
                className="mt-3"
                height="26px"
                width="64px"
                color={SKELETON_COLOR.LIGHT}
              />
            )}

            {!loading && (
              <span
                className={clsx(
                  "font-2-header",
                  gateType === "departure_gate"
                    ? "text-neutral-2"
                    : "text-color-1",
                )}
              >
                {flightData.dest_iata_cd
                  ? flightData.dest_iata_cd
                  : FORMAT.UNDEFINED}
              </span>
            )}

            {loading && (
              <Skeleton
                className="mt-3"
                height="26px"
                width="64px"
                color={SKELETON_COLOR.LIGHT}
              />
            )}
          </div>
          {/* ROW WITH AIRPORT CODES END */}
        </div>

        {/* ROW WITH TIMES BEGINS */}
        <div className="relative flex flex-row items-end justify-between">
          {/* DEPARTURE TIMES BEGINS */}
          {!loading && (
            <span
              className={clsx(
                "font-5 flex flex-col",
                gateType === "departure_gate"
                  ? "text-neutral-2"
                  : "text-color-1",
              )}
            >
              {Number(flightData.departure_delay) !== 0 && (
                <span>
                  {useDateFormat(
                    flightData.best_dep_datetime_loc,
                    FORMAT.TIME,
                    locale,
                  )}
                </span>
              )}
              <span
                className={clsx({
                  "font-10 text-neutral-2-50 line-through": Number(
                    flightData.departure_delay,
                  ),
                })}
              >
                {useDateFormat(
                  flightData.sched_dep_datetime_loc,
                  FORMAT.TIME,
                  locale,
                )}
              </span>
            </span>
          )}

          {loading && (
            <Skeleton
              className="my-1"
              height="16px"
              width="40px"
              color={SKELETON_COLOR.LIGHT}
            />
          )}

          {/* DEPARTURE TIMES ENDS */}

          {/* CIRCLE POINT BEGINS */}
          {!loading && (
            <div
              className={clsx(
                "absolute left-1/2 h-[14px] w-[200px] -translate-x-1/2",
                {
                  "mb-[5px]": !Number(flightData.departure_delay),
                },
              )}
            >
              <Icon
                name="circlePoint"
                className={clsx(
                  "absolute bottom-0 left-5",
                  gateType === "departure_gate"
                    ? "text-neutral-2"
                    : "text-color-2",
                )}
              />
            </div>
          )}

          {!loading && (
            <div
              className={clsx(
                "absolute left-1/2 h-[14px] w-[200px] -translate-x-1/2",
                {
                  "mb-[5px]": !Number(flightData.departure_delay),
                },
              )}
            >
              <Icon
                name="circlePoint"
                className={clsx(
                  "absolute bottom-0 right-5",
                  gateType === "departure_gate"
                    ? "text-neutral-2"
                    : "text-color-2",
                )}
              />
            </div>
          )}
          {/* CIRCLE POINTS ENDS */}

          {/* FLIGHT + ANIMATION BEGINS */}
          {!loading && (
            <div
              className={clsx(
                "absolute bottom-[6px] left-1/2 h-[50px] w-[200px] -translate-x-1/2 overflow-hidden",
                { "mb-[5px]": !Number(flightData.departure_delay) },
              )}
            >
              <Icon
                name="flight"
                className={clsx(
                  "absolute left-1/2 top-[2px] z-10 -translate-x-1/2",
                  {
                    "text-neutral-2": gateType === "departure_gate",
                    "text-color-2": gateType === "arrival_gate",
                  },
                )}
              />

              <div
                className={clsx(
                  "absolute top-4 h-[200px] w-[200px] animate-spin-custom rounded-full border border-dashed opacity-30",
                  {
                    "text-neutral-2": gateType === "departure_gate",
                    "text-color-2": gateType === "arrival_gate",
                  },
                )}
              />
            </div>
          )}

          {/* FLIGHT + ANIMATION ENDS */}
          {!loading && (
            <span
              className={clsx("font-10 mb-[6px]", {
                "text-neutral-2": gateType === "departure_gate",
                "text-color-1": gateType === "arrival_gate",
              })}
            >
              {flightDurationTimeFormat()}
            </span>
          )}
          {loading && (
            <Skeleton
              className="mb-[6px]"
              height="10px"
              width="36px"
              color={SKELETON_COLOR.LIGHT}
            />
          )}

          {/* ARRIVAL TIMES BEGINS */}
          {!loading && (
            <span
              className={clsx("font-5 flex flex-col items-end", {
                "text-neutral-2": gateType === "departure_gate",
                "text-color-1": gateType === "arrival_gate",
              })}
            >
              {Number(flightData.departure_delay) !== 0 && (
                <span>
                  {useDateFormat(
                    flightData.best_arr_datetime_loc,
                    FORMAT.TIME,
                    locale,
                  )}
                </span>
              )}

              <span
                className={clsx({
                  "font-10 text-neutral-2-50 line-through": Number(
                    flightData.departure_delay,
                  ),
                })}
              >
                {useDateFormat(
                  flightData.sched_arr_datetime_loc,
                  FORMAT.TIME,
                  locale,
                )}
              </span>
            </span>
          )}

          {loading && (
            <Skeleton
              className="my-1"
              height="16px"
              width="40px"
              color={SKELETON_COLOR.LIGHT}
            />
          )}
          {/* ARRIVAL TIMES ENDS */}
        </div>
        {/* ROW WITH TIMES ENDS */}
      </div>
    </div>
  );
}
