// ==========================================
// Dashboard.jsx
// GuardianAI Dashboard
// ==========================================

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  Camera,
  TriangleAlert,
  ShieldCheck,
  MonitorPlay,
  Bell,
  Activity,
} from "lucide-react";

import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dashboard">
      {/* Sidebar */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="page-content">
          {/* =======================
              Statistics Cards
          ======================== */}

          <div className="stats-grid">
            {/* Cameras */}

            <div
              className="stat-card"
              onClick={() => navigate("/camera-management")}
              style={{ cursor: "pointer" }}
            >
              <div className="stat-icon camera-icon">
                <Camera size={28} />
              </div>

              <div className="stat-content">
                <p className="stat-title">Total Cameras</p>

                <h2 className="stat-value">--</h2>

                <span className="stat-subtitle">Waiting for server...</span>
              </div>
            </div>

            {/* Active Alerts */}

            <div
              className="stat-card"
              onClick={() => navigate("/alert-details")}
              style={{ cursor: "pointer" }}
            >
              <div className="stat-icon alert-icon">
                <TriangleAlert size={28} />
              </div>

              <div className="stat-content">
                <p className="stat-title">Active Alerts</p>

                <h2 className="stat-value">--</h2>

                <span className="stat-subtitle">Waiting for server...</span>
              </div>
            </div>

            {/* Resolved */}

            <div className="stat-card">
              <div className="stat-icon resolved-icon">
                <ShieldCheck size={28} />
              </div>

              <div className="stat-content">
                <p className="stat-title">Resolved Alerts</p>

                <h2 className="stat-value">--</h2>

                <span className="stat-subtitle">Waiting for server...</span>
              </div>
            </div>
          </div>

          {/* =======================
              Dashboard Grid
          ======================== */}

          <div className="dashboard-grid">
            {/* Left Side */}

            <section
              className="dashboard-card live-feed-card"
              onClick={() => navigate("/live-monitoring")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-header">
                <h3>
                  <MonitorPlay size={20} />
                  Live Camera Feed
                </h3>

                <span className="live-status">● No Stream</span>
              </div>

              <div className="camera-placeholder">
                <Camera size={70} />

                <h4>No Camera Connected</h4>

                <p>Live feeds will appear here after cameras connect.</p>
              </div>
            </section>

            {/* Right Side */}

            <section
              className="dashboard-card alerts-card"
              onClick={() => navigate("/alert-details")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-header">
                <h3>
                  <Bell size={20} />
                  Recent Alerts
                </h3>
              </div>

              <div className="empty-state">
                <TriangleAlert size={45} />

                <p>No alerts available.</p>
              </div>
            </section>
          </div>

          {/* =======================
              Bottom Grid
          ======================== */}

          <div className="dashboard-grid">
            {/* Recent Activity */}

            <section className="dashboard-card">
              <div className="card-header">
                <h3>
                  <Activity size={20} />
                  Recent Activity
                </h3>
              </div>

              <div className="empty-state">
                <Activity size={45} />

                <p>No recent activity found.</p>
              </div>
            </section>

            {/* System Status */}

            <section className="dashboard-card">
              <div className="card-header">
                <h3>System Status</h3>
              </div>

              <div className="system-status">
                <div className="status-row">
                  <span>Backend</span>
                  <span className="status-offline">Offline</span>
                </div>

                <div className="status-row">
                  <span>Database</span>
                  <span className="status-offline">Offline</span>
                </div>

                <div className="status-row">
                  <span>AI Engine</span>
                  <span className="status-offline">Offline</span>
                </div>

                <div className="status-row">
                  <span>Cameras</span>
                  <span className="status-offline">0 Connected</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
