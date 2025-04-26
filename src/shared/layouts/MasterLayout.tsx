import * as React from "react";
import SideBar from "../components/side-bar/SideBar.tsx";
import QuickMenu from "../components/quick-menu/QuickMenu.tsx";
import { Outlet } from "react-router-dom";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Header from "../../components/Header/Header.tsx";
import { useMediaQuery } from "react-responsive";

const MasterLayout: React.FC = () => {
  const isTablet = useMediaQuery({
    query: "(max-width: 900px)",
  });
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(
    isTablet ? false : true
  );

  const ToggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-center bg-primary-950 overflow-hidden">
      <div
        id="master-layout-ctn"
        className="max-w-[1400px] grid grid-cols-10 w-screen h-screen"
      >
        {/* Sidebar and QuickMenu container */}
        <div
          className={`
            transition-all duration-200 bg-primary-900 h-full
            ${isSideBarOpen ? "w-[80px]" : "w-0"} 
            xl:w-auto xl:col-span-3 xl:grid xl:grid-cols-6
            absolute xl:static z-10
          `}
        >
          <SideBar setIsBarOpen={setIsSideBarOpen} />
          {/* QuickMenu only on xl and up */}
          <div className="hidden xl:block col-span-5">
            <QuickMenu />
          </div>
        </div>

        {/* Main content */}
        <div
          className={`
            transition-all duration-200 bg-primary-900 h-full
            col-span-10 xl:col-span-7
            ${isSideBarOpen ? "ml-[80px]" : "ml-0"} 
            xl:ml-0
          `}
        >
          {/* Toggle Button - visible only below xl */}
          <div className="relative max-h-[100px]">
            <div
              onClick={ToggleSideBar}
              className={`
                absolute xl:hidden block top-5 left-4 z-20
                transition-all duration-200
              `}
            >
              <ExpandCircleDownIcon
                className={`${
                  isSideBarOpen ? "rotate-90" : "-rotate-90"
                } transition-all duration-200`}
              />
            </div>
            <Header />
          </div>

          {/* Page content */}
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
