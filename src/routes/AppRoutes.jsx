import {
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import Favorites from "../pages/Favorites";
import Home from "../pages/Home";

function AppRoutes() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />
      </Routes>
    </>
  );
}

export default AppRoutes;