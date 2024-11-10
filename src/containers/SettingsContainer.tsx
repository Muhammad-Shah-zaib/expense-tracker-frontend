import { RootState } from "../store/store.ts";
import { connect } from "react-redux";
import Settings from "../components/settings/Settings.tsx";

const mapStateToProps = ({
  userSlice: { firstname, lastname, username, image, email, token },
}: RootState) => ({
  firstname,
  lastname,
  username,
  email,
  image,
  token,
});

const SettingsContainer = connect(mapStateToProps)(Settings);

export default SettingsContainer;
