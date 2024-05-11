"use client";

import Image from "next/image";

import clsx from "clsx";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

import Modal from "@/components/Modal";
import Icon from "@/components/Icon";

import LufthansaLightLogo from "@/assets/images/lufthansa-logo-light.svg";
import GateImage from "@/assets/images/gate.jpg";

import { TILE, ITile } from "@/types/tile";
import { ROUTE_LIST } from "@/types/route-list";

export default function Gate({
  params: { gateNumber },
}: {
  params: { gateNumber: string };
}) {
  const [airportMapModalOpen, setAirportMapModalOpen] = useState(false);
  const [moreComfortModalOpen, setMoreComfortModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);

  const router = useRouter();

  const t = useTranslations("page.gate");

  // TILES FOR PAGE
  const pageTileList: ITile[] = [
    {
      name: TILE.GATE_FLIGHT_INFORMATION,
      icon: Icon({ name: "flightInformation" }),
      text: t("tile.gateFlightInformation"),
      link: `${ROUTE_LIST.LIST}/gateNumber`,
    },
    {
      name: TILE.AIRPORT_MAP,
      icon: Icon({ name: "navigation" }),
      text: t("tile.airportMap"),
      link: () => {
        setAirportMapModalOpen(true);
      },
    },
    {
      name: TILE.MORE_COMFORT,
      icon: Icon({ name: "lounge" }),
      text: t("tile.comfort"),
      link: () => {
        setMoreComfortModalOpen(true);
      },
    },
    {
      name: TILE.EXPERIENCE,
      icon: Icon({ name: "experience" }),
      text: t("tile.experience"),
      link: () => {
        setExperienceModalOpen(true);
      },
    },
    {
      name: TILE.PROBLEMS_WITH_FLIGHT,
      text: t("tile.problemsWithFlight"),
      link: `${ROUTE_LIST.SERVICE_CENTER_IRREG}/gateNumber`,
    },
    {
      name: TILE.SHARE_FEEDBACK,
      text: t("tile.shareFeedback"),
      link: "https://umfrage.fraalliance.de/index.php/696878",
    },
  ];

  // TILES FOR AIRPORT MAP MODAL
  const airportMapModalTileList: ITile[] = [
    {
      name: TILE.RESTROOM,
      icon: Icon({ name: "restroom" }),
      text: t("airportMapModal.tile.restroom"),
      // TODO: Add correct link
      link: "#",
    },
    {
      name: TILE.PLAYGROUND,
      icon: Icon({ name: "playground" }),
      text: t("airportMapModal.tile.playground"),
      // TODO: Add correct link
      link: "#",
    },
    {
      name: TILE.DRINKING_FOUNTAIN,
      icon: Icon({ name: "fountain" }),
      text: t("airportMapModal.tile.drinkingFountain"),
      // TODO: Add correct link
      link: "#",
    },
    {
      name: TILE.SMOKING_LOUNGE,
      icon: Icon({ name: "smoking" }),
      text: t("airportMapModal.tile.smokingLounge"),
      // TODO: Add correct link
      link: "#",
    },
    {
      name: TILE.LH_SERVICE_CENTER,
      icon: Icon({ name: "service" }),
      text: t("airportMapModal.tile.lhServiceCenter"),
      // TODO: Add correct link
      link: "#",
    },
    {
      name: TILE.ENTIRE_MAP,
      icon: Icon({ name: "map" }),
      text: t("airportMapModal.tile.entireMap"),
      // TODO: Add correct link
      link: "#",
    },
  ];

  const handleClickOnTile = async (tile: ITile) => {
    if (typeof tile.link === "function") {
      tile.link();
    } else {
      router.push(tile.link);
    }
  };

  // TILES FOR MORE COMFORT MODAL
  const moreComfortModalTileList: ITile[] = [
    {
      name: TILE.SEAT_UPGRADE,
      icon: Icon({ name: "upgrade" }),
      text: t("moreComfortModal.tile.seatUpgrade"),
      link: ROUTE_LIST.SEAT_UPGRADE,
    },
    {
      name: TILE.LOUNGE_ACCESS,
      icon: Icon({ name: "lounge" }),
      text: t("moreComfortModal.tile.loungeAccess"),
      link: t("moreComfortModal.tile.loungeAccessLink"),
    },
    {
      name: TILE.BOARDING_PROCESS,
      icon: Icon({ name: "boardingProcess" }),
      text: t("moreComfortModal.tile.boardingProcess"),
      link: t("moreComfortModal.tile.boardingProcessLink"),
    },
  ];

  // TILES FOR EXPERIENCE MODAL
  const experienceModalTileList: ITile[] = [
    {
      name: TILE.GAMES,
      icon: Icon({ name: "games" }),
      text: t("experienceModal.tile.play"),
      link: "https://frawards.fra-alliance.com/web/welcome?sc=20",
    },
    {
      name: TILE.SHOP,
      icon: Icon({ name: "shop" }),
      text: t("experienceModal.tile.shop"),
      link: t("experienceModal.tile.shopLink"),
    },
    {
      name: TILE.DELIGHTS,
      icon: Icon({ name: "delights" }),
      text: t("experienceModal.tile.delights"),
      link: t("experienceModal.tile.delightsLink"),
    },
  ];

  return (
    <main>
      {/* HEADER BACKGROUND */}
      <div className="absolute -top-4 left-0 -z-10 h-[170px] w-full bg-color-lufthansa-1" />

      <div>
        {/* HEADER */}
        <div className="mt-4 flex justify-between px-5">
          <div className="flex flex-col">
            <div className="font-5 text-neutral-2">{t("title")}</div>
            <span className="font-2-header text-neutral-2">
              {t("subtitle")} {gateNumber}
            </span>
          </div>
          <Image
            src={LufthansaLightLogo}
            className="h-5 w-28"
            alt="Lufthansa Logo"
          />
        </div>
        {/* HERO IMAGE */}
        <figure className="mx-5 mt-5 h-[200px] w-[calc(100%-40px)] overflow-hidden rounded-xl">
          <Image
            className="relative left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-xl object-cover"
            src={GateImage}
            alt="Gate Image"
          />
        </figure>
        {/* TILES */}
        <div className="px-5">
          <div className="mt-6 grid grid-cols-2 justify-center gap-[10px]">
            {pageTileList.map((tile, index) => {
              return (
                <button
                  key={tile.name}
                  type="button"
                  className={clsx(
                    "flex aspect-square w-full flex-col items-start justify-between self-stretch rounded-xl bg-neutral-2-60 p-5 text-left shadow-40 max-[300px]:p-3",
                    {
                      "h-full place-self-end": index === 0 || index === 2,
                      "h-full place-self-start": index === 1 || index === 3,
                      "col-span-2 h-16 text-center": index === 4 || index === 5,
                    },
                  )}
                  onClick={() => handleClickOnTile(tile)}
                >
                  {tile.icon && (
                    <figure className="h-12 text-color-lufthansa-1 max-[300px]:hidden">
                      {tile.icon}
                    </figure>
                  )}

                  <span className="font-lufthansa-4 w-full overflow-hidden text-ellipsis text-color-lufthansa-1">
                    {tile.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AIRPORT MAP MODAL */}
      <Modal
        isOpen={airportMapModalOpen}
        onClose={() => setAirportMapModalOpen(false)}
        title={t("airportMapModal.title")}
      >
        <div>
          <div className="mt-6 grid grid-cols-2 justify-center gap-[10px]">
            {airportMapModalTileList.map((tile, index) => {
              return (
                <button
                  key={tile.name}
                  type="button"
                  className={clsx(
                    "flex aspect-square w-full flex-col items-start justify-between self-stretch rounded-xl bg-neutral-2-60 p-5 text-left shadow-40 max-[300px]:p-3",
                    {
                      "h-full place-self-end": index === 0 || index === 2,
                      "h-full place-self-start": index === 1 || index === 3,
                    },
                  )}
                  onClick={() => handleClickOnTile(tile)}
                >
                  {tile.icon && (
                    <figure className="h-12 text-color-lufthansa-1 max-[300px]:hidden">
                      {tile.icon}
                    </figure>
                  )}
                  <span className="font-lufthansa-4 w-full overflow-hidden text-ellipsis text-color-lufthansa-1">
                    {tile.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* MORE COMFORT MODAL */}
      <Modal
        isOpen={moreComfortModalOpen}
        onClose={() => setMoreComfortModalOpen(false)}
        title={t("moreComfortModal.title")}
      >
        <div>
          <div className="mt-6 grid justify-items-stretch gap-y-[10px]">
            {moreComfortModalTileList.map((tile, index) => {
              return (
                <button
                  key={tile.name}
                  type="button"
                  className={clsx(
                    "grid h-24 w-full grid-cols-[48px_auto] items-center gap-5 rounded-xl bg-neutral-2-60 p-5 text-left shadow-40",
                    {
                      "h-full place-self-end": index === 0 || index === 2,
                      "h-full place-self-start": index === 1 || index === 3,
                    },
                  )}
                  onClick={() => handleClickOnTile(tile)}
                >
                  {tile.icon && (
                    <figure className="h-12 w-12 text-color-lufthansa-1">
                      {tile.icon}
                    </figure>
                  )}
                  <span className="font-lufthansa-4 w-full overflow-hidden text-ellipsis text-color-lufthansa-1">
                    {tile.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* EXPERIENCE MODAL */}
      <Modal
        isOpen={experienceModalOpen}
        onClose={() => setExperienceModalOpen(false)}
        title={t("experienceModal.title")}
      >
        <div>
          <div className="mt-6 grid justify-items-stretch gap-y-[10px]">
            {experienceModalTileList.map((tile, index) => {
              return (
                <button
                  key={tile.name}
                  type="button"
                  className="grid h-24 w-full grid-cols-[48px_auto] items-center gap-5 rounded-xl bg-neutral-2-60 p-5 text-left shadow-40"
                  onClick={() => handleClickOnTile(tile)}
                >
                  {tile.icon && (
                    <figure className="h-12 w-12 text-color-lufthansa-1">
                      {tile.icon}
                    </figure>
                  )}
                  <span className="font-lufthansa-4 w-full overflow-hidden text-ellipsis text-color-lufthansa-1">
                    {tile.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
    </main>
  );
}
