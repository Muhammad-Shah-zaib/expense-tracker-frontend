import { RootState } from "../store/store.ts";
import { connect } from "react-redux";
import Settings from "../components/settings/Settings.tsx";

const mapStateToProps = ({
  userSlice: { firstname, lastname, username, image, email },
}: RootState) => ({
  firstname,
  lastname,
  username,
  email,
  image,
});

const SettingsContainer = connect(mapStateToProps)(Settings);

export default SettingsContainer;
