import React from "react";

import FlightInformation from "@/assets/icons/flight-information.svg";
import Navigation from "@/assets/icons/navigation.svg";
import Lounge from "@/assets/icons/lounge.svg";
import Experience from "@/assets/icons/experience.svg";
import Restroom from "@/assets/icons/restroom.svg";
import Playground from "@/assets/icons/playground.svg";
import Fountain from "@/assets/icons/fountain.svg";
import Smoking from "@/assets/icons/smoking.svg";
import Service from "@/assets/icons/service.svg";
import Map from "@/assets/icons/map.svg";
import Upgrade from "@/assets/icons/upgrade.svg";
import BoardingProcess from "@/assets/icons/boarding-process.svg";
import Games from "@/assets/icons/games.svg";
import Shop from "@/assets/icons/shop.svg";
import Delights from "@/assets/icons/delights.svg";
import ChevronLeft from "@/assets/icons/chevron-left.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";
import Refresh from "@/assets/icons/refresh.svg";
import Info from "@/assets/icons/info.svg";
import Close from "@/assets/icons/close.svg";
import Search from "@/assets/icons/search.svg";
import Warning from "@/assets/icons/warning.svg";
import Arrival from "@/assets/icons/arrival.svg";
import Departure from "@/assets/icons/departure.svg";
import Route from "@/assets/icons/route.svg";
import CirclePoint from "@/assets/icons/circle-point.svg";
import Flight from "@/assets/icons/flight.svg";

interface IconProps {
  className?: string;
}

export interface IconMap {
  flightInformation: React.ComponentType<IconProps>;
  navigation: React.ComponentType<IconProps>;
  lounge: React.ComponentType<IconProps>;
  experience: React.ComponentType<IconProps>;
  restroom: React.ComponentType<IconProps>;
  playground: React.ComponentType<IconProps>;
  fountain: React.ComponentType<IconProps>;
  smoking: React.ComponentType<IconProps>;
  service: React.ComponentType<IconProps>;
  map: React.ComponentType<IconProps>;
  upgrade: React.ComponentType<IconProps>;
  boardingProcess: React.ComponentType<IconProps>;
  games: React.ComponentType<IconProps>;
  shop: React.ComponentType<IconProps>;
  delights: React.ComponentType<IconProps>;
  chevronLeft: React.ComponentType<IconProps>;
  chevronRight: React.ComponentType<IconProps>;
  refresh: React.ComponentType<IconProps>;
  info: React.ComponentType<IconProps>;
  close: React.ComponentType<IconProps>;
  search: React.ComponentType<IconProps>;
  warning: React.ComponentType<IconProps>;
  arrival: React.ComponentType<IconProps>;
  departure: React.ComponentType<IconProps>;
  route: React.ComponentType<IconProps>;
  circlePoint: React.ComponentType<IconProps>;
  flight: React.ComponentType<IconProps>;
}

const iconTypes: IconMap = {
  flightInformation: FlightInformation,
  navigation: Navigation,
  lounge: Lounge,
  experience: Experience,
  restroom: Restroom,
  playground: Playground,
  fountain: Fountain,
  smoking: Smoking,
  service: Service,
  map: Map,
  upgrade: Upgrade,
  boardingProcess: BoardingProcess,
  games: Games,
  shop: Shop,
  delights: Delights,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  refresh: Refresh,
  info: Info,
  close: Close,
  search: Search,
  warning: Warning,
  arrival: Arrival,
  departure: Departure,
  route: Route,
  circlePoint: CirclePoint,
  flight: Flight,
};

export default function Icon({
  name,
  className,
}: {
  name: keyof IconMap;
  className?: string;
}) {
  let Icon = iconTypes[name];
  return <Icon {...{ className }} />;
}
