import * as React from "react";
import SideBar from "../components/side-bar/SideBar.tsx";
import QuickMenu from "../components/quick-menu/QuickMenu.tsx";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.tsx";

const MasterLayout: React.FC = () => {
  return (
    // main ctn
    <div className={`flex justify-center bg-primary-950 overflow-hidden`}>
      {/* grid of 6 cols */}
      <div
        id={`master-layout-ctn`}
        className={`max-w-[1400px] grid grid-cols-6 w-screen h-screen`}
      >
        {/*SideBar & quickMenu - ctn - col-span-2 - grid of 6 cols*/}
        <div
          className={`sm:col-span-2 grid sm:grid-cols-6 w-full h-full bg-primary-900`}
        >
          <SideBar />
          {/* quick menu ctn - only for desktops */}
          <div className={`hidden sm:block sm:col-span-5`}>
            <QuickMenu />
          </div>
        </div>

        <div className={`col-span-5 sm:col-span-4 bg-primary-900`}>
          {/* header with user image and search bar and add expense button */}
          <div className={`max-h-[100px]`}>
            <Header />
          </div>
          <div className={`h-full`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
