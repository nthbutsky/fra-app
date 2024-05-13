import React from "react";

import clsx from "clsx";

export const SKELETON_COLOR = {
  DARK: "DARK",
  LIGHT: "LIGHT",
} as const;
type TObjectValues<T> = T[keyof T];
export type TSkeletonColor = TObjectValues<typeof SKELETON_COLOR>;

export default function Skeleton({
  height = "8px",
  width = "32px",
  color = SKELETON_COLOR.DARK,
  className,
}: {
  height?: string;
  width?: string;
  color?: TSkeletonColor;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded",
        {
          "bg-neutral-2-25": color === SKELETON_COLOR.LIGHT,
          "bg-color-9": color === SKELETON_COLOR.DARK,
        },
        className,
      )}
      style={{ width: width, height: height }}
    />
  );
}
