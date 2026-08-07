// ===============================
// Sidebar.jsx
// GuardianAI Admin Panel
// ===============================
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
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
} from "lucide-react";

import logo from "../assets/images/guardian-logo.png";

import "../styles/dashboard.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* ================= Logo ================= */}
        <div className="sidebar-logo">
          <img src={logo} alt="GuardianAI" />

          <div className="logo-text">
            <h2>
              Guardian<span>AI</span>
            </h2>

            <p>Smart Surveillance. Safer Tomorrow.</p>
          </div>
        </div>

        {/* ================= Admin Card ================= */}

        <div className="admin-card">
          <div className="admin-left">
            <div className="admin-avatar">
              <UserCircle2 size={34} />
            </div>

            <div>
              <h3>Admin</h3>

              <p>System Administrator</p>

              <span className="online-status">● Online</span>
            </div>
          </div>

          <ChevronDown size={18} />
        </div>

        {/* ================= Menu ================= */}

        <div className="menu-title">MAIN MENU</div>

        <nav className="sidebar-menu">
          <NavLink
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/live-monitoring"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <Video size={20} />
            <span>Live Monitoring</span>
          </NavLink>

          <NavLink
            to="/alerts"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <Bell size={20} />

            <span>Alerts</span>

            <div className="badge">3</div>
          </NavLink>

          <NavLink
            to="/camera-management"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <ShieldAlert size={20} />
            <span>Camera Management</span>
          </NavLink>

          <NavLink
            to="/analytics"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <BarChart3 size={20} />
            <span>Analytics</span>
          </NavLink>

          <NavLink
            to="/alert-details"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FileText size={20} />
            <span>Alert Details</span>
          </NavLink>
        </nav>

        {/* ================= Footer ================= */}

        <div className="system-title">SYSTEM</div>

        <button
          className="logout-btn"
          onClick={() => {
            setSidebarOpen(false);
            navigate("/login");
          }}
        >
          <LogOut size={21} />
          Logout
        </button>

        <div className="sidebar-footer">
          <div className="footer-left">
            <div className="footer-icon">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h4>GuardianAI v1.0.0</h4>
              <p>All systems operational</p>
            </div>
          </div>

          <div className="status-dot"></div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
