import clsx from "clsx";
import ButtonLufthansa from "@/components/ButtonLufthansa";

export default function FetchError({
  className,
  message,
  buttonText,
  onClick,
}: {
  className: string;
  message: string;
  buttonText: string;
  onClick: () => void;
}) {
  const handleClickOnButton = () => {
    onClick();
  };

  return (
    <div className={clsx("flex flex-col items-center gap-4", className)}>
      <span className="font-lufthansa-2 text-color-lufthansa-1-60">
        {message}
      </span>

      <ButtonLufthansa text={buttonText} onClick={handleClickOnButton} />
    </div>
  );
}
