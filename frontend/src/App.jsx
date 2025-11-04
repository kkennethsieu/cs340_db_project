import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import FestivalsPage from "./pages/FestivalsPage";
import ArtistsPage from "./pages/ArtistsPage";
import SponsorsPage from "./pages/SponsorsPage";
import StaffPage from "./pages/StaffPage";
import VendorsPage from "./pages/VendorsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/festivals" element={<FestivalsPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
