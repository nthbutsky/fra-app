"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "@/navigation";

import TableRow from "@/components/TableRow";
import Input from "@/components/Input";
import ActivityLabel from "@/components/ActivityLabel";
import Tooltip, { BODY_OFFSET, TOOLTIP_ALIGN } from "@/components/Tooltip";
import Icon from "@/components/Icon";
import SkeletonTable from "@/components/SkeletonTable";

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
import { TAppPathname, TLocale } from "@/lang/i18n";
import useDateFormat from "@/utils/useDateFormat";
import { useIntervalTimer } from "@/utils/useIntervalTimer";

export default function List({
  params: { locale, gateNumber },
}: {
  params: { locale: TLocale; gateNumber: string };
}) {
  const SKELETON_ROW_NUMBER = 20;

  const [flightList, setFlightList] = useState([] as IFlightData[]);
  const [flightDataInitialList, setFlightDataInitialList] = useState(
    [] as IFlightData[],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [listExpired, setListExpired] = useState(false);

  const router = useRouter();
  const t = useTranslations("page.list");

  // List data
  const getFlightList = async () => {
    setLoading(true);
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
        setError(true);
        console.error(response.data.errors);
        return;
      }
      setFlightList(response?.data);
      setFlightDataInitialList(response?.data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Search
  const prepareItemForSearch = (payload: string, item: string | undefined) => {
    if (!item) {
      return false;
    }
    return item.toLowerCase().includes(payload.toLowerCase());
  };
  const searchItem = (payload: string) => {
    if (!payload) {
      setFlightList(flightDataInitialList);
    } else {
      setFlightList(
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
  const handleSearchOnInput = (value: string) => {
    setSearchValue(value);
    searchItem(value);
  };

  // Tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleToggleOnTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  const handleCloseOnTooltip = () => {
    setTooltipOpen(false);
  };

  const handleClickOnTableRow = (flightNumber: string) => {
    getFlightList();
    if (
      !flightDataInitialList.find((item) => item.flight_key === flightNumber)
    ) {
      setListExpired(true);
      setError(true);
      return;
    }
    router.push(
      `${ROUTE_LIST.DETAIL}/${gateNumber}#${flightNumber}` as TAppPathname,
    );
  };
  const handleClickOnRefresh = () => {
    getFlightList();
  };
  const handleClickOnBack = () => {
    router.back();
  };

  useEffect(() => {
    useIntervalTimer({
      callback: getFlightList,
    });
  }, []);

  return (
    <main className="flex flex-col px-5">
      {/* HEADER */}
      <div className="mb-4 grid grid-cols-3 items-center">
        <button
          type="button"
          className="h-11 w-11 rounded-md border-[0.5px] border-neutral-1-12 bg-neutral-2-60 p-[10px]"
          onClick={handleClickOnBack}
        >
          <Icon name="chevronLeft" className="h-6 w-6 text-color-1" />
        </button>

        <span className="font-5 justify-self-center whitespace-nowrap text-color-1">
          {t("title")} – {useDateFormat(new Date(), FORMAT.DATE, locale)}
        </span>

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
          bodyOffsetX={BODY_OFFSET.SPACE_4}
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
      <Input
        className="mb-4"
        type="search"
        placeholder={t("search")}
        icon="search"
        value={searchValue}
        onChange={(event) => handleSearchOnInput(event.target.value)}
        onClear={() => setSearchValue("")}
      />

      {/* TABLE BEGINS */}
      <div>
        <div className="font-7 mb-2 grid grid-cols-4 px-3 text-color-1-50">
          <span className="col-span-2">{t("tableHeader.destination")}</span>
          <span>{t("tableHeader.flight")}</span>
          <span>{t("tableHeader.time")}</span>
        </div>

        {loading && <SkeletonTable rowNumber={SKELETON_ROW_NUMBER} />}

        {flightList.length > 0 && !loading && !error && (
          <div className="no-scrollbar h-[calc(100dvh-258px)] overflow-auto rounded border-[1px] border-neutral-1-12 md:max-h-[calc(800px-258px)]">
            {flightList.map((row) => (
              <TableRow
                params={{ locale }}
                key={row.flight_key}
                data={row}
                onClick={() => handleClickOnTableRow(row.flight_key)}
              >
                <></>
                {Number(row.cancel_status) !== 0 && (
                  <ActivityLabel
                    label={t("activityLabel.cancelled")}
                    color="RED"
                  />
                )}
              </TableRow>
            ))}
          </div>
        )}

        {/* TODO: implement table fetch error ui */}
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
