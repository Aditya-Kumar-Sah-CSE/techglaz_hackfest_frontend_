import "./Analytics.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { Camera, ShieldAlert, Users, Clock, Monitor } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/* ===========================
   Dashboard Statistics
=========================== */

const stats = [
  {
    title: "Total Cameras",
    value: "48",
    change: "+12% from last week",
    icon: Camera,
    positive: true,
  },
  {
    title: "Total Alerts",
    value: "152",
    change: "+18% from last week",
    icon: ShieldAlert,
    positive: true,
  },
  {
    title: "Unique Detections",
    value: "896",
    change: "+22% from last week",
    icon: Users,
    positive: true,
  },
  {
    title: "Avg. Response Time",
    value: "2.4m",
    change: "-8% from last week",
    icon: Clock,
    positive: false,
  },
];

/* ===========================
   Alert Trend Data
=========================== */

const lineData = [
  { day: "Jul 24", alerts: 35 },
  { day: "Jul 25", alerts: 60 },
  { day: "Jul 26", alerts: 46 },
  { day: "Jul 27", alerts: 68 },
  { day: "Jul 28", alerts: 90 },
  { day: "Jul 29", alerts: 61 },
  { day: "Jul 30", alerts: 89 },
];

function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="analytics-page">
          {/* ================= Header ================= */}

          <div className="analytics-header">
            <div>
              <h1>Analytics</h1>
              <p>Insights and statistics from your surveillance system</p>
            </div>

            <select className="analytics-filter">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          {/* ================= KPI Cards ================= */}

          <div className="analytics-stats">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="analytics-card"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (index === 0) navigate("/camera-management");
                    else if (index === 1) navigate("/alert-details");
                    else navigate("/live-monitoring");
                  }}
                >
                  <div className="card-icon">
                    <Icon size={28} />
                  </div>

                  <div className="card-content">
                    <span>{item.title}</span>

                    <h2>{item.value}</h2>

                    <p className={item.positive ? "positive" : "negative"}>
                      {item.change}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= Alerts Over Time ================= */}

          <div className="analytics-grid">
            <div
              className="chart-card large-chart"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/alert-details")}
            >
              <div className="card-title">
                <h3>Alerts Over Time</h3>

                <select>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={lineData}>
                  <CartesianGrid stroke="#2d2d2d" vertical={false} />

                  <XAxis dataKey="day" stroke="#9ca3af" />

                  <YAxis stroke="#9ca3af" />

                  <Tooltip
                    contentStyle={{
                      background: "#141414",
                      border: "1px solid #2f2f2f",
                      borderRadius: "10px",
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

            {/* ================= Alerts By Type ================= */}

            <div className="chart-card pie-card">
              <h3>Alerts by Type</h3>

              <div className="pie-wrapper">
                {/* Donut Chart Placeholder */}

                <div className="pie-chart">
                  <div className="pie-center">
                    <h2>152</h2>
                    <span>Total</span>
                  </div>
                </div>

                {/* Legend */}

                <div className="pie-legend">
                  <div className="legend-item">
                    <span className="legend-color green"></span>

                    <p>Intrusion</p>

                    <strong>64 (42%)</strong>
                  </div>

                  <div className="legend-item">
                    <span className="legend-color yellow"></span>

                    <p>Loitering</p>

                    <strong>34 (22%)</strong>
                  </div>

                  <div className="legend-item">
                    <span className="legend-color orange"></span>

                    <p>Fight / Violence</p>

                    <strong>22 (14%)</strong>
                  </div>

                  <div className="legend-item">
                    <span className="legend-color red"></span>

                    <p>Fire / Smoke</p>

                    <strong>18 (12%)</strong>
                  </div>

                  <div className="legend-item">
                    <span className="legend-color purple"></span>

                    <p>Other</p>

                    <strong>14 (10%)</strong>
                  </div>
                </div>
              </div>

              <button
                className="report-btn"
                onClick={() => navigate("/alert-details")}
              >
                View full report →
              </button>
            </div>
          </div>

          {/* ================= Bottom Section ================= */}

          <div className="analytics-bottom">
            {/* ================= Top Active Cameras ================= */}

            <div className="bottom-card camera-card">
              <h3>Top Active Cameras</h3>

              <div className="camera-list">
                {[
                  {
                    name: "Main Entrance",
                    alerts: 128,
                  },
                  {
                    name: "Parking Area",
                    alerts: 96,
                  },
                  {
                    name: "Building - A Lobby",
                    alerts: 74,
                  },
                  {
                    name: "Back Gate",
                    alerts: 62,
                  },
                  {
                    name: "Cafeteria",
                    alerts: 48,
                  },
                ].map((camera, index) => (
                  <div
                    className="camera-item"
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/live-monitoring")}
                  >
                    <div className="camera-info">
                      <div className="camera-icon">
                        <Monitor size={18} />
                      </div>

                      <span>{camera.name}</span>
                    </div>

                    <div className="camera-alerts">{camera.alerts} alerts</div>
                  </div>
                ))}
              </div>

              <button
                className="link-btn"
                onClick={() => navigate("/camera-management")}
              >
                View all cameras →
              </button>
            </div>

            {/* ================= Heatmap ================= */}

            <div className="bottom-card heatmap-card">
              <div className="card-title">
                <h3>Alerts Heatmap</h3>
              </div>

              <div className="heatmap-placeholder">
                <div className="heat glow1"></div>
                <div className="heat glow2"></div>
                <div className="heat glow3"></div>
                <div className="heat glow4"></div>
                <div className="heat glow5"></div>

                <div className="heatmap-scale">
                  <span>High</span>

                  <div className="gradient-bar"></div>

                  <span>Low</span>
                </div>
              </div>

              <button
                className="link-btn"
                onClick={() => navigate("/live-monitoring")}
              >
                View full map →
              </button>
            </div>

            {/* ================= System Performance ================= */}

            <div className="bottom-card performance-card">
              <h3>System Performance</h3>

              <div className="performance-grid">
                <div className="performance-item">
                  <div className="circle-progress">
                    <span>99.8%</span>
                  </div>

                  <div className="performance-text">
                    <h4>Uptime</h4>
                    <p className="positive">↑ 0.3% from last week</p>
                  </div>
                </div>

                <div className="performance-item">
                  <div className="circle-progress">
                    <span>62%</span>
                  </div>

                  <div className="performance-text">
                    <h4>Storage Used</h4>
                    <p className="positive">↑ 5% from last week</p>
                  </div>
                </div>

                <div className="performance-item">
                  <div className="circle-progress">
                    <span>45%</span>
                  </div>

                  <div className="performance-text">
                    <h4>Bandwidth</h4>
                    <p className="negative">↓ 3% from last week</p>
                  </div>
                </div>

                <div className="performance-item">
                  <div className="circle-progress">
                    <span>28%</span>
                  </div>

                  <div className="performance-text">
                    <h4>CPU Usage</h4>
                    <p className="negative">↓ 6% from last week</p>
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
