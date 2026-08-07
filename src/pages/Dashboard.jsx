// ==========================================
// Dashboard.jsx
// GuardianAI Dashboard
// ==========================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  getAlerts,
  getCameras,
  getDashboardSummary,
  getHealth,
  getNotifications,
} from "../services/guardianApi";
import { unwrapList, unwrapObject } from "../services/apiClient";
import { normalizeAlert, normalizeCamera } from "../services/dataMappers";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiOnline, setApiOnline] = useState(false);
  const [summary, setSummary] = useState({});
  const [cameras, setCameras] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      const [healthResult, summaryResult, camerasResult, alertsResult, notificationsResult] =
        await Promise.allSettled([
          getHealth(),
          getDashboardSummary(),
          getCameras(),
          getAlerts(5),
          getNotifications(),
        ]);

      if (!active) return;

      setApiOnline(healthResult.status === "fulfilled");
      if (summaryResult.status === "fulfilled") {
        setSummary(unwrapObject(summaryResult.value, "summary"));
      }
      if (camerasResult.status === "fulfilled") {
        setCameras(unwrapList(camerasResult.value, "cameras").map(normalizeCamera));
      }
      if (alertsResult.status === "fulfilled") {
        setAlerts(unwrapList(alertsResult.value, "alerts").map(normalizeAlert));
      }
      if (notificationsResult.status === "fulfilled") {
        setNotifications(unwrapList(notificationsResult.value, "notifications"));
      }
      setLoading(false);
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const totalCameras = summary.totalCameras ?? cameras.length;
  const onlineCameras = cameras.filter((camera) => camera.status === "Online").length;
  const activeAlerts =
    summary.activeAlerts ??
    alerts.filter((alert) => !["resolved", "completed"].includes(alert.status)).length;
  const resolvedAlerts =
    summary.resolvedAlerts ??
    alerts.filter((alert) => ["resolved", "completed"].includes(alert.status)).length;
  const liveCamera = cameras.find((camera) => camera.status === "Online") || cameras[0];
  const recentAlert = alerts[0];

  return (
    <div className="dashboard">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="page-content">
          <div className="stats-grid">
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
                <h2 className="stat-value">{loading ? "--" : totalCameras}</h2>
                <span className="stat-subtitle">{onlineCameras} online</span>
              </div>
            </div>

            <div
              className="stat-card"
              onClick={() => navigate("/alerts")}
              style={{ cursor: "pointer" }}
            >
              <div className="stat-icon alert-icon">
                <TriangleAlert size={28} />
              </div>
              <div className="stat-content">
                <p className="stat-title">Active Alerts</p>
                <h2 className="stat-value">{loading ? "--" : activeAlerts}</h2>
                <span className="stat-subtitle">From alerts API</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon resolved-icon">
                <ShieldCheck size={28} />
              </div>
              <div className="stat-content">
                <p className="stat-title">Resolved Alerts</p>
                <h2 className="stat-value">{loading ? "--" : resolvedAlerts}</h2>
                <span className="stat-subtitle">Resolved or completed</span>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
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
                <span className="live-status">
                  {liveCamera?.status === "Online" ? "● Live" : "● No Stream"}
                </span>
              </div>

              <div className="camera-placeholder">
                <Camera size={70} />
                <h4>{liveCamera?.name || "No Camera Connected"}</h4>
                <p>
                  {liveCamera?.location ||
                    "Live feeds will appear here after cameras connect."}
                </p>
              </div>
            </section>

            <section
              className="dashboard-card alerts-card"
              onClick={() => navigate("/alerts")}
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
                <p>{recentAlert?.title || "No alerts available."}</p>
                {recentAlert && <span>{recentAlert.location}</span>}
              </div>
            </section>
          </div>

          <div className="dashboard-grid">
            <section className="dashboard-card">
              <div className="card-header">
                <h3>
                  <Activity size={20} />
                  Recent Activity
                </h3>
              </div>

              <div className="empty-state">
                <Activity size={45} />
                <p>
                  {notifications.length
                    ? `${notifications.length} notifications available.`
                    : "No recent activity found."}
                </p>
              </div>
            </section>

            <section className="dashboard-card">
              <div className="card-header">
                <h3>System Status</h3>
              </div>

              <div className="system-status">
                <div className="status-row">
                  <span>Backend</span>
                  <span className={apiOnline ? "status-online" : "status-offline"}>
                    {apiOnline ? "Online" : "Offline"}
                  </span>
                </div>
                <div className="status-row">
                  <span>Database</span>
                  <span className={apiOnline ? "status-online" : "status-offline"}>
                    {apiOnline ? "Connected" : "Offline"}
                  </span>
                </div>
                <div className="status-row">
                  <span>AI Engine</span>
                  <span className={apiOnline ? "status-online" : "status-offline"}>
                    {apiOnline ? "Ready" : "Offline"}
                  </span>
                </div>
                <div className="status-row">
                  <span>Cameras</span>
                  <span className={onlineCameras ? "status-online" : "status-offline"}>
                    {onlineCameras} Connected
                  </span>
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
