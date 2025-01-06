import { FaHeartCirclePlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Call History", path: "/call-history" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Due Patients", path: "/due-patients" },
  { label: "Reports", path: "/reports" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex h-14 w-full items-center justify-between bg-[#e7f1ff] px-6 shadow-lg text-[#004085]">
      <div className="flex items-center gap-2">
        <FaHeartCirclePlus className="text-xl" aria-hidden="true" />
        <h1 className="text-xl font-semibold">Chronic Care Management</h1>
      </div>
      <ul className="flex items-center gap-2">
        {navItems.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`px-3 py-2 rounded-md transition-colors hover:bg-blue-100 ${
                location.pathname === path ? "font-medium bg-blue-100" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
