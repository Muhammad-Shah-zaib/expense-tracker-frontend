export interface ISideBarState {
    activeNav: NavBarOptions;
}

export type NavBarOptions = "dashboard" | "marked-transactions" | "transactions" | "settings";