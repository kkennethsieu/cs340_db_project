import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

//Components
import ConfirmationModal from "./ConfirmationModal";

//Icons
import { Icon } from "@iconify/react";
import homeIcon from "@iconify-icons/mdi/home";
import calendarIcon from "@iconify-icons/mdi/calendar";
import stageIcon from "@iconify-icons/mdi/theater";
import musicIcon from "@iconify-icons/mdi/music";
import handshakeIcon from "@iconify-icons/mdi/handshake";
import staffIcon from "@iconify-icons/mdi/account-tie";
import artistIcon from "@iconify-icons/mdi/microphone";
import sponsorIcon from "@iconify-icons/mdi/currency-usd";
import vendorIcon from "@iconify-icons/mdi/store";
import usersIcon from "@iconify-icons/mdi/account-group";
import resetIcon from "@iconify-icons/mdi/refresh";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function Navbar() {
	const navItems = [
		{ name: "Home", path: "/", icon: homeIcon },
		{ name: "Festivals", path: "/festivals", icon: calendarIcon },
		{ name: "Stages", path: "/stages", icon: stageIcon },
		{ name: "Performances", path: "/performances", icon: musicIcon },
		{
			name: "Vendor Assignments",
			path: "/vendor-assignments",
			icon: handshakeIcon,
		},
		{ name: "Sponsorships", path: "/sponsorships", icon: sponsorIcon },
		{ name: "Staff Assignments", path: "/staff-assignments", icon: staffIcon },
		{ name: "Artists", path: "/artists", icon: artistIcon },
		{ name: "Sponsors", path: "/sponsors", icon: handshakeIcon },
		{ name: "Staff", path: "/staff", icon: usersIcon },
		{ name: "Vendors", path: "/vendors", icon: vendorIcon },
	];

	const [isOpen, setIsOpen] = useState(false);
	const nav = useNavigate();

	const resetData = async () => {
		try {
			const res = await fetch(`${backendURL}/reset`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!res.ok) {
				throw new Error("Error resetting data");
			}
			nav("/");
			console.log("Data has been reset");
			setIsOpen(false);
		} catch (error) {
			console.error("error resetting data", error);
		}
	};

	return (
		<>
			<nav className="flex flex-col bg-gray-800 p-6 w-64 h-full text-white">
				{navItems.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						className={({ isActive }) =>
							`flex items-center py-2 px-4 rounded mb-2 hover:bg-gray-700 transition-colors ${
								isActive ? "bg-gray-700 font-bold" : ""
							}`
						}>
						<Icon
							icon={item.icon}
							width="20"
							height="20"
							className="mr-2"
						/>
						{item.name}
					</NavLink>
				))}
				<button
					className="flex items-center hover:bg-gray-700 mb-2 px-4 py-2 rounded"
					onClick={() => setIsOpen(true)}>
					<Icon
						icon={resetIcon}
						width="20"
						height="20"
						className="mr-2"
					/>
					Reset Data
				</button>
			</nav>
			{isOpen && (
				<ConfirmationModal
					isOpen={isOpen}
					onClose={() => {
						setIsOpen(false);
					}}
					onConfirm={resetData}
					title="Are you sure you want to reset the data?"
					message="This cannot be undone."
				/>
			)}
		</>
	);
}

export default Navbar;
