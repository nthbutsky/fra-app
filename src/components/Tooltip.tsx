import clsx from "clsx";

import React, { useState, useRef, useEffect } from "react";

export const TOOLTIP_ALIGN = {
  BOTTOM_CENTER: "BOTTOM_CENTER",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
  TOP_CENTER: "TOP_CENTER",
  TOP_LEFT: "TOP_LEFT",
  TOP_RIGHT: "TOP_RIGHT",
} as const;

export const BODY_OFFSET = {
  SPACE_6_NEGATIVE: "-24px",
  SPACE_5_NEGATIVE: "-20px",
  SPACE_4_NEGATIVE: "-16px",
  SPACE_3_NEGATIVE: "-12px",
  SPACE_2_NEGATIVE: "-8px",
  SPACE_1_NEGATIVE: "-4px",
  NO_OFFSET: "0px",
  SPACE_1: "4px",
  SPACE_2: "8px",
  SPACE_3: "12px",
  SPACE_4: "16px",
  SPACE_5: "20px",
  SPACE_6: "24px",
} as const;

type TObjectValues<T> = T[keyof T];

export type TTooltipAlign = TObjectValues<typeof TOOLTIP_ALIGN>;
export type TBodyOffset = TObjectValues<typeof BODY_OFFSET>;

export default function Tooltip({
  align = TOOLTIP_ALIGN.BOTTOM_CENTER,
  bodyOffsetY = BODY_OFFSET.NO_OFFSET,
  bodyOffsetX = BODY_OFFSET.NO_OFFSET,
  detachBody = false,
  fullWidth = false,
  isOpen = false,
  onClose,
  children,
}: {
  align?: TTooltipAlign;
  bodyOffsetY?: TBodyOffset;
  bodyOffsetX?: TBodyOffset;
  detachBody?: boolean;
  fullWidth?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const bodyOffsetStyle = () => {
    switch (align) {
      case TOOLTIP_ALIGN.BOTTOM_CENTER:
        return { top: `calc(100% + ${bodyOffsetY})` };
      case TOOLTIP_ALIGN.BOTTOM_LEFT:
        return { top: `calc(100% + ${bodyOffsetY})`, left: `${bodyOffsetX}` };
      case TOOLTIP_ALIGN.BOTTOM_RIGHT:
        return { top: `calc(100% + ${bodyOffsetY})`, right: `${bodyOffsetX}` };
      case TOOLTIP_ALIGN.TOP_CENTER:
        return { bottom: `calc(100% + ${bodyOffsetY})` };
      case TOOLTIP_ALIGN.TOP_LEFT:
        return {
          bottom: `calc(100% + ${bodyOffsetY})`,
          left: `${bodyOffsetX}`,
        };
      case TOOLTIP_ALIGN.TOP_RIGHT:
        return {
          bottom: `calc(100% + ${bodyOffsetY})`,
          right: `${bodyOffsetX}`,
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className={detachBody ? "static" : "relative"}>
      {children[0]}
      {isOpen && (
        <div
          className={clsx(
            "font-8 absolute z-40 h-fit w-[200px] rounded-md bg-color-1 p-3 text-start text-neutral-2 shadow-40 before:absolute before:h-0 before:w-0 before:border-b-[8px] before:border-l-[8px] before:border-r-[8px] before:border-b-color-1 before:border-l-transparent before:border-r-transparent before:content-['']",
            {
              "w-full": fullWidth,
              "left-1/2 -translate-x-1/2 before:-top-2 before:left-1/2 before:-translate-x-1/2":
                align === TOOLTIP_ALIGN.BOTTOM_CENTER,
              "left-1/2 -translate-x-1/2 before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:rotate-180":
                align === TOOLTIP_ALIGN.TOP_CENTER,
              "-left-4 before:-top-2 before:left-[17px]":
                align === TOOLTIP_ALIGN.BOTTOM_LEFT,
              "-left-4 before:-bottom-2 before:left-[17px] before:rotate-180":
                align === TOOLTIP_ALIGN.TOP_LEFT,
              "-right-4 before:-top-2 before:right-[17px]":
                align === TOOLTIP_ALIGN.BOTTOM_RIGHT,
              "-right-4 before:-bottom-2 before:right-[17px] before:rotate-180":
                align === TOOLTIP_ALIGN.TOP_RIGHT,
            },
          )}
          style={bodyOffsetStyle()}
        >
          {children[1]}
        </div>
      )}
    </div>
  );
}
