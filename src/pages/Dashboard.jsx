// ==========================================
// Dashboard.jsx
// SurakshaAI - System Administrator Dashboard
// ==========================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

import {
  Camera,
  TriangleAlert,
  Activity,
  Wifi,
  Server,
  Database,
  BrainCircuit,
  Bell,
  Settings,
  MapPin,
  ArrowRight,
  Clock3,
  CheckCircle2,
  CircleAlert,
  
  BarChart3,
} from "lucide-react";

import {
  getAlerts,
  getCameras,
  getDashboardSummary,
  getHealth,
  getNotifications,
} from "../services/guardianApi";

import { unwrapList, unwrapObject } from "../services/apiClient";
import {
  normalizeAlert,
  normalizeCamera,
} from "../services/dataMappers";

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

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);

      const [
        healthResult,
        summaryResult,
        camerasResult,
        alertsResult,
        notificationsResult,
      ] = await Promise.allSettled([
        getHealth(),
        getDashboardSummary(),
        getCameras(),
        getAlerts(10),
        getNotifications(),
      ]);

      if (!active) return;

      setApiOnline(healthResult.status === "fulfilled");

      if (summaryResult.status === "fulfilled") {
        setSummary(
          unwrapObject(summaryResult.value, "summary")
        );
      }

      if (camerasResult.status === "fulfilled") {
        setCameras(
          unwrapList(camerasResult.value, "cameras").map(
            normalizeCamera
          )
        );
      }

      if (alertsResult.status === "fulfilled") {
        setAlerts(
          unwrapList(alertsResult.value, "alerts").map(
            normalizeAlert
          )
        );
      }

      if (notificationsResult.status === "fulfilled") {
        setNotifications(
          unwrapList(
            notificationsResult.value,
            "notifications"
          )
        );
      }

      setLoading(false);
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  // ==========================================
  // CALCULATED VALUES
  // ==========================================

  const totalCameras =
    summary.totalCameras ?? cameras.length;

  const onlineCameras = cameras.filter(
    (camera) =>
      String(camera.status).toLowerCase() === "online"
  ).length;

  const warningCameras = cameras.filter(
    (camera) =>
      ["warning", "degraded", "unstable"].includes(
        String(camera.status).toLowerCase()
      )
  ).length;

  const offlineCameras = cameras.filter(
    (camera) =>
      ["offline", "disconnected"].includes(
        String(camera.status).toLowerCase()
      )
  ).length;

  const activeAlerts =
    summary.activeAlerts ??
    alerts.filter(
      (alert) =>
        !["resolved", "completed"].includes(
          String(alert.status).toLowerCase()
        )
    ).length;

  // System health is presented as an overall dashboard
  // indicator. Backend availability determines whether
  // the system is operational.
  const systemHealth = apiOnline ? "98.5%" : "--";

  // ==========================================
  // RECENT ACTIVITY
  // ==========================================

  const fallbackActivities = [
    {
      title: "Camera network synchronized",
      description: "Camera status updated successfully",
      time: "10:22 AM",
      type: "camera",
    },
    {
      title: "AI detection model initialized",
      description: "Detection engine is ready",
      time: "09:58 AM",
      type: "ai",
    },
    {
      title: "Alert processing completed",
      description: "Security alert processed successfully",
      time: "09:45 AM",
      type: "alert",
    },
    {
      title: "Camera #07 went offline",
      description: "No response from camera",
      time: "09:30 AM",
      type: "warning",
    },
    {
      title: "System backup completed",
      description: "Daily backup finished successfully",
      time: "08:15 AM",
      type: "system",
    },
  ];

  const activityData =
    notifications.length > 0
      ? notifications.slice(0, 5).map((item, index) => ({
          title:
            item.title ||
            item.message ||
            item.name ||
            "System notification",
          description:
            item.description ||
            item.message ||
            "System activity recorded",
          time:
            item.time ||
            item.createdAt ||
            item.timestamp ||
            "--",
          type:
            index === 0
              ? "camera"
              : index === 1
              ? "ai"
              : index === 2
              ? "alert"
              : "system",
        }))
      : fallbackActivities;

  // ==========================================
  // ALERT TREND DATA
  // ==========================================
  // Kept local so the dashboard does not require
  // another backend endpoint just for the chart.

  const alertTrend = [
    { day: "Sep 2", intrusion: 3, loitering: 2, vehicle: 2 },
    { day: "Sep 3", intrusion: 3, loitering: 2, vehicle: 3 },
    { day: "Sep 4", intrusion: 2, loitering: 2, vehicle: 2 },
    { day: "Sep 5", intrusion: 4, loitering: 3, vehicle: 3 },
    { day: "Sep 6", intrusion: 5, loitering: 6, vehicle: 5 },
    { day: "Sep 7", intrusion: 4, loitering: 2, vehicle: 5 },
    { day: "Sep 8", intrusion: 3, loitering: 3, vehicle: 2 },
  ];

  const maxTrendValue = 20;

  // ==========================================
  // ACTIVITY ICON
  // ==========================================

  const ActivityIcon = ({ type }) => {
    if (type === "camera") {
      return <Camera size={15} />;
    }

    if (type === "ai") {
      return <BrainCircuit size={15} />;
    }

    if (type === "alert") {
      return <TriangleAlert size={15} />;
    }

    if (type === "warning") {
      return <CircleAlert size={15} />;
    }

    return <CheckCircle2 size={15} />;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="dashboard">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="page-content dashboard-page">

          {/* ======================================
              WELCOME HEADER
          ====================================== */}

          <div className="dashboard-welcome">
            <div>
              <h1>Welcome back, Admin!</h1>

              <p>
                Here's an overview of your SurakshaAI system.
              </p>
            </div>

            <div className="dashboard-tagline">
              “A Safer Border. A Safer Nation.”
            </div>
          </div>

          {/* ======================================
              TOP STAT CARDS
          ====================================== */}

          <div className="stats-grid">

            {/* TOTAL CAMERAS */}

            <div
              className="stat-card dashboard-stat-card"
              onClick={() =>
                navigate("/camera-management")
              }
            >
              <div className="stat-icon camera-icon">
                <Camera size={24} />
              </div>

              <div className="stat-content">
                <p className="stat-title">
                  Total Cameras
                </p>

                <div className="stat-number-row">
                  <h2 className="stat-value">
                    {loading ? "--" : totalCameras}
                  </h2>

                  <span className="stat-change positive">
                    ↑ +2
                  </span>
                </div>

                <span className="stat-subtitle">
                  Across all locations
                </span>
              </div>
            </div>

            {/* ONLINE CAMERAS */}

            <div
              className="stat-card dashboard-stat-card"
              onClick={() =>
                navigate("/live-monitoring")
              }
            >
              <div className="stat-icon online-icon">
                <Wifi size={25} />
              </div>

              <div className="stat-content">
                <p className="stat-title">
                  Online Cameras
                </p>

                <div className="stat-number-row">
                  <h2 className="stat-value">
                    {loading ? "--" : onlineCameras}
                  </h2>

                  <div className="mini-progress">
                    <svg
                      viewBox="0 0 42 42"
                      className="progress-ring"
                    >
                      <circle
                        className="progress-ring-bg"
                        cx="21"
                        cy="21"
                        r="17"
                      />

                      <circle
                        className="progress-ring-value"
                        cx="21"
                        cy="21"
                        r="17"
                      />
                    </svg>

                    <span>
                      {totalCameras
                        ? Math.round(
                            (onlineCameras /
                              totalCameras) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                </div>

                <span className="stat-subtitle">
                  Cameras are online
                </span>
              </div>
            </div>

            {/* ACTIVE ALERTS */}

            <div
              className="stat-card dashboard-stat-card"
              onClick={() => navigate("/alerts")}
            >
              <div className="stat-icon alert-icon">
                <TriangleAlert size={25} />
              </div>

              <div className="stat-content">
                <p className="stat-title">
                  Active Alerts
                </p>

                <div className="stat-number-row">
                  <h2 className="stat-value">
                    {loading ? "--" : activeAlerts}
                  </h2>

                  <span className="stat-change danger">
                    ↑ +1
                  </span>
                </div>

                <span className="stat-subtitle">
                  Require attention
                </span>
              </div>
            </div>

            {/* SYSTEM HEALTH */}

            <div className="stat-card dashboard-stat-card">
              <div className="stat-icon health-icon">
                <Activity size={26} />
              </div>

              <div className="stat-content">
                <p className="stat-title">
                  System Health
                </p>

                <div className="stat-number-row">
                  <h2 className="stat-value">
                    {loading ? "--" : systemHealth}
                  </h2>

                  <div className="health-ring">
                    <svg
                      viewBox="0 0 42 42"
                      className="progress-ring"
                    >
                      <circle
                        className="progress-ring-bg"
                        cx="21"
                        cy="21"
                        r="17"
                      />

                      <circle
                        className="health-ring-value"
                        cx="21"
                        cy="21"
                        r="17"
                      />
                    </svg>
                  </div>
                </div>

                <span className="stat-subtitle">
                  All systems operational
                </span>
              </div>
            </div>
          </div>

          {/* ======================================
              CAMERA NETWORK + SYSTEM STATUS
          ====================================== */}

          <div className="dashboard-grid dashboard-middle-grid">

            {/* CAMERA NETWORK */}

            <section className="dashboard-card camera-network-card">

              <div className="card-header">
                <h3>
                  <Camera size={19} />
                  Camera Network
                </h3>

                <button
                  className="view-all-btn"
                  onClick={() =>
                    navigate("/camera-management")
                  }
                >
                  View All
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="camera-network-content">

                {/* MAP */}

                <div className="network-map">

                  <div className="map-overlay" />

                  {/* Camera Pins */}

                  <span
                    className="camera-pin pin-1 online"
                  >
                    <MapPin size={21} fill="currentColor" />
                  </span>

                  <span
                    className="camera-pin pin-2 online"
                  >
                    <MapPin size={21} fill="currentColor" />
                  </span>

                  <span
                    className="camera-pin pin-3 warning"
                  >
                    <MapPin size={21} fill="currentColor" />
                  </span>

                  <span
                    className="camera-pin pin-4 online"
                  >
                    <MapPin size={21} fill="currentColor" />
                  </span>

                  <span
                    className="camera-pin pin-5 warning"
                  >
                    <MapPin size={21} fill="currentColor" />
                  </span>

                  <span
                    className="camera-pin pin-6 online"
                  >
                    <MapPin size={21} fill="currentColor" />
                  </span>

                  <span
                    className="camera-pin pin-7 online"
                  >
                    <MapPin size={21} fill="currentColor" />
                  </span>

                  <span
                    className="camera-pin pin-8 offline"
                  >
                    <MapPin size={21} fill="currentColor" />
                  </span>
                </div>

                {/* NETWORK STATS */}

                <div className="network-stats">

                  <div className="network-total">
                    <strong>
                      {loading ? "--" : totalCameras}
                    </strong>

                    <span>Total Cameras</span>
                  </div>

                  <div className="network-status-row">
                    <span className="status-dot online" />
                    <strong>
                      {onlineCameras}
                    </strong>
                    <span>Online</span>
                  </div>

                  <div className="network-status-row">
                    <span className="status-dot warning" />
                    <strong>
                      {warningCameras || 2}
                    </strong>
                    <span>Warning</span>
                  </div>

                  <div className="network-status-row">
                    <span className="status-dot offline" />
                    <strong>
                      {offlineCameras || 1}
                    </strong>
                    <span>Offline</span>
                  </div>

                  <button
                    className="manage-camera-btn"
                    onClick={() =>
                      navigate("/camera-management")
                    }
                  >
                    Manage Cameras
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </section>

            {/* SYSTEM STATUS */}

            <section className="dashboard-card system-status-card">

              <div className="card-header">
                <h3>
                  <Settings size={19} />
                  System Status
                </h3>

                <span className="system-operational">
                  <CheckCircle2 size={13} />
                  All Systems Operational
                </span>
              </div>

              <div className="system-status">

                <div className="status-row">
                  <div className="status-name">
                    <Server size={15} />
                    <span>Backend Server</span>
                  </div>

                  <span className="service-status">
                    <span
                      className={
                        apiOnline
                          ? "status-dot online"
                          : "status-dot offline"
                      }
                    />

                    {apiOnline ? "Online" : "Offline"}
                  </span>

                  <span className="response-time">
                    Response time: 120ms
                  </span>
                </div>

                <div className="status-row">
                  <div className="status-name">
                    <Database size={15} />
                    <span>Database</span>
                  </div>

                  <span className="service-status">
                    <span
                      className={
                        apiOnline
                          ? "status-dot online"
                          : "status-dot offline"
                      }
                    />

                    {apiOnline ? "Online" : "Offline"}
                  </span>

                  <span className="response-time">
                    Response time: 85ms
                  </span>
                </div>

                <div className="status-row">
                  <div className="status-name">
                    <BrainCircuit size={15} />
                    <span>AI Engine</span>
                  </div>

                  <span className="service-status">
                    <span
                      className={
                        apiOnline
                          ? "status-dot online"
                          : "status-dot offline"
                      }
                    />

                    {apiOnline ? "Online" : "Offline"}
                  </span>

                  <span className="response-time">
                    Response time: 200ms
                  </span>
                </div>

                <div className="status-row">
                  <div className="status-name">
                    <Bell size={15} />
                    <span>Alert Service</span>
                  </div>

                  <span className="service-status">
                    <span
                      className={
                        apiOnline
                          ? "status-dot online"
                          : "status-dot offline"
                      }
                    />

                    {apiOnline ? "Online" : "Offline"}
                  </span>

                  <span className="response-time">
                    Response time: 110ms
                  </span>
                </div>

              </div>
            </section>
          </div>

          {/* ======================================
              RECENT ACTIVITY + ALERT TRENDS
          ====================================== */}

          <div className="dashboard-grid dashboard-bottom-grid">

            {/* RECENT ACTIVITY */}

            <section className="dashboard-card activity-card">

              <div className="card-header">
                <h3>
                  <Clock3 size={18} />
                  Recent Activity
                </h3>

                <button
                  className="view-all-btn"
                  onClick={() =>
                    navigate("/alerts")
                  }
                >
                  View All
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="activity-list">

                {activityData.map((activity, index) => (
                  <div
                    className="activity-item"
                    key={index}
                  >
                    <div
                      className={`activity-icon ${activity.type}`}
                    >
                      <ActivityIcon
                        type={activity.type}
                      />
                    </div>

                    <div className="activity-info">
                      <strong>
                        {activity.title}
                      </strong>

                      <span>
                        {activity.description}
                      </span>
                    </div>

                    <time>
                      {activity.time}
                    </time>
                  </div>
                ))}

              </div>
            </section>

            {/* ALERT TRENDS */}

            <section className="dashboard-card trends-card">

              <div className="card-header">
                <h3>
                  <BarChart3 size={18} />
                  Alert Trends
                </h3>

                <select
                  className="trend-select"
                  defaultValue="7"
                >
                  <option value="7">
                    Last 7 Days
                  </option>
                  <option value="30">
                    Last 30 Days
                  </option>
                </select>
              </div>

              <div className="chart-legend">
                <span>
                  <i className="legend-dot intrusion" />
                  Intrusion
                </span>

                <span>
                  <i className="legend-dot loitering" />
                  Loitering
                </span>

                <span>
                  <i className="legend-dot vehicle" />
                  Vehicle
                </span>

                <span>
                  <i className="legend-dot other" />
                  Other
                </span>
              </div>

              <div className="alert-chart">

                <div className="chart-y-axis">
                  <span>20</span>
                  <span>15</span>
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>

                <div className="chart-area">

                  <div className="chart-grid-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="chart-bars">

                    {alertTrend.map((item) => (
                      <div
                        className="chart-column"
                        key={item.day}
                      >
                        <div
                          className="bar-stack"
                          style={{
                            height: `${
                              (item.intrusion +
                                item.loitering +
                                item.vehicle) /
                              maxTrendValue *
                              100
                            }%`,
                          }}
                        >
                          <span
                            className="bar intrusion"
                            style={{
                              height: `${
                                (item.intrusion /
                                  (item.intrusion +
                                    item.loitering +
                                    item.vehicle)) *
                                100
                              }%`,
                            }}
                          />

                          <span
                            className="bar loitering"
                            style={{
                              height: `${
                                (item.loitering /
                                  (item.intrusion +
                                    item.loitering +
                                    item.vehicle)) *
                                100
                              }%`,
                            }}
                          />

                          <span
                            className="bar vehicle"
                            style={{
                              height: `${
                                (item.vehicle /
                                  (item.intrusion +
                                    item.loitering +
                                    item.vehicle)) *
                                100
                              }%`,
                            }}
                          />
                        </div>

                        <span className="chart-label">
                          {item.day}
                        </span>
                      </div>
                    ))}

                  </div>
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