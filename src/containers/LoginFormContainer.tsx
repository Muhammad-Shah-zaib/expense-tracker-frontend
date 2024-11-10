import { bindActionCreators } from "@reduxjs/toolkit";
import loginApiThunk from "../store/user/LoginApi.ts";
import { AppDispatch, RootState } from "../store/store.ts";
import { connect } from "react-redux";
import LoginForm from "../components/Forms/LoginForm.tsx";

export type TMapStateToProps = (state: RootState) => {
  loading: boolean;
  errorMessage: string | null;
  loginSuccess: boolean;
};

export type TMapDispatchToProps = (dispatch: AppDispatch) => {
  loginApiThunk: typeof loginApiThunk;
};

const mapStateToProps: TMapStateToProps = (state) => {
  return {
    loading: state.userSlice.loginLoading,
    errorMessage: state.userSlice.loginErrorMessage,
    loginSuccess: state.userSlice.loginSuccess,
  };
};

const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
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
