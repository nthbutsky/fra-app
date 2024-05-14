import clsx from "clsx";

export default function ButtonLufthansa({
  type = "primary",
  text = "",
  disabled = false,
  fullWidth = false,
  className,
  onClick,
}: {
  type?: string;
  text: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick: () => void;
}) {
  const handleClickOnButton = () => {
    onClick();
  };
  return (
    <button
      className={clsx(
        "group inline-flex justify-center rounded p-[10px]",
        {
          "bg-color-lufthansa-1": type === "primary",
          "bg-neutral-2": type === "secondary",
          "w-full": fullWidth,
          "bg-color-lufthansa-6": disabled,
          "hover:bg-color-lufthansa-4": !disabled,
        },
        className,
      )}
      type="button"
      disabled={disabled}
      onClick={handleClickOnButton}
    >
      <span
        className={clsx("font-lufthansa-4", {
          "text-neutral-2": type === "primary" && !disabled,
          "text-color-lufthansa-1": type === "secondary",
          "group-hover:text-neutral-2": !disabled,
        })}
      >
        {text}
      </span>
    </button>
  );
}
