import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "./shared/layouts/MasterLayout.tsx";
import Charts from "./components/charts/Charts.tsx";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AtmCards from "./components/atm-cards/AtmCards.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import TransactionContainer from "./containers/TransactionContainer.tsx";
import MarkedTransactionContainer from "./containers/MarkedTransactionContainer.tsx";
import SettingsContainer from "./containers/SettingsContainer.tsx";
import Login from "./components/Login/Login.tsx";
import AuthGuard from "./guards/AuthGuard.tsx";
import SignUp from "./shared/pages/SignUp.tsx";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <Provider store={store}>
      <div className={`font-roboto text-gray-100`}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path={`/`} element={<Navigate to={`/login`} />}></Route>
              <Route path={"/login"} element={<Login />} />
              <Route path={`/signup`} element={<SignUp />} />
              <Route path={"/"} element={<AuthGuard />}>
                <Route path={`/`} element={<MasterLayout />}>
                  <Route path={`atm-cards`} element={<AtmCards />} />
                  <Route path={`charts`} element={<Charts />} />
                  <Route
                    path={`transactions`}
                    element={<TransactionContainer />}
                  />
                  <Route
                    path={"/marked-transactions"}
                    element={<MarkedTransactionContainer />}
                  />
                  <Route path={`settings`} element={<SettingsContainer />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </Provider>
  );
}

export default App;
