// ==========================================
// PoliceSidebar.jsx
// GuardianAI Police Command Center Sidebar
// ==========================================

import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Bell, Video, ShieldCheck, LogOut } from "lucide-react";
import logo from "../../assets/images/guardian-logo.png";
import { useAuth } from "../../context/AuthContext";
import "../../styles/dashboard.css";
import "../../pages/police/PoliceDashboard.css";

const PoliceSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside className={`sidebar police-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <img src={logo} alt="GuardianAI" />
          <div className="logo-text">
            <h2>
              Guardian<span>AI</span>
            </h2>
            <p className="police-subtitle">Police Command Center</p>
          </div>
        </div>

        {/* Menu Section - ONLY 3 ITEMS */}
        <div className="menu-title">COMMAND MENU</div>

        <nav className="sidebar-menu">
          <NavLink
            to="/police/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active police-item" : "menu-item police-item"
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/police/alerts"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active police-item" : "menu-item police-item"
            }
          >
            <Bell size={20} />
            <span>Alerts</span>
            <div className="badge police-alert-badge">24</div>
          </NavLink>

          <NavLink
            to="/police/live-camera"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active police-item" : "menu-item police-item"
            }
          >
            <Video size={20} />
            <span>Live Camera</span>
          </NavLink>
        </nav>

        {/* Logout Action */}
        <button className="logout-btn police-logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        {/* System Status Card */}
        <div className="police-status-card">
          <div className="status-card-inner">
            <div className="status-shield-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="status-text-content">
              <h4>System Status</h4>
              <p className="text-emerald font-semibold">All Systems Operational</p>
            </div>
            <div className="green-status-dot"></div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PoliceSidebar;
