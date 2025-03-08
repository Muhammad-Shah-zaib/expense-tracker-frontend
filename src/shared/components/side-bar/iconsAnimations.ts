import menuLogo from "../../../assets/menu.svg";
import starLogo from "../../../assets/star.svg";
import notesLogo from "../../../assets/notes.svg";
import chartsLogo from "../../../assets/charts.svg";
import cardsLogo from "../../../assets/cards.svg";
import settingsLogo from "../../../assets/settings.svg";

// id names for buttons on the sidebar
export const MAIN_MENU = "main-menu",
  MARKED = "marked",
  RECEIPTS = "receipts",
  CHARTS = "charts",
  // CARDS = "cards",
  SETTINGS = "settings";

// defining types for icons object
export interface IIcon {
  id: string;
  src: string;
  scale: number;
  rotate: number;
  route: string;
}

export type IIcons = IIcon[];

// icons object for controlling animations
export const icons: IIcons = [
  { id: MAIN_MENU, src: menuLogo, scale: 1.2, rotate: -45, route: "/charts" },
  {
    id: MARKED,
    src: starLogo,
    scale: 1.2,
    rotate: 0,
    route: "/marked-transactions",
  },
  {
    id: RECEIPTS,
    src: notesLogo,
    scale: 1.2,
    rotate: 0,
    route: "/transactions",
  },
  { id: CHARTS, src: chartsLogo, scale: 1.2, rotate: 0, route: "/charts" },
  // { id: CARDS, src: cardsLogo, scale: 1.2, rotate: 0, route: "/atm-cards" },
  {
    id: SETTINGS,
    src: settingsLogo,
    scale: 1.2,
    rotate: -45,
    route: "/settings",
  },
];
