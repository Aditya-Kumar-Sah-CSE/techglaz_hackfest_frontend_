
import "./Analytics.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  Camera,
  ShieldAlert,
 
  Clock,
  Monitor,
  Crosshair,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  getAlerts,
  getCameras,
  getIncidents,
  getOfficers,
} from "../services/guardianApi";

import { unwrapList } from "../services/apiClient";

import {
  normalizeAlert,
  normalizeCamera,
  normalizeOfficer,
} from "../services/dataMappers";

/* =========================================================
   ANALYTICS STATISTICS
========================================================= */

const fallbackStats = [
  {
    title: "Surveillance Cameras",
    value: "48",
    change: "46 online",
    icon: Camera,
    positive: true,
  },
  {
    title: "Border Security Alerts",
    value: "152",
    change: "+18% from last week",
    icon: ShieldAlert,
    positive: true,
  },
  {
    title: "AI Detections",
    value: "896",
    change: "+22% from last week",
    icon: Crosshair,
    positive: true,
  },
  {
    title: "Avg. Response Time",
    value: "2.4m",
    change: "-8% from last week",
    icon: Clock,
    positive: true,
  },
];

/* =========================================================
   BORDER ALERT TREND
========================================================= */

const lineData = [
  { day: "Sep 2", alerts: 35 },
  { day: "Sep 3", alerts: 60 },
  { day: "Sep 4", alerts: 46 },
  { day: "Sep 5", alerts: 68 },
  { day: "Sep 6", alerts: 90 },
  { day: "Sep 7", alerts: 61 },
  { day: "Sep 8", alerts: 89 },
];

/* =========================================================
   FALLBACK TOP CAMERAS
========================================================= */

const fallbackTopCameras = [
  {
    name: "North Border Cam",
    alerts: 128,
  },
  {
    name: "Sector A-12 Camera",
    alerts: 96,
  },
  {
    name: "East Perimeter Cam",
    alerts: 74,
  },
  {
    name: "Border Gate Camera",
    alerts: 62,
  },
  {
    name: "South Watchtower Cam",
    alerts: 48,
  },
];

/* =========================================================
   ANALYTICS COMPONENT
========================================================= */

function Analytics() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState(fallbackStats);

  const [topCameras, setTopCameras] = useState(
    fallbackTopCameras
  );

  /* =======================================================
     LOAD ANALYTICS DATA
  ======================================================= */

  useEffect(() => {
    let active = true;

    async function loadAnalytics() {
      const [
        camerasResult,
        alertsResult,
        incidentsResult,
        officersResult,
      ] = await Promise.allSettled([
        getCameras(),
        getAlerts(100),
        getIncidents(),
        getOfficers(),
      ]);

      if (!active) return;

      /* ===================================================
         CAMERAS
      =================================================== */

      const cameras =
        camerasResult.status === "fulfilled"
          ? unwrapList(
              camerasResult.value,
              "cameras"
            ).map(normalizeCamera)
          : [];

      /* ===================================================
         ALERTS
      =================================================== */

      const alerts =
        alertsResult.status === "fulfilled"
          ? unwrapList(
              alertsResult.value,
              "alerts"
            ).map(normalizeAlert)
          : [];

      /* ===================================================
         INCIDENTS
      =================================================== */

      const incidents =
        incidentsResult.status === "fulfilled"
          ? unwrapList(
              incidentsResult.value,
              "incidents"
            )
          : [];

      /* ===================================================
         OFFICERS
      =================================================== */

      const officers =
        officersResult.status === "fulfilled"
          ? unwrapList(
              officersResult.value,
              "officers"
            ).map(normalizeOfficer)
          : [];

      /* ===================================================
         UPDATE KPI CARDS
      =================================================== */

      if (
        cameras.length ||
        alerts.length ||
        incidents.length ||
        officers.length
      ) {
        setStats([
          {
            title: "Surveillance Cameras",
            value: String(cameras.length),
            change: `${
              cameras.filter(
                (camera) =>
                  camera.status === "Online"
              ).length
            } online`,
            icon: Camera,
            positive: true,
          },

          {
            title: "Border Security Alerts",
            value: String(alerts.length),
            change: "Loaded from alerts API",
            icon: ShieldAlert,
            positive: true,
          },

          {
            title: "AI Detections",
            value: String(
              alerts.length
                ? alerts.length * 6
                : 896
            ),
            change: "AI-powered detections",
            icon: Crosshair,
            positive: true,
          },

          {
            title: "Avg. Response Time",
            value: "2.4m",
            change: "-8% from last week",
            icon: Clock,
            positive: true,
          },
        ]);

        /* ================================================
           TOP SURVEILLANCE CAMERAS
        ================================================= */

        if (cameras.length) {
          setTopCameras(
            cameras.slice(0, 5).map((camera) => ({
              name: camera.name,
              alerts: alerts.filter(
                (alert) =>
                  alert.cameraId === camera.id
              ).length,
            }))
          );
        }
      }
    }

    loadAnalytics();

    return () => {
      active = false;
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="dashboard">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="main-content">

        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="analytics-page">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="analytics-header">

            <div>
              <h1>Border Surveillance Analytics</h1>

              <p>
                AI-powered insights and security intelligence
                across monitored border sectors
              </p>
            </div>

            <select className="analytics-filter">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>

          </div>

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <div className="analytics-stats">

            {stats.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  className="analytics-card"
                  key={index}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {

                    if (index === 0) {
                      navigate(
                        "/camera-management"
                      );
                    }

                    else if (index === 1) {
                      navigate(
                        "/alert-details"
                      );
                    }

                    else {
                      navigate(
                        "/live-monitoring"
                      );
                    }

                  }}
                >

                  <div className="card-icon">
                    <Icon size={28} />
                  </div>

                  <div className="card-content">

                    <span>
                      {item.title}
                    </span>

                    <h2>
                      {item.value}
                    </h2>

                    <p
                      className={
                        item.positive
                          ? "positive"
                          : "negative"
                      }
                    >
                      {item.change}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          {/* =================================================
              CHART SECTION
          ================================================= */}

          <div className="analytics-grid">

            {/* =================================================
                ALERT TREND
            ================================================= */}

            <div
              className="chart-card large-chart"
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate("/alert-details")
              }
            >

              <div className="card-title">

                <div>
                  <h3>
                    Border Security Alerts
                  </h3>

                  <p>
                    Alert activity across monitored
                    border sectors
                  </p>
                </div>

                <select>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>

              </div>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <LineChart
                  data={lineData}
                >

                  <CartesianGrid
                    stroke="#2d2d2d"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="day"
                    stroke="#9ca3af"
                  />

                  <YAxis
                    stroke="#9ca3af"
                  />

                  <Tooltip
                    contentStyle={{
                      background:
                        "#141414",
                      border:
                        "1px solid #2f2f2f",
                      borderRadius:
                        "10px",
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="alerts"
                    stroke="#37c75b"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      fill: "#37c75b",
                    }}
                    activeDot={{
                      r: 7,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

            {/* =================================================
                ALERTS BY TYPE
            ================================================= */}

            <div className="chart-card pie-card">

              <h3>
                Threats by Detection Type
              </h3>

              <div className="pie-wrapper">

                {/* DONUT */}

                <div className="pie-chart">

                  <div className="pie-center">

                    <h2>
                      152
                    </h2>

                    <span>
                      Alerts
                    </span>

                  </div>

                </div>

                {/* LEGEND */}

                <div className="pie-legend">

                  <div className="legend-item">

                    <span className="legend-color green"></span>

                    <p>
                      Perimeter Intrusion
                    </p>

                    <strong>
                      64 (42%)
                    </strong>

                  </div>

                  <div className="legend-item">

                    <span className="legend-color yellow"></span>

                    <p>
                      Restricted Zone
                    </p>

                    <strong>
                      34 (22%)
                    </strong>

                  </div>

                  <div className="legend-item">

                    <span className="legend-color orange"></span>

                    <p>
                      Loitering
                    </p>

                    <strong>
                      22 (14%)
                    </strong>

                  </div>

                  <div className="legend-item">

                    <span className="legend-color red"></span>

                    <p>
                      Unauthorized Crossing
                    </p>

                    <strong>
                      18 (12%)
                    </strong>

                  </div>

                  <div className="legend-item">

                    <span className="legend-color purple"></span>

                    <p>
                      Other
                    </p>

                    <strong>
                      14 (10%)
                    </strong>

                  </div>

                </div>

              </div>

              <button
                className="report-btn"
                onClick={() =>
                  navigate(
                    "/alert-details"
                  )
                }
              >
                View full threat report →
              </button>

            </div>

          </div>

          {/* =================================================
              BOTTOM SECTION
          ================================================= */}

          <div className="analytics-bottom">

            {/* =================================================
                TOP SURVEILLANCE CAMERAS
            ================================================= */}

            <div className="bottom-card camera-card">

              <h3>
                Top Surveillance Cameras
              </h3>

              <div className="camera-list">

                {topCameras.map(
                  (camera, index) => (

                    <div
                      className="camera-item"
                      key={index}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(
                          "/live-monitoring"
                        )
                      }
                    >

                      <div className="camera-info">

                        <div className="camera-icon">
                          <Monitor
                            size={18}
                          />
                        </div>

                        <span>
                          {camera.name}
                        </span>

                      </div>

                      <div className="camera-alerts">
                        {camera.alerts} alerts
                      </div>

                    </div>

                  )
                )}

              </div>

              <button
                className="link-btn"
                onClick={() =>
                  navigate(
                    "/camera-management"
                  )
                }
              >
                View all surveillance cameras →
              </button>

            </div>

            {/* =================================================
                BORDER THREAT HEATMAP
            ================================================= */}

            <div className="bottom-card heatmap-card">

              <div className="card-title">

                <div>
                  <h3>
                    Border Threat Heatmap
                  </h3>

                  <p>
                    AI-detected activity by sector
                  </p>
                </div>

              </div>

              <div className="heatmap-placeholder">

                <div className="heat glow1"></div>

                <div className="heat glow2"></div>

                <div className="heat glow3"></div>

                <div className="heat glow4"></div>

                <div className="heat glow5"></div>

                <div className="heatmap-scale">

                  <span>
                    High
                  </span>

                  <div className="gradient-bar"></div>

                  <span>
                    Low
                  </span>

                </div>

              </div>

              <button
                className="link-btn"
                onClick={() =>
                  navigate(
                    "/live-monitoring"
                  )
                }
              >
                View border surveillance map →
              </button>

            </div>

            {/* =================================================
                SYSTEM PERFORMANCE
            ================================================= */}

            <div className="bottom-card performance-card">

              <h3>
                Surveillance System Performance
              </h3>

              <div className="performance-grid">

                {/* UPTIME */}

                <div className="performance-item">

                  <div className="circle-progress">
                    <span>
                      99.8%
                    </span>
                  </div>

                  <div className="performance-text">

                    <h4>
                      System Uptime
                    </h4>

                    <p className="positive">
                      ↑ 0.3% from last week
                    </p>

                  </div>

                </div>

                {/* STORAGE */}

                <div className="performance-item">

                  <div className="circle-progress">
                    <span>
                      62%
                    </span>
                  </div>

                  <div className="performance-text">

                    <h4>
                      Evidence Storage
                    </h4>

                    <p className="positive">
                      ↑ 5% from last week
                    </p>

                  </div>

                </div>

                {/* BANDWIDTH */}

                <div className="performance-item">

                  <div className="circle-progress">
                    <span>
                      45%
                    </span>
                  </div>

                  <div className="performance-text">

                    <h4>
                      Network Usage
                    </h4>

                    <p className="negative">
                      ↓ 3% from last week
                    </p>

                  </div>

                </div>

                {/* CPU */}

                <div className="performance-item">

                  <div className="circle-progress">
                    <span>
                      28%
                    </span>
                  </div>

                  <div className="performance-text">

                    <h4>
                      AI Processing
                    </h4>

                    <p className="negative">
                      ↓ 6% from last week
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Analytics;
