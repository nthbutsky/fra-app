import clsx from "clsx";

export const ACTIVITY_LABEL_COLOR = {
  BLUE: "BLUE",
  GREEN: "GREEN",
  WHITE: "WHITE",
  RED: "RED",
} as const;
type TObjectValues<T> = T[keyof T];
export type TActivityLabelColor = TObjectValues<typeof ACTIVITY_LABEL_COLOR>;

export default function ActivityLabel({
  label,
  color,
}: {
  label?: string;
  color: TActivityLabelColor;
}) {
  return (
    <div className="flex flex-row items-center gap-1">
      <div
        className={clsx("h-2 w-2 rounded-full", {
          "animate-pulse-custom-blue bg-color-2": color === "BLUE",
          "animate-pulse-custom-green bg-success": color === "GREEN",
          "animate-pulse-custom-blue bg-neutral-2": color === "WHITE",
          "animate-pulse-custom-red bg-error": color === "RED",
        })}
      />
      {label && (
        <span
          className={clsx("font-10", {
            "text-color-2": color === "BLUE",
            "text-success": color === "GREEN",
            "text-neutral-2": color === "WHITE",
            "text-error": color === "RED",
          })}
        >
          {label}
        </span>
      )}
    </div>
  );
}
