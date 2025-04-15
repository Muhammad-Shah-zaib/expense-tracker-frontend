import menuLogo from "../../../assets/menu.svg";
import starLogo from "../../../assets/star.svg";
import notesLogo from "../../../assets/notes.svg";
import settingsLogo from "../../../assets/settings.svg";
import { NavBarOptions } from "../../../store/side-bar/types";

// id names for buttons on the sidebar
export const 
  DASHBOARD = "dashboard",
  MARKED = "marked-transactions",
  TRANSACTIONS = "transactions",
  // CHARTS = "charts",
  // CARDS = "cards",
  SETTINGS = "settings";

// defining types for icons object
export interface IIcon {
  id: NavBarOptions;
  src: string;
  scale: number;
  rotate: number;
  route: string;
}

export type IIcons = IIcon[];

// icons object for controlling animations
export const icons: IIcons = [
  { id: DASHBOARD, src: menuLogo, scale: 1.2, rotate: -45, route: "/charts" },
  {
    id: MARKED,
    src: starLogo,
    scale: 1.2,
    rotate: 0,
    route: "/marked-transactions",
  },
  {
    id: TRANSACTIONS,
    src: notesLogo,
    scale: 1.2,
    rotate: 0,
    route: "/transactions",
  },
  // { id: CARDS, src: cardsLogo, scale: 1.2, rotate: 0, route: "/atm-cards" },
  {
    id: SETTINGS,
    src: settingsLogo,
    scale: 1.2,
    rotate: -45,
    route: "/settings",
  },
];
