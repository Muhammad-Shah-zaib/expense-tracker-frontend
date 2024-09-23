import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "./shared/layouts/MasterLayout.tsx";
import Charts from "./components/charts/Charts.tsx";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <div className={`font-roboto text-gray-100`}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<Navigate to={`/home`} />}></Route>
            <Route path={`/home`} element={<MasterLayout />}>
              <Route path={``} element={<Charts />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
