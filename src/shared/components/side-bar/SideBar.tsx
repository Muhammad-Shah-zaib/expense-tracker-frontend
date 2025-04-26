import mainLogo from "../../../assets/logo.svg";
import logoutLogo from "../../../assets/logout.svg";
import { motion } from "framer-motion";
import { icons } from "./iconsAnimations.ts";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../../store/user/userSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/store.ts";
import { setActiveNav } from "../../../store/side-bar/sideBarSlice.ts";
import { useEffect } from "react";
import { NavBarOptions } from "../../../store/side-bar/types.ts";

// props interface
interface ISideBarProps {
  setIsBarOpen: (newState: boolean) => void;
}

const SideBar = ({ setIsBarOpen }: ISideBarProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeNav = useAppSelector((state) => state.sideBarSlice.activeNav);

  // Sync active tab with URL path
  useEffect(() => {
    let path = location.pathname.split("/")[1] || "dashboard";
    if (path === "charts") path = "dashboard";
    dispatch(setActiveNav(path as NavBarOptions));
  }, [location, dispatch]);

  return (
    <div className="h-full max-h-[1024px] w-full bg-primary py-4 flex flex-col justify-between items-center overflow-hidden">
      <div className="flex justify-center">
        <img src={mainLogo} className="w-[50px] h-[50px]" alt="Main Logo" />
      </div>

      <div className="flex flex-col items-center gap-2">
        {icons.map((icon, index) => (
          <Link
            key={icon.id}
            to={icon.route}
            className={`${activeNav === icon.id && "border-r-2 border-secondary px-2"}`}
            onClick={() => setIsBarOpen(false)}
          >
            <motion.div
              onClick={() => dispatch(setActiveNav(icon.id))}
              id={icon.id}
              className={`${activeNav === icon.id && "bg-secondary"} overflow-none h-[50px] w-[50px] bg-gray-100 rounded-full flex items-center justify-center`}
              whileHover={{
                scale: icon.scale,
                rotate: icon.rotate,
              }}
            >
              <motion.div
                whileHover={{
                  scale: icon.scale,
                }}
                className={`w-full h-full flex items-center justify-center`}
              >
                <motion.img
                  src={icon.src}
                  alt={`Icon ${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="cursor-pointer h-[50px] w-[50px] overflow-hidden rounded-full flex items-center justify-center bg-secondary hover:bg-secondary-700 transition-all duration-200">
        <motion.div
          whileHover={{ scale: 1.2, x: -5 }}
          onClick={() => dispatch(logout())}
          className="flex items-center justify-center w-full h-full"
        >
          <img src={logoutLogo} className="w-[24px] h-[24px]" alt="Logout" />
        </motion.div>
      </div>
    </div>
  );
};

export default SideBar;
