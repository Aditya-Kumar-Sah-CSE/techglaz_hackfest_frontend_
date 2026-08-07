import {
  FiVideo,
  FiShield,
  FiAlertTriangle,
  FiUsers,
  FiHardDrive,
} from "react-icons/fi";

import { FaShieldAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

import "../styles/LiveMonitoring.css";

/* Camera Images
   Replace these with your own images */

import cam1 from "../assets/images/cam1.jpg";
import cam2 from "../assets/images/cam2.jpg";
import cam3 from "../assets/images/cam3.jpg";
import cam4 from "../assets/images/cam4.jpg";
import cam5 from "../assets/images/cam5.jpg";
import cam6 from "../assets/images/cam6.jpg";

/* =======================================
   Camera Data
======================================= */

const cameraFeeds = [
  {
    id: 1,
    title: "Main Entrance",
    image: cam1,
    live: true,
  },

  {
    id: 2,
    title: "Lobby Area",
    image: cam2,
    live: true,
  },

  {
    id: 3,
    title: "Corridor 1",
    image: cam3,
    live: true,
  },

  {
    id: 4,
    title: "Parking Zone B",
    image: cam4,
    live: true,
  },

  {
    id: 5,
    title: "Perimeter Fence",
    image: cam5,
    live: true,
  },

  {
    id: 6,
    title: "Server Room",
    image: cam6,
    live: true,
  },
];

/* =======================================
   Top Cards
======================================= */

const stats = [
  {
    icon: <FiVideo />,
    title: "Total Cameras",
    value: "12",
    status: "Online",
    className: "green",
  },

  {
    icon: <FiShield />,
    title: "Active Feeds",
    value: "12",
    status: "Live",
    className: "green",
  },

  {
    icon: <FiAlertTriangle />,
    title: "Alerts Today",
    value: "8",
    status: "High Priority",
    className: "gold",
  },

  {
    icon: <FiUsers />,
    title: "People Detected",
    value: "24",
    status: "Now",
    className: "green",
  },

  {
    icon: <FiHardDrive />,
    title: "Storage Used",
    value: "68%",
    status: "2.1 TB / 3.0 TB",
    className: "green",
  },
];

/* =======================================
   Component
======================================= */

const LiveMonitoring = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="live-page">
          {/* ==========================
            Header
      =========================== */}

          <div className="live-header">
            <div className="live-title">
              <div className="live-icon">
                <FiVideo />
              </div>

              <div>
                <h1>Live Monitoring</h1>

                <p>Real-time surveillance and security monitoring</p>
              </div>
            </div>

            {/* System Status */}

            <div className="system-active">
              <div className="status-left">
                <span className="status-dot"></span>

                <div>
                  <h4>System Active</h4>

                  <p>All cameras operational</p>
                </div>
              </div>

              <FaShieldAlt className="status-icon" />
            </div>
          </div>

          {/* ==========================
            Statistics
      =========================== */}

          <div className="stats-container">
            {stats.map((item, index) => (
              <div
                key={index}
                className="stat-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (index === 0) navigate("/camera-management");
                  else if (index === 2) navigate("/alert-details");
                  else navigate("/analytics");
                }}
              >
                <div className={`stat-icon ${item.className}`}>{item.icon}</div>

                <div className="stat-info">
                  <span>{item.title}</span>

                  <h2>{item.value}</h2>

                  <p>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
          {/* ==========================
            Main Content
      =========================== */}

          <div className="live-main">
            {/* ==========================
              Camera Section
        =========================== */}

            <div className="camera-section">
              <div className="section-header">
                <h2>Live Camera Feeds</h2>

                <div className="camera-controls">
                  <button className="view-btn active">
                    <i className="fas fa-th"></i>
                  </button>

                  <button className="view-btn">
                    <i className="fas fa-bars"></i>
                  </button>

                  <select className="camera-filter">
                    <option>All Locations</option>
                    <option>Main Entrance</option>
                    <option>Lobby Area</option>
                    <option>Parking Zone</option>
                    <option>Server Room</option>
                  </select>
                </div>
              </div>

              {/* ==========================
                Camera Grid
          =========================== */}

              <div className="camera-grid">
                {cameraFeeds.map((camera) => (
                  <div
                    key={camera.id}
                    className="camera-card"
                    onClick={() => navigate("/alert-details")}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Camera Image */}

                    <div className="camera-image">
                      <img src={camera.image} alt={camera.title} />

                      {/* LIVE Badge */}

                      <div className="live-badge">
                        <span className="live-dot"></span>
                        LIVE
                      </div>
                    </div>

                    {/* Footer */}

                    <div className="camera-footer">
                      <div className="camera-location">
                        <FaShieldAlt />

                        <span>{camera.title}</span>
                      </div>

                      <button
                        className="expand-btn"
                        onClick={() => navigate("/alert-details")}
                      >
                        ⛶
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ==========================
              Right Sidebar
        =========================== */}

            <div className="right-sidebar">
              {/* Recent Alerts */}

              <div className="sidebar-card">
                <div className="sidebar-header">
                  <h2>Recent Alerts</h2>

                  <button onClick={() => navigate("/alert-details")}>
                    View All
                  </button>
                </div>

                <div className="alert-list">
                  <div className="alert-item">
                    <div className="alert-icon danger">
                      <FiAlertTriangle />
                    </div>

                    <div className="alert-info">
                      <h4>Unauthorized Access</h4>
                      <p>Main Entrance</p>
                    </div>

                    <div className="alert-meta">
                      <small>2m ago</small>
                      <span className="alert-badge high">High</span>
                    </div>
                  </div>

                  <div className="alert-item">
                    <div className="alert-icon warning">🚗</div>

                    <div className="alert-info">
                      <h4>Vehicle in Restricted Area</h4>
                      <p>Parking Zone B</p>
                    </div>

                    <div className="alert-meta">
                      <small>5m ago</small>
                      <span className="alert-badge medium">Medium</span>
                    </div>
                  </div>

                  <div className="alert-item">
                    <div className="alert-icon yellow">📡</div>

                    <div className="alert-info">
                      <h4>Motion Detected</h4>
                      <p>Perimeter Fence</p>
                    </div>

                    <div className="alert-meta">
                      <small>8m ago</small>
                      <span className="alert-badge medium">Medium</span>
                    </div>
                  </div>

                  <div className="alert-item">
                    <div className="alert-icon success">🔔</div>

                    <div className="alert-info">
                      <h4>Door Left Open</h4>
                      <p>Server Room</p>
                    </div>

                    <div className="alert-meta">
                      <small>12m ago</small>
                      <span className="alert-badge low">Low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Status */}

              <div className="sidebar-card">
                <div className="sidebar-header">
                  <h2>System Status</h2>

                  <button onClick={() => navigate("/analytics")}>
                    View Details
                  </button>
                </div>

                <div className="status-list">
                  <div className="status-item">
                    <span>📹 Camera System</span>
                    <strong className="online">● Online</strong>
                  </div>

                  <div className="status-item">
                    <span>📶 Network Connection</span>
                    <strong className="online">● Online</strong>
                  </div>

                  <div className="status-item">
                    <span>💾 Video Recording</span>
                    <strong className="recording">Recording</strong>
                  </div>

                  <div className="status-item">
                    <span>🗄 Storage System</span>
                    <strong className="storage">68% Used</strong>
                  </div>

                  <div className="status-item">
                    <span>⚡ Power Supply</span>
                    <strong className="online">● Stable</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================
            Bottom Banner
      =========================== */}

          <div className="live-banner">
            <div className="banner-left">
              <div className="banner-icon">
                <FaShieldAlt />
              </div>

              <div>
                <h3>All cameras are running smoothly</h3>

                <p>Last updated: Just now</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMonitoring;
