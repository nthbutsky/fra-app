"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Tooltip, { BODY_OFFSET, TOOLTIP_ALIGN } from "@/components/Tooltip";
import Icon from "@/components/Icon";

export default function List() {
  const router = useRouter();

  const t = useTranslations("page.list");

  const handleClickOnBack = () => {
    router.back();
  };

  const handleClickOnRefresh = () => {
    getFlightList();
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleToggleOnTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  const handleCloseOnTooltip = () => {
    setTooltipOpen(false);
  };

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

        <div
          v-if="flightData.length > 0 && !isLoading && !isError"
          className="no-scrollbar h-[calc(100dvh-258px)] overflow-auto rounded border-[1px] border-neutral-1-12 md:max-h-[calc(800px-258px)]"
        >
          {/* <template
          v-for="row in flightData"
          :key="row.flight_key"
        >
          <aio-table-row
            :data="row"
            @click="onRowClick(row.flight_key)"
          >
            <aio-activity-label
              v-if="Number(row.cancel_status)"
              :label="t('page.list.activityLabel.cancelled')"
              :color="'RED'"
            />
          </aio-table-row>
        </template> */}
        </div>
      </div>
      {/* TABLE ENDS */}
    </main>
  );
}
