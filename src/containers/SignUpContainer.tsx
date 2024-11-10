import { AppDispatch, RootState } from "../store/store.ts";
import { SignUpApiThunk } from "../store/user/SignUpApi.tsx";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import SignUpForm from "../components/Forms/SignUpForm.tsx";

export type TMapStateToProps = (state: RootState) => {
  loading: boolean;
  errorMessage: string | null;
  success: boolean;
};

export type TMapDispatchToProps = (dispatch: AppDispatch) => {
  signUpApiThunk: typeof SignUpApiThunk;
};

const mapStateToProps: TMapStateToProps = (state) => ({
  loading: state.userSlice.signUpLoading,
  errorMessage: state.userSlice.signUpErrorMessage,
  success: state.userSlice.singUpSuccess,
});

const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signUpApiThunk: SignUpApiThunk,
    },
    dispatch,
  );
};

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);

export default SignUpContainer;
