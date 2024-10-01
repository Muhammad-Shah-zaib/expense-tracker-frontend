import * as React from "react";
import SideBar from "../components/side-bar/SideBar.tsx";
import QuickMenu from "../components/quick-menu/QuickMenu.tsx";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.tsx";

const MasterLayout: React.FC = () => {
  return (
    <div className={`flex justify-center bg-primary-950 overflow-hidden`}>
      <div
        id={`master-layout-ctn`}
        className={`max-w-[1400px] grid grid-cols-6 w-screen h-screen`}
      >
        {/*SideBar*/}
        <div
          className={`col-span-2 grid grid-cols-6 w-full h-full bg-primary-900`}
        >
          <SideBar />
          <div className={`col-span-5`}>
            <QuickMenu />
          </div>
        </div>

        <div className={`col-span-4 bg-primary-900`}>
          {/* header with user image and search bar and add expense button */}
          <div className={`row-span-1`}>
            <Header />
          </div>
          <div className={`row-span-11`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
