import { Link } from "react-router-dom";

const footerItems = [
  { label: "Support", path: "/support" },
  { label: "Contact Us", path: "/contact" },
  { label: "Terms of Service", path: "/terms" },
];

const Footer = () => {
  return (
    <footer className="flex h-14 w-full items-center justify-between bg-[#e7f1ff] px-6 shadow-lg text-[#004085]">
      <div className="flex items-center">
        <span className="text-sm">© 2025 WA-Health</span>
      </div>
      <ul className="flex items-center gap-2">
        {footerItems.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className="px-3 py-2 rounded-md transition-colors hover:bg-blue-100"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
