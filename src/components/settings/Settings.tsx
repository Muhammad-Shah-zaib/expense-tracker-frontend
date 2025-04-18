import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

// prop type
export interface ISettingsProps {
  firstname: string;
  lastname: string;
  username: string;
  image: string;
  email: string;
}

// component
const Settings = ({
  firstname,
  lastname,
  username,
  // email,
}: ISettingsProps) => {
  return (
    <div className={`w-full h-full overflow-auto`}>
      <div className={`flex flex-col gap-6 max-w-[650px] px-4`}>
        {/*  PROFILE CTN */}
        <div className={`flex flex-col gap-4`}>
          {/*  HEADER*/}
          <div
            className={`border-b-2 border-primary flex justify-between items-center`}
          >
            <span className={`font-bold text-2xl text-gray-100`}>Profile</span>
            <IconButton>
              <EditIcon />
            </IconButton>
          </div>
          {/* Content */}
          <div className={`flex flex-col gap-2 text-primary-200 px-4`}>
            {/* Name */}
            <div className={`grid grid-cols-3 items-center`}>
              <span>Name</span>
              <span className={`col-span-2`}>
                {firstname} {lastname}
              </span>
            </div>
            {/* username */}
            <div className={`grid grid-cols-3 items-center`}>
              <span>Username</span>
              <span className={`col-span-2`}>{username}</span>
            </div>
            {/* Email
            <div className={`grid grid-cols-3 items-center`}>
              <span>Email</span>
              <span className={`col-span-2`}>{email}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
