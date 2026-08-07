// ==========================================
// PoliceNavbar.jsx
// GuardianAI Police Command Navbar
// ==========================================

import { Menu, Search, Bell, Siren, Shield, ChevronDown, Phone, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/dashboard.css";
import "../../pages/police/PoliceDashboard.css";

function PoliceNavbar({ setSidebarOpen, searchQuery, setSearchQuery, onEmergencyClick }) {
  const { user } = useAuth();

  const officerName = user?.fullName || "Inspector Singh";
  const officerRole = user?.roleLabel || "Police Authority";

  return (
    <header className="navbar police-navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>

        <div className="navbar-title police-nav-title">
          <h2>Police Command Dashboard</h2>
          <p>Real-Time Surveillance & Incident Dispatch</p>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="navbar-search police-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search alerts, cameras, locations..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right Controls */}
      <div className="navbar-right police-nav-right">
        {/* Emergency SOS Button */}
        <button
          className="emergency-btn"
          onClick={() => {
            if (onEmergencyClick) onEmergencyClick();
            else alert("🚨 EMERGENCY SOS BROADCASTED TO ALL UNITS 🚨");
          }}
          title="Trigger Emergency SOS"
        >
          <Phone size={18} className="siren-icon" />
          <span>EMERGENCY</span>
        </button>

        {/* Notifications */}
        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="notification-badge police-badge-red">12</span>
        </button>

        {/* Police Officer Profile */}
        <div className="profile-card police-profile-card">
          <div className="profile-avatar police-avatar">
            <User size={20} />
          </div>

          <div className="profile-info">
            <h4>Inspector Rajesh</h4>
            <p>Delhi Police</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PoliceNavbar;
