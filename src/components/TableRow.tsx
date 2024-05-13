import React, { useState, useEffect } from "react";

import Icon from "@/components/Icon";
import TextCarousel, {
  ETextCarouselDirection,
} from "@/components/TextCarousel";

import { IFlightData } from "@/types/api/flight";
import { FORMAT } from "@/types/format";

import { LOCALE, TLocale } from "@/lang/i18n";

import useDateFormat from "@/utils/useDateFormat";

export default function TableRow({
  data,
  params: { locale },
  children,
  onClick,
}: {
  data: IFlightData;
  params: { locale: TLocale };
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [codeshareList, setCodeshareList] = useState<string[]>([]);

  useEffect(() => {
    if (!data.codeshare_fltnums) {
      setCodeshareList([""]);
      return;
    }
    setCodeshareList(
      data.codeshare_fltnums
        .split("/")
        .map((code) => `${code.slice(0, 2)} ${code.slice(2)}`),
    );
  }, [data.codeshare_fltnums]);

  return (
    <div
      className="h-16 w-full cursor-pointer border-b border-neutral-1-12 bg-neutral-2 p-3"
      onClick={onClick}
    >
      <div className="grid grid-cols-4 gap-1">
        <div className="font-5 col-span-2 overflow-hidden text-ellipsis whitespace-nowrap text-color-1">
          {(locale === LOCALE.DE ? data.dest_name_de : data.dest_name) ||
            FORMAT.UNDEFINED}
        </div>
        <div className="font-6 text-color-1">
          {data.airline_cd + " " + data.flight_number || FORMAT.UNDEFINED}
        </div>
        <div className="flex justify-between">
          <div className="font-5">
            {!Number(data.departure_delay) ? (
              <span className="text-color-2">
                {useDateFormat(
                  data.sched_dep_datetime_loc,
                  FORMAT.TIME,
                  locale,
                )}
              </span>
            ) : (
              <span className="text-error">
                {useDateFormat(data.best_dep_datetime_loc, FORMAT.TIME, locale)}
              </span>
            )}
          </div>
          <Icon name="chevronRight" className="text-color-2" />
        </div>

        <div className="col-span-2">{children}</div>
        <div>
          <TextCarousel
            animationDirection={ETextCarouselDirection.UP}
            itemList={codeshareList}
            containerHeight={12}
            animationInterval={4000}
            animationDuration={1000}
            itemClass="font-10 text-color-1 opacity-50"
          />
        </div>
        {Number(data.departure_delay) !== 0 && (
          <div className="font-10 text-color-1-50 line-through">
            {useDateFormat(data.sched_dep_datetime_loc, FORMAT.TIME, locale)}
          </div>
        )}
      </div>
    </div>
  );
}
