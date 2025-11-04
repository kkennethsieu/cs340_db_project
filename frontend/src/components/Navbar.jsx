import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import homeIcon from "@iconify/icons-mdi/home";
import festivalIcon from "@iconify/icons-mdi/firework";
import artistIcon from "@iconify/icons-mdi/account-music";
import sponsorIcon from "@iconify/icons-mdi/handshake";
import staffIcon from "@iconify/icons-mdi/account-group";
import vendorIcon from "@iconify/icons-mdi/store";

function Navbar() {
  const navItems = [
    { name: "Home", path: "/", icon: homeIcon },
    { name: "Festivals", path: "/festivals", icon: festivalIcon },
    { name: "Artists", path: "/artists", icon: artistIcon },
    { name: "Sponsors", path: "/sponsors", icon: sponsorIcon },
    { name: "Staff", path: "/staff", icon: staffIcon },
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
          }
        >
          <Icon icon={item.icon} width="20" height="20" className="mr-2" />
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
