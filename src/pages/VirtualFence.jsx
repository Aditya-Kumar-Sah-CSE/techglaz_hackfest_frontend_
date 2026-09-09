import { useState } from "react";
import {
  Shield,
  Fence,
  AlertTriangle,
  Ban,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Settings,
  Clock3,
  ZoomIn,
  ZoomOut,
  Crosshair,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "./VirtualFence.css";

const VirtualFence = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
  /* =====================================================
     FENCE DATA
  ===================================================== */

  const [fences, setFences] = useState([
    {
      id: 1,
      name: "Fence Alpha",
      sector: "Sector A",
      status: "Active",
      type: "Operational Zone",
      color: "#35ef78",
      points: [
        [18, 19],
        [29, 10],
        [36, 21],
        [37, 37],
        [29, 46],
        [17, 42],
        [12, 30],
      ],
    },
    {
      id: 2,
      name: "Fence Bravo",
      sector: "Sector B",
      status: "Alert",
      type: "Operational Zone",
      color: "#ffc62e",
      points: [
        [67, 23],
        [78, 14],
        [89, 22],
        [92, 38],
        [82, 45],
        [72, 37],
      ],
    },
    {
      id: 3,
      name: "Fence Charlie",
      sector: "Sector D",
      status: "Active",
      type: "Operational Zone",
      color: "#35ef78",
      points: [
        [25, 60],
        [38, 51],
        [45, 62],
        [43, 79],
        [30, 84],
        [20, 74],
      ],
    },
    {
      id: 4,
      name: "Fence Delta",
      sector: "Sector E",
      status: "Inactive",
      type: "Operational Zone",
      color: "#a9b5b7",
      points: [
        [63, 59],
        [75, 52],
        [84, 61],
        [85, 77],
        [76, 85],
        [66, 79],
      ],
    },
    {
      id: 5,
      name: "Restricted Zone 1",
      sector: "High Security",
      status: "Restricted",
      type: "Restricted Area",
      color: "#ff4e55",
      points: [
        [47, 13],
        [59, 15],
        [61, 32],
        [57, 42],
        [45, 38],
        [41, 23],
      ],
    },
  ]);

  const [selectedFence, setSelectedFence] = useState(fences[0]);

  const [fenceName, setFenceName] = useState("");
  const [fenceType, setFenceType] = useState("Operational Zone");
  const [fenceStatus, setFenceStatus] = useState("Active");

  const [zoom, setZoom] = useState(1);

  const [settings, setSettings] = useState({
    intrusion: true,
    realtime: true,
    email: false,
    sms: true,
  });

  const [sensitivity, setSensitivity] = useState(80);

  /* =====================================================
     RECENT EVENTS
  ===================================================== */

  const events = [
    {
      time: "14:36:12",
      type: "Intrusion Detected",
      fence: "Fence Bravo",
      location: "26.8451° N, 80.9452° E",
      details: "1 person detected",
      status: "High",
    },
    {
      time: "14:32:45",
      type: "Fence Breach",
      fence: "Restricted Zone 1",
      location: "26.8423° N, 80.9481° E",
      details: "Unauthorized movement",
      status: "High",
    },
    {
      time: "14:28:10",
      type: "Motion Alert",
      fence: "Fence Bravo",
      location: "26.8467° N, 80.9432° E",
      details: "Suspicious activity",
      status: "Medium",
    },
    {
      time: "14:15:03",
      type: "Fence Restored",
      fence: "Fence Delta",
      location: "26.8401° N, 80.9502° E",
      details: "Connection re-established",
      status: "Info",
    },
    {
      time: "14:02:21",
      type: "Camera Triggered",
      fence: "Fence Alpha",
      location: "26.8478° N, 80.9405° E",
      details: "Movement near perimeter",
      status: "Medium",
    },
  ];

  /* =====================================================
     CREATE FENCE
  ===================================================== */

  const createFence = () => {
    if (!fenceName.trim()) {
      alert("Please enter a fence name.");
      return;
    }

    const newFence = {
      id: Date.now(),
      name: fenceName.trim(),
      sector: "New Sector",
      status: fenceStatus,
      type: fenceType,
      color:
        fenceStatus === "Active"
          ? "#35ef78"
          : fenceStatus === "Alert"
            ? "#ffc62e"
            : fenceStatus === "Restricted"
              ? "#ff4e55"
              : "#a9b5b7",
      points: [
        [28, 35],
        [36, 27],
        [45, 34],
        [43, 48],
        [33, 51],
        [26, 44],
      ],
    };

    setFences((previous) => [...previous, newFence]);
    setSelectedFence(newFence);
    setFenceName("");
  };

  /* =====================================================
     DELETE FENCE
  ===================================================== */

  const deleteFence = (id) => {
    const updatedFences = fences.filter(
      (fence) => fence.id !== id
    );

    setFences(updatedFences);

    if (selectedFence?.id === id) {
      setSelectedFence(updatedFences[0] || null);
    }
  };

  /* =====================================================
     TOGGLE SETTINGS
  ===================================================== */

  const toggleSetting = (key) => {
    setSettings((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  /* =====================================================
     STATUS HELPERS
  ===================================================== */

  const statusColor = (status) => {
    if (status === "Active") return "#35ef78";
    if (status === "Alert") return "#ffc62e";
    if (status === "Restricted") return "#ff4e55";

    return "#a9b5b7";
  };

  const getStatusClass = (status) => {
    if (status === "Active") return "active";
    if (status === "Alert") return "alert";
    if (status === "Restricted") return "restricted";

    return "inactive";
  };

  /* =====================================================
     POLYGON POINTS
  ===================================================== */

  const polygonPoints = (points) =>
    points.map((point) => point.join(",")).join(" ");

  /* =====================================================
     FENCE CENTER
  ===================================================== */

  const getFenceCenter = (points) => {
    const centerX =
      points.reduce((sum, point) => sum + point[0], 0) /
      points.length;

    const centerY =
      points.reduce((sum, point) => sum + point[1], 0) /
      points.length;

    return {
      x: centerX,
      y: centerY,
    };
  };

  /* =====================================================
     ZOOM CONTROLS
  ===================================================== */

  const zoomIn = () => {
    setZoom((value) => Math.min(value + 0.1, 1.5));
  };

  const zoomOut = () => {
    setZoom((value) => Math.max(value - 0.1, 0.8));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  /* =====================================================
     STATISTICS
  ===================================================== */

  const activeFences = fences.filter(
    (fence) => fence.status === "Active"
  ).length;

  const alertFences = fences.filter(
    (fence) => fence.status === "Alert"
  ).length;

  const inactiveFences = fences.filter(
    (fence) => fence.status === "Inactive"
  ).length;

  const restrictedFences = fences.filter(
    (fence) => fence.status === "Restricted"
  ).length;

  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <div className="dashboard">
    <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />
    <main className="main-content">
    <Navbar setSidebarOpen={setSidebarOpen} />

    <div className="page-content">
      <div className="border-map-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <header className="virtual-fence-header">

        <div className="virtual-fence-title-area">

          <div className="virtual-fence-title-icon">
            <Shield size={30} strokeWidth={2} />
          </div>

          <div className="virtual-fence-heading-content">
            <h1 className="virtual-fence-title">
              Virtual Fence
            </h1>

            <p className="virtual-fence-subtitle">
              Geofence management for border security
            </p>
          </div>

        </div>

        <div className="virtual-fence-header-right">

          <div className="virtual-fence-system-status">
            <span className="virtual-fence-system-dot" />
            <span>System Active</span>
          </div>

          <div className="virtual-fence-date-time">
            <span>08 Sep 2026</span>
            <span>14:38:21</span>
          </div>

        </div>

      </header>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="virtual-fence-stats">

        {/* Active Fences */}

        <div className="virtual-fence-stat-card">

          <div className="virtual-fence-stat-icon green">
            <Fence size={23} />
          </div>

          <div className="virtual-fence-stat-info">

            <div className="virtual-fence-stat-label">
              Active Fences
            </div>

            <div className="virtual-fence-stat-value">
              {activeFences}
            </div>

            <div className="virtual-fence-stat-extra">
              <span className="green">
                {activeFences} Secure
              </span>

              <span className="yellow">
                {alertFences} Alert
              </span>

              <span>
                {inactiveFences} Inactive
              </span>
            </div>

          </div>

        </div>

        {/* Intrusion Detections */}

        <div className="virtual-fence-stat-card">

          <div className="virtual-fence-stat-icon red">
            <AlertTriangle size={23} />
          </div>

          <div className="virtual-fence-stat-info">

            <div className="virtual-fence-stat-label">
              Intrusion Detections
            </div>

            <div className="virtual-fence-stat-value">
              2
            </div>

            <div className="virtual-fence-stat-extra red">
              ↑ +1 from last hour
            </div>

          </div>

        </div>

        {/* Restricted Zones */}

        <div className="virtual-fence-stat-card">

          <div className="virtual-fence-stat-icon yellow">
            <Ban size={23} />
          </div>

          <div className="virtual-fence-stat-info">

            <div className="virtual-fence-stat-label">
              Restricted Zones
            </div>

            <div className="virtual-fence-stat-value">
              {restrictedFences || 3}
            </div>

            <div className="virtual-fence-stat-extra">
              High Security Areas
            </div>

          </div>

        </div>

        {/* Overall Status */}

        <div className="virtual-fence-stat-card">

          <div className="virtual-fence-stat-icon green">
            <Shield size={23} />
          </div>

          <div className="virtual-fence-stat-info">

            <div className="virtual-fence-stat-label">
              Overall Status
            </div>

            <div className="virtual-fence-stat-value green">
              Secure
            </div>

            <div className="virtual-fence-stat-extra">
              Perimeter Monitoring Active
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="virtual-fence-main">

        {/* =================================================
            MAP
        ================================================= */}

        <section className="virtual-fence-map">

          <div
            className="virtual-fence-map-background"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center",
              transition: "transform 0.25s ease",
            }}
          >

            {/* Region label */}

            <div className="virtual-fence-map-region">
              BORDER REGION • SECTOR 01
            </div>

            {/* International border */}

            <div className="virtual-fence-border-line" />

            <div className="virtual-fence-border-label">
              INTERNATIONAL
              <br />
              BORDER
            </div>

            {/* =================================================
                FENCE POLYGONS
            ================================================= */}

            <svg
              className="virtual-fence-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >

              {fences.map((fence) => {

                const isSelected =
                  selectedFence?.id === fence.id;

                return (
                  <g key={fence.id}>

                    <polygon
                      className={`virtual-fence-polygon ${
                        isSelected ? "selected" : ""
                      }`}
                      points={polygonPoints(fence.points)}
                      fill={fence.color}
                      fillOpacity={
                        fence.status === "Restricted"
                          ? 0.16
                          : 0.08
                      }
                      stroke={fence.color}
                      strokeWidth={
                        isSelected ? 0.75 : 0.45
                      }
                      strokeDasharray={
                        fence.status === "Inactive"
                          ? "1.5 1"
                          : "0"
                      }
                      onClick={() =>
                        setSelectedFence(fence)
                      }
                    />

                    {fence.points.map(
                      (point, index) => (
                        <circle
                          key={index}
                          className="virtual-fence-point"
                          cx={point[0]}
                          cy={point[1]}
                          r={
                            isSelected
                              ? 0.9
                              : 0.7
                          }
                          fill="#ffffff"
                          stroke={fence.color}
                          strokeWidth="0.3"
                        />
                      )
                    )}

                  </g>
                );
              })}

            </svg>

            {/* =================================================
                FENCE LABELS
            ================================================= */}

            {fences.map((fence) => {

              const center =
                getFenceCenter(fence.points);

              const statusClass =
                getStatusClass(fence.status);

              return (
                <button
                  key={fence.id}
                  type="button"
                  className={`virtual-fence-tag ${statusClass} ${
                    selectedFence?.id === fence.id
                      ? "selected"
                      : ""
                  }`}
                  style={{
                    left: `${center.x}%`,
                    top: `${center.y}%`,
                  }}
                  onClick={() =>
                    setSelectedFence(fence)
                  }
                  aria-label={`Select ${fence.name}`}
                >

                  <span className="virtual-fence-tag-name">
                    {fence.name}
                  </span>

                  <span className="virtual-fence-tag-status">
                    {fence.status}
                  </span>

                </button>
              );
            })}

          </div>

          {/* =================================================
              MAP CONTROLS
          ================================================= */}

          <div className="virtual-fence-map-controls">

            <button
              type="button"
              className="virtual-fence-map-control"
              onClick={zoomIn}
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn size={17} />
            </button>

            <button
              type="button"
              className="virtual-fence-map-control"
              onClick={zoomOut}
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut size={17} />
            </button>

            <button
              type="button"
              className="virtual-fence-map-control"
              onClick={resetZoom}
              title="Reset map"
              aria-label="Reset map"
            >
              <Crosshair size={17} />
            </button>

          </div>

          {/* =================================================
              MAP LEGEND
          ================================================= */}

          <div className="virtual-fence-map-legend">

            <h3 className="virtual-fence-legend-title">
              Map Legend
            </h3>

            <div className="virtual-fence-legend-item">
              <span className="virtual-fence-legend-dot green" />
              <span>Active Fence</span>
            </div>

            <div className="virtual-fence-legend-item">
              <span className="virtual-fence-legend-dot yellow" />
              <span>Alert Fence</span>
            </div>

            <div className="virtual-fence-legend-item">
              <span className="virtual-fence-legend-dot gray" />
              <span>Inactive Fence</span>
            </div>

            <div className="virtual-fence-legend-item">
              <span className="virtual-fence-legend-dot red" />
              <span>Restricted Zone</span>
            </div>

            <div className="virtual-fence-legend-item">
              <span className="virtual-fence-legend-border" />
              <span>Border Line</span>
            </div>

            <div className="virtual-fence-legend-item">
              <AlertTriangle size={12} />
              <span>Intrusion Detected</span>
            </div>

          </div>

          {/* =================================================
              MAP SCALE
          ================================================= */}

          <div className="virtual-fence-map-scale">

            <span>5 km</span>

            <div className="virtual-fence-scale-line" />

          </div>

        </section>

        {/* =================================================
            RIGHT MANAGEMENT PANEL
        ================================================= */}

        <aside className="virtual-fence-sidebar">

          {/* =================================================
              CREATE FENCE
          ================================================= */}

          <section className="virtual-fence-panel">

            <button
              type="button"
              className="virtual-fence-create-button"
              onClick={() =>
                document
                  .querySelector(
                    ".virtual-fence-input"
                  )
                  ?.focus()
              }
            >
              <Plus size={16} />

              <span>Create New Fence</span>
            </button>

          </section>

          {/* =================================================
              FENCE MANAGEMENT
          ================================================= */}

          <section className="virtual-fence-panel">

            <div className="virtual-fence-panel-heading">

              <Fence
                className="virtual-fence-panel-heading-icon"
                size={18}
              />

              <h2 className="virtual-fence-panel-heading-title">
                Fence Management
              </h2>

            </div>

            {/* Name */}

            <div className="virtual-fence-form-group">

              <label className="virtual-fence-form-label">
                Fence Name
              </label>

              <input
                className="virtual-fence-input"
                type="text"
                placeholder="Enter fence name"
                value={fenceName}
                onChange={(event) =>
                  setFenceName(
                    event.target.value
                  )
                }
              />

            </div>

            {/* Type */}

            <div className="virtual-fence-form-group">

              <label className="virtual-fence-form-label">
                Fence Type
              </label>

              <select
                className="virtual-fence-select"
                value={fenceType}
                onChange={(event) =>
                  setFenceType(
                    event.target.value
                  )
                }
              >
                <option>
                  Operational Zone
                </option>

                <option>
                  Restricted Area
                </option>

                <option>
                  High Security
                </option>
              </select>

            </div>

            {/* Status */}

            <div className="virtual-fence-form-group">

              <label className="virtual-fence-form-label">
                Status
              </label>

              <select
                className="virtual-fence-select"
                value={fenceStatus}
                onChange={(event) =>
                  setFenceStatus(
                    event.target.value
                  )
                }
              >
                <option>Active</option>
                <option>Alert</option>
                <option>Inactive</option>
                <option>Restricted</option>
              </select>

            </div>

            <button
              type="button"
              className="virtual-fence-create-button"
              onClick={createFence}
            >
              <Plus size={15} />
              <span>Create Fence</span>
            </button>

          </section>

          {/* =================================================
              EXISTING FENCES
          ================================================= */}

          <section className="virtual-fence-panel">

            <div className="virtual-fence-panel-heading">

              <Fence
                className="virtual-fence-panel-heading-icon"
                size={18}
              />

              <h2 className="virtual-fence-panel-heading-title">
                Existing Fences
              </h2>

              <span className="virtual-fence-count">
                {fences.length}
              </span>

            </div>

            <div className="virtual-fence-list">

              {fences.map((fence) => {

                const statusClass =
                  getStatusClass(
                    fence.status
                  );

                const isSelected =
                  selectedFence?.id ===
                  fence.id;

                return (
                  <div
                    key={fence.id}
                    className={`virtual-fence-list-item ${
                      isSelected
                        ? "selected"
                        : ""
                    }`}
                    style={{
                      "--item-color":
                        fence.color,
                    }}
                  >

                    {/* Information */}

                    <button
                      type="button"
                      className="virtual-fence-list-info"
                      onClick={() =>
                        setSelectedFence(
                          fence
                        )
                      }
                    >

                      <span className="virtual-fence-list-name">
                        {fence.name}
                      </span>

                      <span className="virtual-fence-list-sector">
                        {fence.sector}
                      </span>

                      <span
                        className={`virtual-fence-list-status ${statusClass}`}
                      >
                        <span
                          className="virtual-fence-toggle-dot"
                          style={{
                            background:
                              statusColor(
                                fence.status
                              ),
                          }}
                        />

                        {fence.status}
                      </span>

                    </button>

                    {/* Actions */}

                    <div className="virtual-fence-list-actions">

                      <button
                        type="button"
                        className="virtual-fence-list-action"
                        title="View fence"
                        onClick={() =>
                          setSelectedFence(
                            fence
                          )
                        }
                      >
                        <Eye size={13} />
                      </button>

                      <button
                        type="button"
                        className="virtual-fence-list-action"
                        title="Edit fence"
                        onClick={() => {
                          setFenceName(
                            fence.name
                          );

                          setFenceType(
                            fence.type
                          );

                          setFenceStatus(
                            fence.status
                          );
                        }}
                      >
                        <Pencil size={13} />
                      </button>

                      <button
                        type="button"
                        className="virtual-fence-list-action delete"
                        title="Delete fence"
                        onClick={() =>
                          deleteFence(
                            fence.id
                          )
                        }
                      >
                        <Trash2 size={13} />
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

          </section>

          {/* =================================================
              GEOFENCE SETTINGS
          ================================================= */}

          <section className="virtual-fence-panel">

            <div className="virtual-fence-panel-heading">

              <Settings
                className="virtual-fence-panel-heading-icon"
                size={18}
              />

              <h2 className="virtual-fence-panel-heading-title">
                Geofence Settings
              </h2>

            </div>

            <Setting
              label="Intrusion Detection"
              enabled={settings.intrusion}
              onClick={() =>
                toggleSetting(
                  "intrusion"
                )
              }
            />

            <Setting
              label="Real-time Alerts"
              enabled={settings.realtime}
              onClick={() =>
                toggleSetting(
                  "realtime"
                )
              }
            />

            <Setting
              label="Email Notifications"
              enabled={settings.email}
              onClick={() =>
                toggleSetting(
                  "email"
                )
              }
            />

            <Setting
              label="SMS Alerts"
              enabled={settings.sms}
              onClick={() =>
                toggleSetting("sms")
              }
            />

            {/* Sensitivity */}

            <div className="virtual-fence-sensitivity">

              <div className="virtual-fence-sensitivity-header">

                <span>
                  Alert Sensitivity
                </span>

                <strong className="virtual-fence-sensitivity-value">
                  {sensitivity >= 70
                    ? "High"
                    : sensitivity >= 40
                      ? "Medium"
                      : "Low"}
                </strong>

              </div>

              <input
                className="virtual-fence-range"
                type="range"
                min="0"
                max="100"
                value={sensitivity}
                onChange={(event) =>
                  setSensitivity(
                    Number(
                      event.target.value
                    )
                  )
                }
              />

            </div>

          </section>

        </aside>

      </div>

      {/* =====================================================
          RECENT EVENTS
      ===================================================== */}

      <section className="virtual-fence-events">

        <div className="virtual-fence-events-header">

          <Clock3
            className="virtual-fence-events-icon"
            size={18}
          />

          <div>
            <h2 className="virtual-fence-events-title">
              Recent Fence Events
            </h2>

            <p className="virtual-fence-events-subtitle">
              Latest activity detected across configured geofences
            </p>
          </div>

        </div>

        <div className="virtual-fence-table-wrapper">

          <table className="virtual-fence-table">

            <thead>
              <tr>
                <th>Time</th>
                <th>Event Type</th>
                <th>Fence</th>
                <th>Location</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {events.map((event, index) => {

                const eventClass =
                  event.status === "High"
                    ? "red"
                    : event.status === "Medium"
                      ? "yellow"
                      : "green";

                const statusClass =
                  event.status === "High"
                    ? "high"
                    : event.status === "Medium"
                      ? "medium"
                      : "info";

                return (
                  <tr key={index}>

                    <td>
                      {event.time}
                    </td>

                    <td>

                      <div className="virtual-fence-event-type">

                        <span
                          className={`virtual-fence-event-dot ${eventClass}`}
                        />

                        <span>
                          {event.type}
                        </span>

                      </div>

                    </td>

                    <td>
                      {event.fence}
                    </td>

                    <td>
                      {event.location}
                    </td>

                    <td>
                      {event.details}
                    </td>

                    <td>

                      <span
                        className={`virtual-fence-event-status ${statusClass}`}
                      >
                        {event.status}
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </section>
      </div>
      </div>

    </main>
    </div>
  );
};

/* =========================================================
   SETTINGS COMPONENT
========================================================= */

const Setting = ({
  label,
  enabled,
  onClick,
}) => {
  return (
    <div className="virtual-fence-setting">

      <span className="virtual-fence-setting-label">
        {label}
      </span>

      <button
        type="button"
        className={`virtual-fence-toggle ${
          enabled ? "active" : ""
        }`}
        onClick={onClick}
        aria-label={`Toggle ${label}`}
        aria-pressed={enabled}
      >
        <span className="virtual-fence-toggle-circle" />
      </button>

    </div>
  );
};

export default VirtualFence;