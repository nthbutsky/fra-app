import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Icon from "@/components/Icon";

import { IFlightData } from "@/types/api/flight";
import { FORMAT } from "@/types/format";

import { LOCALE, TLocale } from "@/lang/i18n";

export default function TableRow({
  data,
  params: { locale },
  children,
}: {
  data: IFlightData;
  params: { locale: TLocale };
  children: React.ReactNode;
}) {
  // const [codeshareList, setCodeshareList] = useState<string[]>([]);

  // useEffect(() => {
  //   if (!data.codeshare_fltnums) {
  //     setCodeshareList([FORMAT.UNDEFINED]);
  //     return;
  //   }
  //   setCodeshareList(
  //     data.codeshare_fltnums
  //       .split("/")
  //       .map((code) => `${code.slice(0, 2)} ${code.slice(2)}`),
  //   );
  // }, [data.codeshare_fltnums]);

  // const formattedDepartureTime = () => {
  //   if (!Number(data.departure_delay)) {
  //     return data.sched_dep_datetime_loc
  //       ? new Date(data.sched_dep_datetime_loc).toLocaleTimeString([], {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         })
  //       : FORMAT.UNDEFINED;
  //   }
  //   if (data.best_dep_datetime_loc) {
  //     return new Date(data.best_dep_datetime_loc).toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //   }
  //   return FORMAT.UNDEFINED;
  // };

  // const defaultLanguageText = () => {
  //   return l.includes("de") && data.dest_name_de
  //     ? data.dest_name_de
  //     : data.dest_name;
  // };

  return (
    <div className="h-16 w-full cursor-pointer border-b border-neutral-1-12 bg-neutral-2 p-3">
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
                {data.sched_dep_datetime_loc
                  ? new Date(data.sched_dep_datetime_loc).toLocaleTimeString(
                      locale,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      },
                    )
                  : FORMAT.UNDEFINED}
              </span>
            ) : (
              <span className="text-error">
                {data.best_dep_datetime_loc
                  ? new Date(data.best_dep_datetime_loc).toLocaleTimeString(
                      locale,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      },
                    )
                  : FORMAT.UNDEFINED}
              </span>
            )}
          </div>
          <Icon name="chevronRight" className="text-color-2" />
        </div>

        <div className="col-span-2">{children}</div>
        <div>
          {/* <TextCarousel
            animationDirection="up"
            itemList={codeshareList}
            containerHeight={12} // Assuming constant value
            animationInterval={4000} // Assuming constant value
            animationDuration={1000} // Assuming constant value
            className="font-10 text-color-1 opacity-50"
          /> */}
        </div>
        {Number(data.departure_delay) !== 0 && (
          <div className="font-10 text-color-1-50 line-through">
            {new Date(data.sched_dep_datetime_loc).toLocaleTimeString(locale, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        )}
      </div>
    </div>
  );
}
