import { TLocale } from "@/lang/i18n";
import { FORMAT } from "@/types/format";

export default function useDateFormat(
  input: string | undefined | Date,
  format: { [key: string]: string | boolean },
  locale: TLocale,
) {
  if (!input) {
    return FORMAT.UNDEFINED;
  }
  return typeof input === "string"
    ? new Date(input).toLocaleString(locale, format)
    : input.toLocaleString(locale, format);
}
