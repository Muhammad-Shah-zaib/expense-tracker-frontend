import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "./shared/layouts/MasterLayout.tsx";
import Charts from "./components/charts/Charts.tsx";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AtmCards from "./components/atm-cards/AtmCards.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import Transactions from "./components/transactions/Transactions";

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
              <Route
                path={`/`}
                element={<Navigate to={`/atm-cards`} />}
              ></Route>
              <Route path={`/`} element={<MasterLayout />}>
                <Route path={`atm-cards`} element={<AtmCards />} />
                <Route path={`charts`} element={<Charts />}></Route>
                <Route path={`transactions`} element={<Transactions />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </Provider>
  );
}

export default App;
