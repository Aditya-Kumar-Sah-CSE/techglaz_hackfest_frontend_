// ===============================
// Sidebar.jsx
// GuardianAI Admin Panel
// ===============================

import { useNavigate, NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Video,
  Bell,
  ShieldAlert,
  BarChart3,
  FileText,
  LogOut,
  ChevronDown,
  UserCircle2,
  ShieldCheck,
  MapPinned,
  Fence,
} from "lucide-react";

import logo from "../assets/images/guardian-logo.png";

import "../styles/dashboard.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  // Close sidebar after selecting a menu item
  const handleNavigation = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* ===============================
          Sidebar Overlay
      =============================== */}

      <div
        className={`sidebar-overlay ${
          sidebarOpen ? "show" : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* ===============================
          Sidebar
      =============================== */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        {/* ===============================
            Logo
        =============================== */}

        <div className="sidebar-logo">
          <img
            src={logo}
            alt="SurakshaAI"
          />

          <div className="logo-text">
            <h2>
              Guardian<span>AI</span>
            </h2>

            <p>
              Smart Surveillance. Safer Tomorrow.
            </p>
          </div>
        </div>

        {/* ===============================
            Admin Card
        =============================== */}

        <div className="admin-card">
          <div className="admin-left">

            <div className="admin-avatar">
              <UserCircle2 size={34} />
            </div>

            <div>
              <h3>Admin</h3>

              <p>
                System Administrator
              </p>

              <span className="online-status">
                ● Online
              </span>
            </div>

          </div>

          <ChevronDown size={18} />
        </div>

        {/* ===============================
            Main Menu
        =============================== */}

        <div className="menu-title">
          MAIN MENU
        </div>

        <nav className="sidebar-menu">

          {/* ===============================
              Dashboard
          =============================== */}

          <NavLink
            to="/dashboard"
            onClick={handleNavigation}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <LayoutDashboard size={20} />

            <span>
              Dashboard
            </span>
          </NavLink>

          {/* ===============================
              Live Monitoring
          =============================== */}

          <NavLink
            to="/live-monitoring"
            onClick={handleNavigation}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Video size={20} />

            <span>
              Live Monitoring
            </span>
          </NavLink>

          {/* ===============================
              Alerts
          =============================== */}

          <NavLink
            to="/alerts"
            onClick={handleNavigation}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Bell size={20} />

            <span>
              Alerts
            </span>

            <div className="badge">
              3
            </div>
          </NavLink>

          {/* ===============================
              Camera Management
          =============================== */}

          <NavLink
            to="/camera-management"
            onClick={handleNavigation}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <ShieldAlert size={20} />

            <span>
              Camera Management
            </span>
          </NavLink>

          {/* ===============================
              Analytics
          =============================== */}

          <NavLink
            to="/analytics"
            onClick={handleNavigation}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <BarChart3 size={20} />

            <span>
              Analytics
            </span>
          </NavLink>

          {/* ===============================
              Alert Details
          =============================== */}

          <NavLink
            to="/alert-details"
            onClick={handleNavigation}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <FileText size={20} />

            <span>
              Alert Details
            </span>
          </NavLink>

          {/* ===============================
              Border Surveillance Map
          =============================== */}

          <NavLink
            to="/border-map"
            onClick={handleNavigation}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <MapPinned size={20} />

            <span>
              Border Surveillance
            </span>
          </NavLink>

          {/* ===============================
              Virtual Fence
          =============================== */}

          <NavLink
            to="/virtual-fence"
            onClick={handleNavigation}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Fence size={20} />

            <span>
              Virtual Fence
            </span>
          </NavLink>

        </nav>

        {/* ===============================
            System
        =============================== */}

        <div className="system-title">
          SYSTEM
        </div>

        {/* ===============================
            Logout
        =============================== */}

        <button
          className="logout-btn"
          onClick={() => {
            setSidebarOpen(false);
            navigate("/login");
          }}
        >
          <LogOut size={21} />

          <span>
            Logout
          </span>
        </button>

        {/* ===============================
            Sidebar Footer
        =============================== */}

        <div className="sidebar-footer">

          <div className="footer-left">

            <div className="footer-icon">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h4>
                SurakshaAI v1.0.0
              </h4>

              <p>
                All systems operational
              </p>
            </div>

          </div>

          <div className="status-dot"></div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;