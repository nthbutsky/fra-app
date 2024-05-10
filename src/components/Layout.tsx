"use client";

import { usePathname } from "next/navigation";
import { ROUTE_LIST } from "@/types/route-list";
import { useTranslations } from "next-intl";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("common");

  const handleClickOnLink = (url: string) => {
    window.location.href = url;
  };

  const linkList = [
    {
      text: t("imprint"),
      url: "https://www.fraalliance.de/imprint",
    },
    {
      text: t("privacy"),
      url: `${ROUTE_LIST.PRIVACY}`,
    },
  ];

  return (
    <div
      id="layout"
      className="no-scrollbar relative mx-auto flex max-h-full min-h-dvh flex-col justify-between overflow-auto bg-neutral-2 lg:max-h-[800px] lg:min-h-[800px] lg:max-w-[430px]"
    >
      <div className="relative z-10">
        <div className="mx-auto max-w-[390px] pt-4">
          <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 mx-auto overflow-hidden lg:max-h-[800px] lg:min-h-[800px] lg:max-w-[430px]">
            <div className="absolute -right-[30%] top-[500px] h-[300px] w-[422px] bg-gradient-radial from-color-lufthansa-1 to-transparent blur-[100px] sm:right-[5%] md:right-[10%] lg:-right-[30%]" />
          </div>
          {children}

          <div className="relative z-10 mx-auto flex w-full max-w-[390px] justify-center gap-[10px] px-5 pb-5 pt-[10px]">
            {linkList.map((link, index) => (
              <button
                key={index}
                className="font-7 px-[10px] py-[6px] text-color-5"
                type="button"
                disabled={
                  index === 1 && usePathname().includes(ROUTE_LIST.PRIVACY)
                }
                onClick={() => handleClickOnLink(link.url)}
              >
                {link.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
