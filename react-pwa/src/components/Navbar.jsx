import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isAuthenticated, logout, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-blue-600 font-bold text-xl">
                WA Health
              </Link>
            </div>

            {/* Main navigation links - only show when authenticated */}
            {isAuthenticated && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/dashboard"
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/call-history"
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Call History
                </Link>
                <Link
                  to="/due-patients"
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Due Patients
                </Link>
              </div>
            )}
          </div>

          {/* Authentication buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">
                    {userInfo?.admin?.first_name || "User"}
                  </span>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {userInfo?.admin?.first_name?.charAt(0) || "U"}
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu - only show when authenticated */}
      {isAuthenticated && (
        <div className="sm:hidden border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/call-history"
              className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium"
            >
              Call History
            </Link>
            <Link
              to="/due-patients"
              className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium"
            >
              Due Patients
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
