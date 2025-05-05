import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCamera,
  FaSearch,
  FaImage,
  FaUser,
  FaBell,
} from "react-icons/fa";

const links = [
  { to: "/", icon: <FaHome size={20} />, text: "Home" },
  { to: "/snap", icon: <FaCamera size={20} />, text: "Snap" },
  { to: "/explore", icon: <FaSearch size={20} />, text: "Explore" },
  { to: "/gallery", icon: <FaImage size={20} />, text: "Gallery" },
  { to: "/profile", icon: <FaUser size={20} />, text: "Profile" },
  { to: "/notifications", icon: <FaBell size={20} />, text: "Notifications" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      {/* Sidebar (all sizes) */}
      <div className=" fixed top-0 left-0 md:left-10 lg:left-20 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-16 md:w-64 z-10 flex flex-col">
        {/* Logo */}
        <div className="lg:py-15 py-10 flex items-center justify-center md:justify-start h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <img
            src="images/logo 1.png"
            alt=""
            className="lg:w-25 lg:h-25 md:w-20 md:h-20 w-10 h-10"
          />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden md:block">
            SnapLens
          </h1>
          {/* <h1 className="text-xl font-bold text-gray-800 dark:text-white md:hidden">
            📷
          </h1> */}
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-2 md:p-4 mt-5 space-y-2">
          {links.map(({ to, icon, text }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center p-3 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="mr-0 md:mr-3">{icon}</div>
                <span className="hidden md:inline font-medium">{text}</span>
              </Link>
            );
          })}
        </nav>

        {/* Connect Button (replaces Snap & Mint) */}
        <div className="p-2 md:p-4 mb-5">
          <button
            onClick={() => console.log("Connect wallet")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full flex items-center justify-center transition duration-200"
          >
            <span className="hidden md:inline">Connect</span>
            <span className="md:hidden">🔗</span>
          </button>
        </div>
      </div>

      {/* Push content to the right */}
      <div className="ml-16 md:ml-64" />
    </>
  );
}
