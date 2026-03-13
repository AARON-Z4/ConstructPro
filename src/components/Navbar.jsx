import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Top navigation bar shown on authenticated pages.
 */
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Determine active section for breadcrumb
  const isDPR = location.pathname.startsWith("/dpr");
  const isProjects = location.pathname === "/projects";

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link
            to="/projects"
            className="flex items-center gap-3 group"
            aria-label="Go to Project List"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">ConstructPro</p>
              <p className="text-xs text-slate-400 leading-none mt-0.5">Field Management</p>
            </div>
          </Link>

          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
            <span className={isProjects ? "font-semibold text-primary-600" : "hover:text-slate-700"}>
              {isProjects ? (
                "Projects"
              ) : (
                <Link to="/projects" className="hover:text-primary-600 transition-colors">Projects</Link>
              )}
            </span>
            {isDPR && (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-semibold text-primary-600">Daily Progress Report</span>
              </>
            )}
          </nav>

          {/* User menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {user?.avatar || "U"}
              </div>
              <div className="hidden lg:block text-right">
                <p className="text-xs font-semibold text-slate-800 leading-none">{user?.name}</p>
                <p className="text-xs text-slate-400 leading-none mt-0.5">{user?.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              id="navbar-logout-btn"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-600
                         bg-slate-100 hover:bg-red-50 rounded-lg px-3 py-2
                         transition-all duration-200 border border-transparent hover:border-red-200"
              title="Sign out"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
