// =======================================================
// Alert.jsx - Part 1
// GuardianAI Alerts Page
// Header + System Status + Statistics Cards
// =======================================================

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import cam1 from "../assets/images/cam1.jpg";
import cam2 from "../assets/images/cam2.jpg";
import cam3 from "../assets/images/cam3.jpg";
import cam4 from "../assets/images/cam4.jpg";

import {
  Bell,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Search,
  Calendar,
  Filter,
  ChevronDown,
} from "lucide-react";

import "../styles/dashboard.css";
import "../styles/Alert.css";
import { useState } from "react";

function Alert() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dashboard">
      {/* Sidebar */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="page-content">
          {/* ===================================================
              Alerts Header
          =================================================== */}

          <section className="alerts-header">
            {/* Left */}

            <div className="alerts-heading">
              <div className="alerts-icon">
                <Bell size={34} />
              </div>

              <div>
                <h1>Alerts</h1>

                <p>Monitor and respond to security alerts in real-time</p>
              </div>
            </div>

            {/* Right */}

            <div className="system-status-card">
              <div className="system-status-left">
                <div className="status-icon">
                  <ShieldCheck size={26} />
                </div>

                <div>
                  <h3>System Active</h3>

                  <p>All systems operational</p>
                </div>
              </div>

              <div className="system-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </section>

          {/* ===================================================
              Statistics Cards
          =================================================== */}

          <section className="alerts-stats">
            {/* Total Alerts */}

            <div className="alert-stat-card">
              <div className="alert-stat-icon total">
                <Bell size={28} />
              </div>

              <div className="alert-stat-content">
                <p>Total Alerts</p>

                <h2>124</h2>

                <span className="increase">↑ 12% from yesterday</span>
              </div>
            </div>

            {/* High Priority */}

            <div className="alert-stat-card">
              <div className="alert-stat-icon high">
                <AlertCircle size={28} />
              </div>

              <div className="alert-stat-content">
                <p>High Priority</p>

                <h2>32</h2>

                <span className="high-text">Requires immediate attention</span>
              </div>
            </div>

            {/* Medium Priority */}

            <div className="alert-stat-card">
              <div className="alert-stat-icon medium">
                <AlertTriangle size={28} />
              </div>

              <div className="alert-stat-content">
                <p>Medium Priority</p>

                <h2>68</h2>

                <span className="medium-text">Monitor closely</span>
              </div>
            </div>

            {/* Low Priority */}

            <div className="alert-stat-card">
              <div className="alert-stat-icon low">
                <CheckCircle2 size={28} />
              </div>

              <div className="alert-stat-content">
                <p>Low Priority</p>

                <h2>24</h2>

                <span className="low-text">Under observation</span>
              </div>
            </div>
          </section>
          {/* ===================================================
              Search & Filters Toolbar
          =================================================== */}

          <section className="alerts-toolbar">
            {/* Search */}

            <div className="alerts-search">
              <Search size={18} />

              <input type="text" placeholder="Search alerts..." />
            </div>

            {/* Priority */}

            <button className="filter-btn">
              <span>All Priorities</span>

              <ChevronDown size={18} />
            </button>

            {/* Type */}

            <button className="filter-btn">
              <span>All Types</span>

              <ChevronDown size={18} />
            </button>

            {/* Status */}

            <button className="filter-btn">
              <span>All Status</span>

              <ChevronDown size={18} />
            </button>

            {/* Date */}

            <button className="filter-btn">
              <Calendar size={18} />

              <span>29 Jul 2026</span>
            </button>

            {/* Filter */}

            <button className="filter-icon-btn">
              <Filter size={18} />

              <span>Filters</span>
            </button>
          </section>

          {/* ===================================================
              Alerts Table Header
          =================================================== */}

          <section className="alerts-list">
            <div className="alert-list-header">
              <div className="header-camera">Camera</div>

              <div className="header-alert">Alert</div>

              <div className="header-time">Time</div>

              <div className="header-status">Status</div>

              <div className="header-actions">Actions</div>
            </div>
            {/* ===================================================
              Alerts List
          =================================================== */}

            {/* =======================
              Alert 1
          ======================== */}

            <div className="alert-row">
              <div className="alert-camera">
                <img src={cam1} alt="Camera 01" />
              </div>

              <div className="alert-info">
                <div className="alert-type intrusion">🏃</div>

                <div className="alert-details">
                  <h3>Intrusion Detected</h3>

                  <p>📍 Main Entrance • Camera 01</p>

                  <div className="alert-meta">
                    <span className="priority-badge high">HIGH PRIORITY</span>

                    <span>• 2 min ago</span>
                  </div>
                </div>
              </div>

              <div className="alert-time">
                <h4>19:45:32</h4>

                <span>29 Jul 2026</span>
              </div>

              <div className="alert-status">
                <span className="status-badge active">● Active</span>
              </div>

              <div className="alert-actions">
                <button className="view-btn">👁 View</button>

                <button className="resolve-btn">🛡 Resolve</button>
              </div>
            </div>

            {/* =======================
              Alert 2
          ======================== */}

            <div className="alert-row">
              <div className="alert-camera">
                <img src={cam2} alt="Camera 02" />
              </div>

              <div className="alert-info">
                <div className="alert-type vehicle">🚗</div>

                <div className="alert-details">
                  <h3>Vehicle Detected in Restricted Area</h3>

                  <p>📍 Parking Zone B • Camera 03</p>

                  <div className="alert-meta">
                    <span className="priority-badge medium">
                      MEDIUM PRIORITY
                    </span>

                    <span>• 5 min ago</span>
                  </div>
                </div>
              </div>

              <div className="alert-time">
                <h4>19:42:15</h4>

                <span>29 Jul 2026</span>
              </div>

              <div className="alert-status">
                <span className="status-badge active">● Active</span>
              </div>

              <div className="alert-actions">
                <button className="view-btn">👁 View</button>

                <button className="resolve-btn">🛡 Resolve</button>
              </div>
            </div>

            {/* =======================
              Alert 3
          ======================== */}

            <div className="alert-row">
              <div className="alert-camera">
                <img src={cam3} alt="Camera 03" />
              </div>

              <div className="alert-info">
                <div className="alert-type loitering">🚶</div>

                <div className="alert-details">
                  <h3>Loitering Detected</h3>

                  <p>📍 Building Corridor • Camera 02</p>

                  <div className="alert-meta">
                    <span className="priority-badge medium">
                      MEDIUM PRIORITY
                    </span>

                    <span>• 8 min ago</span>
                  </div>
                </div>
              </div>

              <div className="alert-time">
                <h4>19:39:47</h4>

                <span>29 Jul 2026</span>
              </div>

              <div className="alert-status">
                <span className="status-badge active">● Active</span>
              </div>

              <div className="alert-actions">
                <button className="view-btn">👁 View</button>

                <button className="resolve-btn">🛡 Resolve</button>
              </div>
            </div>

            {/* =======================
              Alert 4
          ======================== */}

            <div className="alert-row">
              <div className="alert-camera">
                <img src={cam4} alt="Camera 04" />
              </div>

              <div className="alert-info">
                <div className="alert-type access">👤</div>

                <div className="alert-details">
                  <h3>Authorized Access</h3>

                  <p>📍 Main Gate • Camera 01</p>

                  <div className="alert-meta">
                    <span className="priority-badge low">LOW PRIORITY</span>

                    <span>• 12 min ago</span>
                  </div>
                </div>
              </div>

              <div className="alert-time">
                <h4>19:35:21</h4>

                <span>29 Jul 2026</span>
              </div>

              <div className="alert-status">
                <span className="status-badge resolved">● Resolved</span>
              </div>

              <div className="alert-actions">
                <button className="view-btn">👁 View</button>
              </div>
            </div>
            {/* ===================================================
              Footer & Pagination
          =================================================== */}
          </section>

          <section className="alerts-footer">
            <p>Showing 1 to 10 of 124 alerts</p>

            <div className="pagination">
              <button className="page-btn">&lt;</button>

              <button className="page-btn active">1</button>

              <button className="page-btn">2</button>

              <button className="page-btn">3</button>

              <button className="page-btn">...</button>

              <button className="page-btn">13</button>

              <button className="page-btn">&gt;</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Alert;
