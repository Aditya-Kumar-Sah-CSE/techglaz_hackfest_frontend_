// =======================================================
// Alerts.jsx
// GuardianAI Alerts Page
// =======================================================

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Search,
  Calendar,
  Filter,
  Eye,
  Shield,
} from "lucide-react";
import { acknowledgeAlert, getAlerts } from "../services/guardianApi";
import { unwrapList } from "../services/apiClient";
import { countByPriority, normalizeAlert } from "../services/dataMappers";
import "../styles/dashboard.css";
import "../styles/Alert.css";

function Alert() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let active = true;

    async function loadAlerts() {
      setLoading(true);
      try {
        const response = await getAlerts(50);
        const nextAlerts = unwrapList(response, "alerts").map(normalizeAlert);
        if (active) {
          setAlerts(nextAlerts);
          setApiMessage("");
        }
      } catch (error) {
        if (active) setApiMessage(error.message || "Unable to load alerts.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadAlerts();

    return () => {
      active = false;
    };
  }, []);

  const filteredAlerts = useMemo(
    () =>
      alerts.filter((alert) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          alert.title.toLowerCase().includes(query) ||
          alert.location.toLowerCase().includes(query) ||
          String(alert.cameraId).toLowerCase().includes(query);
        const matchesPriority =
          priorityFilter === "all" || alert.priority === priorityFilter;
        const matchesType =
          typeFilter === "all" || alert.type.toLowerCase().includes(typeFilter);
        const matchesStatus =
          statusFilter === "all" || alert.status === statusFilter;

        return matchesSearch && matchesPriority && matchesType && matchesStatus;
      }),
    [alerts, priorityFilter, searchQuery, statusFilter, typeFilter]
  );

  const handleViewAlert = (alertId) => {
    localStorage.setItem("guardianai-selected-alert-id", alertId);
    navigate("/alert-details");
  };

  const handleAcknowledgeAlert = async (alertId) => {
    const officerId =
      localStorage.getItem("guardianai-officer-id") ||
      window.prompt("Officer ID for acknowledgement");
    if (!officerId) return;

    localStorage.setItem("guardianai-officer-id", officerId);

    try {
      await acknowledgeAlert(alertId, officerId);
      setAlerts((current) =>
        current.map((alert) =>
          alert.id === alertId ? { ...alert, status: "acknowledged" } : alert
        )
      );
      setApiMessage("Alert acknowledged.");
    } catch (error) {
      setApiMessage(error.message || "Unable to acknowledge alert.");
    }
  };

  const totalAlerts = alerts.length;
  const highAlerts = countByPriority(alerts, "high") + countByPriority(alerts, "critical");
  const mediumAlerts = countByPriority(alerts, "medium");
  const lowAlerts = countByPriority(alerts, "low");

  return (
    <div className="dashboard">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="page-content">
          <section className="alerts-header">
            <div className="alerts-heading">
              <div className="alerts-icon">
                <Bell size={34} />
              </div>
              <div>
                <h1>Alerts</h1>
                <p>Monitor and respond to security alerts in real-time</p>
              </div>
            </div>

            <div className="system-status-card">
              <div className="system-status-left">
                <div className="status-icon">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h3>{apiMessage ? "API Notice" : "System Active"}</h3>
                  <p>{apiMessage || "Alerts API connected"}</p>
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

          <section className="alerts-stats">
            <div className="alert-stat-card">
              <div className="alert-stat-icon total">
                <Bell size={28} />
              </div>
              <div className="alert-stat-content">
                <p>Total Alerts</p>
                <h2>{loading ? "--" : totalAlerts}</h2>
                <span className="increase">Loaded from backend</span>
              </div>
            </div>

            <div className="alert-stat-card">
              <div className="alert-stat-icon high">
                <AlertCircle size={28} />
              </div>
              <div className="alert-stat-content">
                <p>High Priority</p>
                <h2>{loading ? "--" : highAlerts}</h2>
                <span className="high-text">Requires immediate attention</span>
              </div>
            </div>

            <div className="alert-stat-card">
              <div className="alert-stat-icon medium">
                <AlertTriangle size={28} />
              </div>
              <div className="alert-stat-content">
                <p>Medium Priority</p>
                <h2>{loading ? "--" : mediumAlerts}</h2>
                <span className="medium-text">Monitor closely</span>
              </div>
            </div>

            <div className="alert-stat-card">
              <div className="alert-stat-icon low">
                <CheckCircle2 size={28} />
              </div>
              <div className="alert-stat-content">
                <p>Low Priority</p>
                <h2>{loading ? "--" : lowAlerts}</h2>
                <span className="low-text">Under observation</span>
              </div>
            </div>
          </section>

          <section className="alerts-toolbar">
            <div className="alerts-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>

            <select
              className="filter-btn"
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              className="filter-btn"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              <option value="all">All Types</option>
              <option value="intrusion">Intrusion</option>
              <option value="vehicle">Vehicle</option>
              <option value="crowd">Crowd</option>
              <option value="loitering">Loitering</option>
            </select>

            <select
              className="filter-btn"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
              <option value="completed">Completed</option>
            </select>

            <button className="filter-btn" type="button">
              <Calendar size={18} />
              <span>Today</span>
            </button>

            <button className="filter-icon-btn" type="button">
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </section>

          <section className="alerts-list">
            <div className="alert-list-header">
              <div className="header-camera">Camera</div>
              <div className="header-alert">Alert</div>
              <div className="header-time">Time</div>
              <div className="header-status">Status</div>
              <div className="header-actions">Actions</div>
            </div>

            {filteredAlerts.length ? (
              filteredAlerts.map((alert) => (
                <div className="alert-row" key={alert.id}>
                  <div className="alert-camera">
                    <img src={alert.image} alt={alert.cameraName} />
                  </div>

                  <div className="alert-info">
                    <div className={`alert-type ${alert.priority}`}>
                      <AlertTriangle size={18} />
                    </div>

                    <div className="alert-details">
                      <h3>{alert.title}</h3>
                      <p>
                        {alert.location} • {alert.cameraId}
                      </p>
                      <div className="alert-meta">
                        <span className={`priority-badge ${alert.priority}`}>
                          {alert.priority.toUpperCase()} PRIORITY
                        </span>
                        <span>• {alert.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="alert-time">
                    <h4>{alert.time}</h4>
                    <span>{alert.date}</span>
                  </div>

                  <div className="alert-status">
                    <span
                      className={`status-badge ${
                        ["resolved", "completed"].includes(alert.status)
                          ? "resolved"
                          : "active"
                      }`}
                    >
                      ● {alert.status}
                    </span>
                  </div>

                  <div className="alert-actions">
                    <button
                      className="view-btn"
                      onClick={() => handleViewAlert(alert.id)}
                    >
                      <Eye size={15} /> View
                    </button>
                    {!["resolved", "completed", "acknowledged"].includes(
                      alert.status
                    ) && (
                      <button
                        className="resolve-btn"
                        onClick={() => handleAcknowledgeAlert(alert.id)}
                      >
                        <Shield size={15} /> Ack
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <AlertTriangle size={45} />
                <p>{loading ? "Loading alerts..." : "No alerts found."}</p>
              </div>
            )}
          </section>

          <section className="alerts-footer">
            <p>
              Showing {filteredAlerts.length} of {totalAlerts} alerts
            </p>
            <div className="pagination">
              <button className="page-btn active">1</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Alert;
