import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ArtistsPage from "./pages/ArtistsPage";
import FestivalsPage from "./pages/FestivalsPage";
import HomePage from "./pages/HomePage";
import SponsorsPage from "./pages/SponsorsPage";
import StaffPage from "./pages/StaffPage";
import VendorsPage from "./pages/VendorsPage";

import PerformancesPage from "./pages/PerformancesPage";
import SponsorshipsPage from "./pages/SponsorshipsPage";
import StaffAssignmentsPage from "./pages/StaffAssignmentsPage";
import StagesPage from "./pages/StagesPage";
import VendorAssignmentsPage from "./pages/VendorAssignmentsPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/festivals"
						element={<FestivalsPage />}
					/>
					<Route
						path="/stages"
						element={<StagesPage />}
					/>
					<Route
						path="/performances"
						element={<PerformancesPage />}
					/>
					<Route
						path="/vendor-assignments"
						element={<VendorAssignmentsPage />}
					/>
					<Route
						path="/sponsorships"
						element={<SponsorshipsPage />}
					/>
					<Route
						path="/staff-assignments"
						element={<StaffAssignmentsPage />}
					/>

					<Route
						path="/artists"
						element={<ArtistsPage />}
					/>
					<Route
						path="/sponsors"
						element={<SponsorsPage />}
					/>
					<Route
						path="/staff"
						element={<StaffPage />}
					/>
					<Route
						path="/vendors"
						element={<VendorsPage />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
