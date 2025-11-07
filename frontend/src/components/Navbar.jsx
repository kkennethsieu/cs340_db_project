import { NavLink } from "react-router-dom";
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

	return (
		<nav className="flex flex-col w-64 p-6 bg-gray-800 text-white h-full">
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
		</nav>
	);
}

export default Navbar;
