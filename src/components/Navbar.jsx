// ==========================================
// Navbar.jsx
// GuardianAI Admin Navbar
// ==========================================

import {
  Menu,
  Search,
  Bell,
  Expand,
  Moon,
  ChevronDown,
  UserCircle2,
} from "lucide-react";

import "../styles/dashboard.css";

function Navbar({ setSidebarOpen }) {
  return (
    <header className="navbar">
      {/* Left Section */}

      <div className="navbar-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={28} />
        </button>

        <div className="navbar-title">
          <h2>Welcome back, Admin 👋</h2>

          <p>Here's what's happening with your system today.</p>
        </div>
      </div>

      {/* Center Section */}

      <div className="navbar-search">
        <Search size={20} />

        <input type="text" placeholder="Search cameras, alerts..." />
      </div>

      {/* Right Section */}

      <div className="navbar-right">
        <button className="icon-btn notification-btn">
          <Bell size={22} />

          <span className="notification-badge">3</span>
        </button>

        <button className="icon-btn">
          <Expand size={22} />
        </button>

        <button className="icon-btn">
          <Moon size={22} />
        </button>

        <div className="profile-card">
          <div className="profile-avatar">
            <UserCircle2 size={28} />
          </div>

          <div className="profile-info">
            <h4>Admin</h4>

            <p>System Administrator</p>
          </div>

          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
