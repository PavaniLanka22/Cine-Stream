import {
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import CommunityReviews from "../pages/CommunityReviews";
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

        <Route
          path="/reviews"
          element={<CommunityReviews />}
        />
      </Routes>
    </>
  );
}

export default AppRoutes;