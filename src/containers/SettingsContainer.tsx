import { RootState } from "../store/store.ts";
import { connect } from "react-redux";
import Settings from "../components/settings/Settings.tsx";

const mapStateToProps = ({
  userSlice: { name, username, image, email },
}: RootState) => ({
  name,
  username,
  email,
  image,
});

const SettingsContainer = connect(mapStateToProps)(Settings);

export default SettingsContainer;
