"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import TableRow from "@/components/TableRow"; // Assuming this is a custom component

import {
  EOperationName,
  QUERY,
  IFlightData,
  IFlightPayload,
} from "@/types/api/flight";

import { FORMAT } from "@/types/format";
import { EGateNumber } from "@/types/gate-number";

import { getFlightData } from "@/api/flight"; // Assuming this is your API fetching function
import Tooltip, { BODY_OFFSET, TOOLTIP_ALIGN } from "@/components/Tooltip";
import Icon from "@/components/Icon";
import { useTranslations } from "next-intl";
import { TLocale } from "@/lang/i18n";

// Assuming these are defined elsewhere
const SKELETON_ROW_NUMBER = 20;
const ROUTE_LIST = { DETAIL: "/your-detail-route/" }; // Replace with actual route

export default function List({
  params: { gateNumber, locale },
}: {
  params: { gateNumber: string; locale: TLocale };
}) {
  const [flightData, setFlightData] = useState([] as IFlightData[]);
  const [flightDataInitialList, setFlightDataInitialList] = useState(
    [] as IFlightData[],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isListExpired, setIsListExpired] = useState(false);

  const router = useRouter();

  const t = useTranslations("page.list");

  const handleClickOnBack = () => {
    router.back();
  };

  const getFlightList = async () => {
    setIsLoading(true);
    try {
      const response = await getFlightData({
        operation: EOperationName.GET_UPCOMING,
        gate: {
          number: gateNumber,
          type: "current_gate",
        },
        query: QUERY.FLIGHT_LIST,
      } as IFlightPayload);
      if ("errors" in response.data) {
        setIsError(true);
        console.error(response.data.errors);
        return;
      }
      setFlightData(response?.data);
      setFlightDataInitialList(response?.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const prepareItemForSearch = (payload: string, item: string | undefined) => {
    if (!item) {
      return false;
    }
    return item.toLowerCase().includes(payload.toLowerCase());
  };

  const searchItem = (payload: string) => {
    if (!payload) {
      setFlightData(flightDataInitialList);
    } else {
      setFlightData(
        flightDataInitialList.filter((item: IFlightData) => {
          return (
            prepareItemForSearch(payload, item.dest_name) ||
            prepareItemForSearch(payload, item.dest_name_de) ||
            prepareItemForSearch(payload, item.dest_iata_cd) ||
            prepareItemForSearch(
              payload,
              item.airline_cd + item.flight_number,
            ) ||
            prepareItemForSearch(payload, item.codeshare_fltnums)
          );
        }),
      );
    }
  };

  const onInput = (event) => {
    setSearchValue(event.target.value);
    searchItem(event.target.value);
  };

  const onReload = () => {
    setIsError(false);
    getFlightList();
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleToggleOnTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  const handleCloseOnTooltip = () => {
    setTooltipOpen(false);
  };

  const onRefresh = () => {
    getFlightList();
  };

  const onRowClick = (flightNumber) => {
    getFlightList();
    if (
      !flightDataInitialList.find((item) => item.flight_key === flightNumber)
    ) {
      setIsListExpired(true);
      setIsError(true);
      return;
    }
  };

  const handleClickOnRefresh = () => {
    getFlightList();
  };

  useEffect(() => {
    getFlightList();
    // const intervalId = setInterval(
    //   getFlightList /* Your desired interval time */,
    // );
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex flex-col px-5">
      <div className="mb-4 grid grid-cols-3 items-center">
        {/* BACK BUTTON */}
        <button
          type="button"
          className="h-11 w-11 rounded-md border-[0.5px] border-neutral-1-12 bg-neutral-2-60 p-[10px]"
          onClick={handleClickOnBack}
        >
          <Icon name="chevronLeft" className="text-color-1" />
        </button>

        {/* TITLE */}
        <span className="font-5 justify-self-center whitespace-nowrap text-color-1">
          {/* {{
          `${t("page.list.title")} – ${
            useDateFormat(new Date(), FORMAT.DATE, {
              locales: l[0],
            }).value
          }`
        }} */}
        </span>

        {/* REFRESH BUTTON */}
        <button
          type="button"
          className="h-11 w-11 justify-self-end p-[10px]"
          onClick={handleClickOnRefresh}
        >
          <Icon name="refresh" className="text-color-1" />
        </button>
      </div>

      {/* TOOLTIP */}
      <div className="mb-4 w-full">
        <Tooltip
          align={TOOLTIP_ALIGN.BOTTOM_RIGHT}
          bodyOffsetY={BODY_OFFSET.SPACE_2}
          bodyOffsetX={BODY_OFFSET.NO_OFFSET}
          detachBody={false}
          fullWidth={false}
          isOpen={tooltipOpen}
          onClose={() => handleCloseOnTooltip()}
        >
          <button
            type="button"
            className="font-10 flex w-full items-center justify-center gap-2 rounded-lg bg-color-2-05 p-2 text-color-1"
            onClick={handleToggleOnTooltip}
          >
            <div>{t("tooltip.trigger")}</div>
            <Icon name="info" className="text-color-1" />
          </button>
          <>{tooltipOpen && <div data-name="body">{t("tooltip.body")}</div>}</>
        </Tooltip>
      </div>

      {/* SEARCH */}
      {/* <aio-input
      v-model="searchValue"
      className="mb-4"
      :input-attrs="{
        type: 'search',
      }"
      :placeholder="t('page.list.search')"
      :icon="AioSearchIcon"
      @input="onInput($event)"
      @clear="searchIte */}

      {/* TABLE BEGINS */}
      <div>
        <div className="font-7 mb-2 grid grid-cols-4 px-3 text-color-1-50">
          <span className="col-span-2">{t("tableHeader.destination")}</span>
          <span>{t("tableHeader.flight")}</span>
          <span>{t("tableHeader.time")}</span>
        </div>

        {/* {isLoading && (
            <AioSkeletonTableList rowNumber={SKELETON_ROW_NUMBER} />
          )} */}

        {flightData.length > 0 && !isLoading && !isError && (
          <div className="no-scrollbar h-[calc(100dvh-258px)] overflow-auto rounded border-[1px] border-neutral-1-12 md:max-h-[calc(800px-258px)]">
            {flightData.map((row) => (
              <TableRow
                params={{ locale }}
                key={row.flight_key}
                data={row}
                // onClick={() => onRowClick(row.flight_key)}
              >
                {/* {Number(row.cancel_status) && (
                  <AioActivityLabel
                    label={t("page.list.activityLabel.cancelled")}
                    color="RED"
                  />
                )} */}
              </TableRow>
            ))}
          </div>
        )}

        {/* {flightData.length === 0 &&
            searchValue !== "" &&
            !isLoading &&
            !isError && (
              <div className="flex h-[calc(100dvh-258px)] items-center justify-center lg:max-h-[calc(800px-258px)]">
                {t("page.list.noSearchResultMessage")}
              </div>
            )}

          {isError && (
            <AioFetchError
              className="h-[calc(100dvh-258px)] justify-center md:max-h-[calc(800px-258px)]"
              message={
                isListExpired
                  ? t("page.list.fetchError.message.notFound")
                  : t("page.list.fetchError.message.wentWrong")
              }
              buttonText={t("page.list.fetchError.buttonText")}
              onClick={onReload}
            />
          )} */}
      </div>
      {/* TABLE ENDS */}
    </main>
  );
}
