import mainLogo from "../../../assets/logo.svg";
import logoutLogo from "../../../assets/logout.svg";
import { motion } from "framer-motion";
import { icons, MAIN_MENU } from "./iconsAnimations.ts";
import { useState } from "react";

const SideBar = () => {
  // state to store current active tab
  const [currentActiveTab, setCurrentActiveTab] = useState<string>(MAIN_MENU);

  return (
    <div className="h-full w-full bg-primary py-4 flex flex-col justify-between items-center">
      <div className="flex justify-center">
        <img src={mainLogo} className="w-[50px] h-[50px]" alt="Main Logo" />
      </div>

      <div className="flex flex-col items-center gap-2">
        {icons.map((icon, index) => (
          <div
            className={`${currentActiveTab == icon.id && "border-r-2 border-secondary px-2 "}`}
          >
            <motion.div
              onClick={() => setCurrentActiveTab(icon.id)}
              id={icon.id}
              key={icon.id}
              className={`${currentActiveTab == icon.id && "bg-secondary"} overflow-none h-[50px] w-[50px] bg-gray-100 rounded-full flex items-center justify-center`}
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
          </div>
        ))}
      </div>

      <div className="cursor-pointer h-[50px] w-[50px] bg-gray-100 overflow-hidden rounded-full flex items-center justify-center bg-secondary hover:bg-secondary-700 transition-all duration-200">
        <motion.div
          whileHover={{ scale: 1.2, x: -5 }}
          className="flex items-center justify-center w-full h-full"
        >
          <img src={logoutLogo} className="w-[24px] h-[24px]" alt="Logout" />
        </motion.div>
      </div>
    </div>
  );
};

export default SideBar;