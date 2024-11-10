import { bindActionCreators } from "@reduxjs/toolkit";
import loginApiThunk from "../store/user/LoginApi.ts";
import { AppDispatch } from "../store/store.ts";
import { connect } from "react-redux";
import LoginForm from "../components/Forms/LoginForm.tsx";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      loginApiThunk,
    },
    dispatch,
  );
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default LoginFormContainer;
