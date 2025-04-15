import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavBarOptions } from "./types";

// Define the state interface
export interface ISideBarState {
  activeNav: string;
  isOpen: boolean;
}

// Initial state
const initialState: ISideBarState = {
  activeNav: "dashboard",
  isOpen: true,
};

// Create the slice
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    // Action to set active navigation item
    setActiveNav: (state, action: PayloadAction<NavBarOptions>) => {
      state.activeNav = action.payload;
    },
    // Optional: Action to toggle sidebar open/close state
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Export actions
export const { setActiveNav, toggleSidebar } = sidebarSlice.actions;

// Export reducer
export default sidebarSlice.reducer;
