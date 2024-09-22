import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "./shared/layouts/MasterLayout.tsx";

function App() {
  return (
    <div className={`font-roboto`}>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Navigate to={`/home`} />}></Route>
          <Route path={`/home`} element={<MasterLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
