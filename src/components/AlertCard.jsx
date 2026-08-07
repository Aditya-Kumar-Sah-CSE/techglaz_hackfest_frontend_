
import "./AlertCard.css";


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

import cam1 from "../assets/images/cam1.jpg";
import cam2 from "../assets/images/cam2.jpg";
import cam3 from "../assets/images/cam3.jpg";
import cam4 from "../assets/images/cam4.jpg";

const AlertCard = () => {
  return (
    <div className="alert-page">

      {/* ===========================
          Header
      ============================ */}

      <div className="alert-header">

        <div className="alert-title">

          <div className="alert-icon">
            <Bell size={30} />
          </div>

          <div>
            <h1>Alerts</h1>
            <p>
              Monitor and respond to security alerts in real-time
            </p>
          </div>

        </div>

        {/* System Status */}

        <div className="system-card">

          <div className="system-left">

            <div className="online-dot"></div>

            <div>
              <h4>System Active</h4>
              <span>All systems operational</span>
            </div>

          </div>

          <ShieldCheck size={30} className="shield-icon" />

        </div>

      </div>

      {/* ===========================
          Statistics
      ============================ */}

      <div className="stats-grid">

        {/* Total */}

        <div className="stats-card">

          <div className="stats-icon red">
            <Bell size={26} />
          </div>

          <div>

            <p>Total Alerts</p>

            <h2>124</h2>

            <span>↑ 12% from yesterday</span>

          </div>

        </div>

        {/* High */}

        <div className="stats-card">

          <div className="stats-icon gold">
            <AlertCircle size={26} />
          </div>

          <div>

            <p>High Priority</p>

            <h2>32</h2>

            <span>Requires immediate attention</span>

          </div>

        </div>

        {/* Medium */}

        <div className="stats-card">

          <div className="stats-icon yellow">
            <AlertTriangle size={26} />
          </div>

          <div>

            <p>Medium Priority</p>

            <h2>68</h2>

            <span>Monitor closely</span>

          </div>

        </div>

        {/* Low */}

        <div className="stats-card">

          <div className="stats-icon green">
            <CheckCircle2 size={26} />
          </div>

          <div>

            <p>Low Priority</p>

            <h2>24</h2>

            <span>Under observation</span>

          </div>

        </div>

      </div>

      {/* ===========================
          Search & Filters
      ============================ */}

      <div className="alert-toolbar">

        {/* Search */}

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search alerts..."
          />

        </div>

        {/* Priority */}

        <button className="filter-btn">

          All Priorities

          <ChevronDown size={18} />

        </button>

        {/* Type */}

        <button className="filter-btn">

          All Types

          <ChevronDown size={18} />

        </button>

        {/* Status */}

        <button className="filter-btn">

          All Status

          <ChevronDown size={18} />

        </button>

        {/* Date */}

        <button className="filter-btn">

          <Calendar size={18} />

          29 Jul 2025

        </button>

        {/* Filter */}

        <button className="icon-filter">

          <Filter size={18} />

        </button>

      </div>

      {/* ==========================================
    Alert List
========================================== */}

<div className="alert-list">

  {/* Alert 1 */}

  <div className="alert-item">

    <img
  src={cam1}
  alt="Camera 1"
  className="alert-image"
/>

    <div className="alert-content">

      <div className="alert-left">

        <div className="alert-type intrusion">
          🏃
        </div>

        <div>

          <h3>Intrusion Detected</h3>

          <p>📍 Main Entrance - Camera 01</p>

          <div className="priority-row">

            <span className="priority high">
              HIGH PRIORITY
            </span>

            <span>• 2 min ago</span>

          </div>

        </div>

      </div>

      <div className="alert-right">

        <div className="time">

          <h4>19:45:32</h4>

          <span>29 Jul 2025</span>

        </div>

        <span className="status active">
          ● Active
        </span>

        <div className="action-buttons">

          <button className="view-btn">
            👁 View
          </button>

          <button className="resolve-btn">
            🛡 Resolve
          </button>

        </div>

      </div>

    </div>

  </div>

  {/* Alert 2 */}

  <div className="alert-item">

    <img
      src={cam2}
      alt="camera"
      className="alert-image"
    />

    <div className="alert-content">

      <div className="alert-left">

        <div className="alert-type vehicle">
          🚗
        </div>

        <div>

          <h3>Vehicle Detected in Restricted Area</h3>

          <p>📍 Parking Zone B - Camera 03</p>

          <div className="priority-row">

            <span className="priority medium">
              MEDIUM PRIORITY
            </span>

            <span>• 5 min ago</span>

          </div>

        </div>

      </div>

      <div className="alert-right">

        <div className="time">

          <h4>19:42:15</h4>

          <span>29 Jul 2025</span>

        </div>

        <span className="status active">
          ● Active
        </span>

        <div className="action-buttons">

          <button className="view-btn">
            👁 View
          </button>

          <button className="resolve-btn">
            🛡 Resolve
          </button>

        </div>

      </div>

    </div>

  </div>

  {/* Alert 3 */}

  <div className="alert-item">

    <img
      src= {cam3}
      alt="camera"
      className="alert-image"
    />

    <div className="alert-content">

      <div className="alert-left">

        <div className="alert-type loitering">
          🚶
        </div>

        <div>

          <h3>Loitering Detected</h3>

          <p>📍 Building Corridor - Camera 02</p>

          <div className="priority-row">

            <span className="priority medium">
              MEDIUM PRIORITY
            </span>

            <span>• 8 min ago</span>

          </div>

        </div>

      </div>

      <div className="alert-right">

        <div className="time">

          <h4>19:39:47</h4>

          <span>29 Jul 2025</span>

        </div>

        <span className="status active">
          ● Active
        </span>

        <div className="action-buttons">

          <button className="view-btn">
            👁 View
          </button>

          <button className="resolve-btn">
            🛡 Resolve
          </button>

        </div>

      </div>

    </div>

  </div>

  {/* Alert 4 */}

  <div className="alert-item">

    <img
      src={cam4}
      alt="camera"
      className="alert-image"
    />

    <div className="alert-content">

      <div className="alert-left">

        <div className="alert-type access">
          👤
        </div>

        <div>

          <h3>Authorized Access</h3>

          <p>📍 Main Gate - Camera 01</p>

          <div className="priority-row">

            <span className="priority low">
              LOW PRIORITY
            </span>

            <span>• 12 min ago</span>

          </div>

        </div>

      </div>

      <div className="alert-right">

        <div className="time">

          <h4>19:35:21</h4>

          <span>29 Jul 2025</span>

        </div>

        <span className="status resolved">
          ● Resolved
        </span>

        <div className="action-buttons">

          <button className="view-btn">
            👁 View
          </button>

        </div>

      </div>

    </div>

  </div>

</div>

{/* ==========================================
    Footer
========================================== */}

<div className="alert-footer">

  <p>
    Showing 1 to 10 of 124 alerts
  </p>

  <div className="pagination">

    <button>{"<"}</button>

    <button className="active-page">1</button>

    <button>2</button>

    <button>3</button>

    <button>...</button>

    <button>13</button>

    <button>{">"}</button>

  </div>

</div>

    </div>
  );
};

export default AlertCard;