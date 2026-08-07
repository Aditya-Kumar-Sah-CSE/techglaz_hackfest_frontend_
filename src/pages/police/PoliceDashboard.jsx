// ==========================================
// PoliceDashboard.jsx
// GuardianAI Police Authority Alerts Dashboard
// ==========================================

import { useEffect, useState } from "react";
import PoliceSidebar from "../../components/police/PoliceSidebar";
import PoliceNavbar from "../../components/police/PoliceNavbar";
import { policeAlerts, incidentStages, priorityConfig } from "../../data/policeData";
import { getAlerts } from "../../services/guardianApi";
import { unwrapList } from "../../services/apiClient";
import { normalizeAlert } from "../../services/dataMappers";
import {
  ShieldAlert,
  MapPin,
  Camera,
  Search,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Eye,
  Shield,
  Radio,
  Car,
  Users,
  User,
  DoorOpen,
  Check,
} from "lucide-react";

// CCTV Images
import cam1 from "../../assets/images/cam1.jpg";
import cam2 from "../../assets/images/cam2.jpg";
import cam3 from "../../assets/images/cam3.jpg";
import cam4 from "../../assets/images/cam4.jpg";
import cam5 from "../../assets/images/cam5.jpg";

const cameraImages = {
  "CAM-005": cam1,
  "CAM-125": cam2,
  "CAM-076": cam3,
  "CAM-003": cam4,
  "CAM-033": cam5,
};

function toPoliceAlert(alert) {
  const normalized = normalizeAlert(alert);

  return {
    id: normalized.id,
    title: normalized.title,
    priority: normalized.priority === "critical" ? "critical" : normalized.priority,
    iconType: normalized.type.toLowerCase().includes("vehicle")
      ? "car"
      : normalized.type.toLowerCase().includes("crowd")
        ? "users"
        : normalized.type.toLowerCase().includes("door")
          ? "door"
          : "shield",
    summary: normalized.description,
    location: {
      building: normalized.building || normalized.location,
      area: normalized.location,
      address: normalized.location,
    },
    cameraId: normalized.cameraId,
    cameraName: normalized.cameraName,
    timeDisplay: normalized.time,
    dateDisplay: normalized.date,
    fullTime: `${normalized.time}, ${normalized.date}`,
    confidence: normalized.confidence || 0,
    detectedBy: "GuardianAI Detection",
    alertType: normalized.type,
    assignedOfficer: "Unassigned",
    status: normalized.status,
    statusColor: ["resolved", "completed"].includes(normalized.status)
      ? "#22C55E"
      : "#EF4444",
    statusBg: "rgba(239, 68, 68, 0.15)",
    currentStage: normalized.status === "acknowledged" ? 2 : 1,
    stageTimes: {
      "Alert Detected": normalized.time,
      "AI Verified": normalized.time,
    },
  };
}

function PoliceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState(policeAlerts);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedAlertId, setSelectedAlertId] = useState(policeAlerts[0].id);

  useEffect(() => {
    let active = true;

    async function loadPoliceAlerts() {
      try {
        const response = await getAlerts(50);
        const nextAlerts = unwrapList(response, "alerts").map(toPoliceAlert);
        if (active && nextAlerts.length) {
          setAlerts(nextAlerts);
          setSelectedAlertId(nextAlerts[0].id);
        }
      } catch {
        if (active) setAlerts(policeAlerts);
      }
    }

    loadPoliceAlerts();

    return () => {
      active = false;
    };
  }, []);

  // Filter alerts by search query & dropdown filters
  const filteredAlerts = alerts.filter((alertItem) => {
    const matchesSearch =
      alertItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alertItem.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alertItem.location.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alertItem.cameraId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || alertItem.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "all" ||
      alertItem.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesType =
      typeFilter === "all" ||
      alertItem.title.toLowerCase().includes(typeFilter.toLowerCase()) ||
      alertItem.alertType.toLowerCase().includes(typeFilter.toLowerCase());

    return matchesSearch && matchesPriority && matchesStatus && matchesType;
  });

  const activeAlert =
    alerts.find((a) => a.id === selectedAlertId) || alerts[0];

  // Helper for rendering alert category icon
  const renderAlertCategoryIcon = (type, priority) => {
    let IconComponent = ShieldAlert;
    if (type === "car") IconComponent = Car;
    else if (type === "users") IconComponent = Users;
    else if (type === "user") IconComponent = User;
    else if (type === "door") IconComponent = DoorOpen;

    const pColor = priorityConfig[priority]?.color || "#22C55E";

    return (
      <div
        className="alert-category-avatar"
        style={{
          backgroundColor: `${pColor}18`,
          borderColor: `${pColor}40`,
        }}
      >
        <IconComponent size={24} style={{ color: pColor }} />
      </div>
    );
  };

  return (
    <div className="police-dashboard-wrapper">
      <PoliceSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="police-main-content">
        <PoliceNavbar
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="police-page-container">
          {/* Page Header */}
          <div className="alerts-page-header">
            <h1 className="alerts-heading-title">Alerts</h1>
            <p className="alerts-subheading font-muted">
              Monitor and respond to security incidents in real-time.
            </p>
          </div>

          {/* Compact Filters Row */}
          <div className="alerts-filter-bar">
            <div className="filter-input-search">
              <Search size={16} className="text-muted-icon" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-select-box">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>

            <div className="filter-select-box">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="in progress">In Progress</option>
                <option value="escalated">Escalated</option>
                <option value="monitoring">Monitoring</option>
                <option value="resolved">Resolved</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>

            <div className="filter-select-box">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="intrusion">Intrusion</option>
                <option value="vehicle">Vehicle</option>
                <option value="crowd">Crowd</option>
                <option value="loitering">Loitering</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>

            <div className="filter-date-box">
              <Calendar size={15} className="text-muted-icon" />
              <span>Today</span>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>

          {/* Main 2-Column Grid (Left 65%, Right 35%) */}
          <div className="police-grid-layout">
            {/* ==========================================
                LEFT COLUMN: Alert Cards List
            ========================================== */}
            <div className="police-left-column">
              <div className="police-alerts-list">
                {filteredAlerts.length === 0 ? (
                  <div className="empty-alerts-state">
                    <ShieldAlert size={48} className="text-gold" />
                    <p>No security alerts match your criteria.</p>
                  </div>
                ) : (
                  filteredAlerts.map((alertItem) => {
                    const isSelected = alertItem.id === activeAlert.id;
                    const pConfig =
                      priorityConfig[alertItem.priority] || priorityConfig.medium;

                    return (
                      <div
                        key={alertItem.id}
                        className={`police-alert-card-row ${
                          isSelected ? "selected-alert-row" : ""
                        }`}
                        style={{
                          borderLeftColor: pConfig.color,
                        }}
                        onClick={() => setSelectedAlertId(alertItem.id)}
                      >
                        {/* Icon */}
                        {renderAlertCategoryIcon(
                          alertItem.iconType,
                          alertItem.priority
                        )}

                        {/* Middle Content */}
                        <div className="card-middle-content">
                          <div className="card-priority-row">
                            <span
                              className="priority-text-pill"
                              style={{
                                color: pConfig.color,
                                backgroundColor: pConfig.bg,
                                borderColor: pConfig.border,
                              }}
                            >
                              {pConfig.label}
                            </span>
                          </div>

                          <h3 className="alert-card-h3">{alertItem.title}</h3>

                          <div className="card-meta-line">
                            <span className="meta-subitem">
                              <MapPin size={14} className="text-muted-icon" />
                              {alertItem.location.area}
                            </span>
                            <span className="meta-subitem">
                              <Camera size={14} className="text-muted-icon" />
                              {alertItem.cameraId}
                            </span>
                          </div>
                        </div>

                        {/* Right Meta & Status */}
                        <div className="card-right-content">
                          <div className="time-date-block">
                            <span className="time-text">{alertItem.timeDisplay}</span>
                            <span className="date-text">{alertItem.dateDisplay}</span>
                          </div>

                          <div className="status-pill-block">
                            <span
                              className="status-dot"
                              style={{ backgroundColor: alertItem.statusColor }}
                            ></span>
                            <span
                              className="status-label-text"
                              style={{ color: alertItem.statusColor }}
                            >
                              {alertItem.status}
                            </span>
                          </div>
                        </div>

                        {/* Chevron Arrow */}
                        <div className="chevron-arrow-wrap">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Pagination Bar */}
              <div className="pagination-container">
                <span className="pagination-info">Showing 1 to 5 of 24 alerts</span>

                <div className="pagination-controls">
                  <button className="page-nav-btn" disabled>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="page-num-btn active">1</button>
                  <button className="page-num-btn">2</button>
                  <button className="page-num-btn">3</button>
                  <span className="page-dots">...</span>
                  <button className="page-num-btn">6</button>
                  <button className="page-nav-btn">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ==========================================
                RIGHT COLUMN: Live CCTV & Details
            ========================================== */}
            <div className="police-right-column">
              {/* Live Camera Card */}
              <div className="cctv-card-container">
                <div className="cctv-card-header">
                  <h3>Live Camera - {activeAlert.cameraId}</h3>
                  <span className="live-pill-tag">
                    <span className="live-pulse-dot"></span> LIVE
                  </span>
                </div>

                {/* Night-Vision / Grayscale Video Frame */}
                <div className="cctv-video-viewport">
                  <img
                    src={cameraImages[activeAlert.cameraId] || cam1}
                    alt={activeAlert.cameraName}
                    className="nightvision-cctv-img"
                  />

                  {/* Top Left Timestamp Overlay */}
                  <div className="cctv-top-timestamp">
                    {activeAlert.fullTime}
                  </div>

                  {/* Bottom Left REC Indicator */}
                  <div className="cctv-rec-tag">
                    <span className="rec-red-dot"></span> REC
                  </div>
                </div>
              </div>

              {/* Incident Information Card */}
              <div className="incident-info-card">
                <div className="incident-info-header">
                  <h2>{activeAlert.title}</h2>
                  <span
                    className="priority-badge-solid"
                    style={{
                      backgroundColor:
                        (priorityConfig[activeAlert.priority] || priorityConfig.medium)
                          .bg,
                      color:
                        (priorityConfig[activeAlert.priority] || priorityConfig.medium)
                          .color,
                      borderColor:
                        (priorityConfig[activeAlert.priority] || priorityConfig.medium)
                          .color,
                    }}
                  >
                    {(priorityConfig[activeAlert.priority] || priorityConfig.medium)
                      .label}
                  </span>
                </div>

                {/* Incident Detail Rows */}
                <div className="incident-detail-rows">
                  <div className="detail-row">
                    <span className="row-key">
                      <MapPin size={14} className="row-icon" /> Location
                    </span>
                    <div className="row-val-stack">
                      <span className="val-primary font-bold">
                        {activeAlert.location.area}
                      </span>
                      <span className="val-sub font-muted">
                        {activeAlert.location.building}
                      </span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="row-key">
                      <Camera size={14} className="row-icon" /> Camera
                    </span>
                    <span className="row-val font-mono">{activeAlert.cameraId}</span>
                  </div>

                  <div className="detail-row">
                    <span className="row-key">
                      <Search size={14} className="row-icon" /> Time
                    </span>
                    <span className="row-val">{activeAlert.fullTime}</span>
                  </div>

                  <div className="detail-row">
                    <span className="row-key">
                      <ShieldAlert size={14} className="row-icon" /> Alert Type
                    </span>
                    <span className="row-val font-medium">{activeAlert.alertType}</span>
                  </div>

                  <div className="detail-row">
                    <span className="row-key">
                      <Radio size={14} className="row-icon" /> Detected By
                    </span>
                    <span className="row-val">{activeAlert.detectedBy}</span>
                  </div>

                  <div className="detail-row row-confidence">
                    <span className="row-key">
                      <Check size={14} className="row-icon" /> Confidence Score
                    </span>
                    <div className="confidence-progress-wrap">
                      <span className="confidence-num">{activeAlert.confidence}%</span>
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${activeAlert.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Incident Progress Section */}
                <div className="incident-progress-section">
                  <h4 className="progress-section-title">Incident Progress</h4>

                  <div className="horizontal-stepper">
                    {incidentStages.map((stageObj, idx) => {
                      const isCompleted = idx <= activeAlert.currentStage;
                      const isCurrent = idx === activeAlert.currentStage;
                      const timeString = activeAlert.stageTimes[stageObj.key] || "";

                      let nodeClass = "pending";
                      if (isCurrent) nodeClass = "current";
                      else if (isCompleted) nodeClass = "completed";

                      return (
                        <div key={idx} className={`stepper-node-item ${nodeClass}`}>
                          <div className="node-icon-circle">
                            <Check size={12} />
                          </div>
                          <span className="node-step-label">{stageObj.label}</span>
                          {timeString && (
                            <span className="node-step-time">{timeString}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="incident-bottom-actions">
                  <button
                    className="action-btn-outline"
                    onClick={() =>
                      alert(`Viewing full details for alert ${activeAlert.id}`)
                    }
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>

                  <button
                    className="action-btn-gold"
                    onClick={() =>
                      alert(`Taking action on incident ${activeAlert.id}`)
                    }
                  >
                    <Shield size={16} />
                    <span>Take Action</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PoliceDashboard;
