import { useState } from "react";
import {
  Shield,
  MapPin,
  Camera,
  AlertTriangle,
  Navigation,
  Crosshair,
  Radio,
  ZoomIn,
  ZoomOut,
  Signal,
  Clock3,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "./BorderMap.css";

const BorderMap = () => {
  const [zoom, setZoom] = useState(1);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selected, setSelected] = useState({
    type: "camera",
    id: "CAM-03",
    name: "East Perimeter Camera",
    status: "Warning",
    sector: "Sector C",
    coordinates: "78%, 29%",
  });

  /* =========================================
     CAMERAS
  ========================================== */

  const cameras = [
    {
      id: "CAM-01",
      name: "North Gate Camera",
      status: "Online",
      sector: "Sector A",
      x: 20,
      y: 25,
    },
    {
      id: "CAM-02",
      name: "Sector 4 Camera",
      status: "Online",
      sector: "Sector B",
      x: 48,
      y: 25,
    },
    {
      id: "CAM-03",
      name: "East Perimeter Camera",
      status: "Warning",
      sector: "Sector C",
      x: 78,
      y: 29,
    },
    {
      id: "CAM-04",
      name: "South Checkpoint Camera",
      status: "Online",
      sector: "Sector D",
      x: 29,
      y: 76,
    },
    {
      id: "CAM-05",
      name: "Remote Sector Camera",
      status: "Offline",
      sector: "Sector E",
      x: 83,
      y: 78,
    },
  ];

  /* =========================================
     PATROL UNITS
  ========================================== */

  const patrols = [
    {
      id: "PAT-01",
      name: "Patrol Unit Alpha",
      status: "Active",
      sector: "Border Sector",
      x: 38,
      y: 48,
    },
    {
      id: "PAT-02",
      name: "Patrol Unit Bravo",
      status: "Active",
      sector: "Sector E",
      x: 67,
      y: 74,
    },
    {
      id: "PAT-03",
      name: "Patrol Unit Charlie",
      status: "Active",
      sector: "Sector C",
      x: 91,
      y: 39,
    },
  ];

  /* =========================================
     ACTIVE ALERTS
  ========================================== */

  const alerts = [
    {
      id: "ALT-104",
      name: "Intrusion Detected",
      severity: "HIGH",
      sector: "Sector C",
      time: "2 min ago",
      x: 60,
      y: 43,
    },
    {
      id: "ALT-105",
      name: "Suspicious Movement",
      severity: "MEDIUM",
      sector: "Sector C",
      time: "8 min ago",
      x: 87,
      y: 51,
    },
  ];

  /* =========================================
     BORDER SECTORS
  ========================================== */

  const sectors = [
    {
      id: "A",
      name: "Sector A",
      status: "Secure",
      x: 8,
      y: 10,
      width: 27,
      height: 30,
      color: "green",
    },
    {
      id: "B",
      name: "Sector B",
      status: "Secure",
      x: 37,
      y: 8,
      width: 28,
      height: 32,
      color: "green",
    },
    {
      id: "C",
      name: "Sector C",
      status: "Alert",
      x: 66,
      y: 10,
      width: 29,
      height: 32,
      color: "yellow",
    },
    {
      id: "D",
      name: "Sector D",
      status: "Secure",
      x: 11,
      y: 55,
      width: 30,
      height: 34,
      color: "green",
    },
    {
      id: "E",
      name: "Sector E",
      status: "Secure",
      x: 44,
      y: 57,
      width: 31,
      height: 34,
      color: "green",
    },
  ];

  /* =========================================
     SELECTION HANDLERS
  ========================================== */

  const selectCamera = (camera) => {
    setSelected({
      type: "camera",
      id: camera.id,
      name: camera.name,
      status: camera.status,
      sector: camera.sector,
      coordinates: `${camera.x}%, ${camera.y}%`,
    });
  };

  const selectPatrol = (patrol) => {
    setSelected({
      type: "patrol",
      id: patrol.id,
      name: patrol.name,
      status: patrol.status,
      sector: patrol.sector,
      coordinates: `${patrol.x}%, ${patrol.y}%`,
    });
  };

  const selectAlert = (alert) => {
    setSelected({
      type: "alert",
      id: alert.id,
      name: alert.name,
      status: alert.severity,
      sector: alert.sector,
      coordinates: `${alert.x}%, ${alert.y}%`,
    });
  };

  /* =========================================
     SELECTED ITEM ICON
  ========================================== */

  const getSelectedIcon = () => {
    if (selected.type === "camera") {
      return <Camera size={20} />;
    }

    if (selected.type === "patrol") {
      return <Shield size={20} />;
    }

    return <AlertTriangle size={20} />;
  };

  /* =========================================
     ZOOM CONTROLS
  ========================================== */

  const zoomIn = () => {
    setZoom((value) => Math.min(value + 0.1, 1.5));
  };

  const zoomOut = () => {
    setZoom((value) => Math.max(value - 0.1, 0.8));
  };

  const resetZoom = () => {
    setZoom(1);
  };

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


      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <header className="border-map-header">

        <div className="border-map-title-area">

          <div className="border-map-title-icon">
            <Shield size={30} strokeWidth={2} />
          </div>

          <div className="border-map-heading-content">
            <h1 className="border-map-title">
              Border Surveillance Map
            </h1>

            <p className="border-map-subtitle">
              Real-time border monitoring and surveillance overview
            </p>
          </div>

        </div>

        <div className="border-map-live">
          <span className="border-map-live-dot" />
          <span>Live Surveillance</span>
        </div>

      </header>

      {/* =====================================
          MAP + INFORMATION PANEL
      ====================================== */}

      <div className="border-map-content">

        {/* ===================================
            MAP AREA
        ==================================== */}

        <section
          className="border-map-canvas"
          aria-label="Border surveillance map"
        >

          {/* Satellite map */}

          <div
            className="border-map-image"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(4, 20, 14, 0.34),
                  rgba(3, 13, 10, 0.48)
                ),
                url("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/5/12/17")
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${zoom})`,
              transformOrigin: "center",
              transition: "transform 0.25s ease",
            }}
          />

          {/* =================================
              REGION LABEL
          ================================== */}

          <div className="border-map-region-label">
            BORDER REGION • SECTOR 01
          </div>

          {/* =================================
              BORDER SECTORS
          ================================== */}

          {sectors.map((sector) => (
            <div
              key={sector.id}
              className={`border-map-sector ${
                sector.color === "yellow" ? "alert" : ""
              }`}
              style={{
                left: `${sector.x}%`,
                top: `${sector.y}%`,
                width: `${sector.width}%`,
                height: `${sector.height}%`,
              }}
            >
              <span className="border-map-sector-title">
                {sector.name}
              </span>

              <span className="border-map-sector-status">
                {sector.status}
              </span>
            </div>
          ))}

          {/* =================================
              INTERNATIONAL BORDER
          ================================== */}

          <div
            className="border-map-border-line"
            style={{ top: "49%" }}
          />

          <div
            className="border-map-border-label"
            style={{
              left: "3%",
              top: "46%",
            }}
          >
            INTERNATIONAL
            <br />
            BORDER
          </div>

          {/* =================================
              CAMERA MARKERS
          ================================== */}

          {cameras.map((camera) => (
            <button
              key={camera.id}
              type="button"
              className={`border-map-marker camera ${
                selected.id === camera.id ? "selected" : ""
              }`}
              style={{
                left: `${camera.x}%`,
                top: `${camera.y}%`,
              }}
              onClick={() => selectCamera(camera)}
              title={camera.name}
              aria-label={`Select ${camera.name}`}
            >
              <span className="border-map-marker-icon">
                <Camera size={14} />
              </span>

              <span className="border-map-marker-label">
                {camera.id}
              </span>
            </button>
          ))}

          {/* =================================
              PATROL MARKERS
          ================================== */}

          {patrols.map((patrol) => (
            <button
              key={patrol.id}
              type="button"
              className={`border-map-marker patrol ${
                selected.id === patrol.id ? "selected" : ""
              }`}
              style={{
                left: `${patrol.x}%`,
                top: `${patrol.y}%`,
              }}
              onClick={() => selectPatrol(patrol)}
              title={patrol.name}
              aria-label={`Select ${patrol.name}`}
            >
              <span className="border-map-marker-icon">
                <Shield size={13} />
              </span>

              <span className="border-map-marker-label">
                {patrol.id}
              </span>
            </button>
          ))}

          {/* =================================
              ALERT MARKERS
          ================================== */}

          {alerts.map((alert) => (
            <button
              key={alert.id}
              type="button"
              className={`border-map-marker alert ${
                selected.id === alert.id ? "selected" : ""
              }`}
              style={{
                left: `${alert.x}%`,
                top: `${alert.y}%`,
              }}
              onClick={() => selectAlert(alert)}
              title={alert.name}
              aria-label={`Select ${alert.name}`}
            >
              <span className="border-map-marker-icon">
                <AlertTriangle size={15} />
              </span>

              <span className="border-map-marker-label">
                {alert.id}
              </span>
            </button>
          ))}

          {/* =================================
              MAP CONTROLS
          ================================== */}

          <div className="border-map-controls">

            <button
              type="button"
              className="border-map-control"
              onClick={zoomIn}
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn size={17} />
            </button>

            <button
              type="button"
              className="border-map-control"
              onClick={zoomOut}
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut size={17} />
            </button>

            <button
              type="button"
              className="border-map-control"
              onClick={resetZoom}
              title="Reset map"
              aria-label="Reset map"
            >
              <Crosshair size={17} />
            </button>

          </div>

          {/* =================================
              MAP LEGEND
          ================================== */}

          <div className="border-map-legend">

            <h3 className="border-map-legend-title">
              Map Legend
            </h3>

            <div className="border-map-legend-item">
              <span className="border-map-legend-icon camera">
                <Camera size={11} />
              </span>
              <span>Camera</span>
            </div>

            <div className="border-map-legend-item">
              <span className="border-map-legend-icon alert">
                <AlertTriangle size={11} />
              </span>
              <span>Active Alert</span>
            </div>

            <div className="border-map-legend-item">
              <span className="border-map-legend-icon patrol">
                <Shield size={11} />
              </span>
              <span>Patrol Point</span>
            </div>

            <div className="border-map-legend-item">
              <span className="border-map-legend-icon border">
                ━
              </span>
              <span>Border Line</span>
            </div>

          </div>

          {/* =================================
              MAP STATUS BAR
          ================================== */}

          <div className="border-map-status-bar">

            <div className="border-map-status-item">
              <MapPin size={14} />
              <span>
                Coordinates: 26.8467° N, 80.9462° E
              </span>
            </div>

            <div className="border-map-status-item">
              <Signal size={14} />
              <span>
                Coverage: 94.7%
              </span>
            </div>

            <div className="border-map-status-item">
              <Clock3 size={14} />
              <span>
                Last Sync: 14:38:21
              </span>
            </div>

          </div>

        </section>

        {/* =====================================
            RIGHT INFORMATION SIDEBAR
        ====================================== */}

        <aside className="border-map-sidebar">

          {/* =================================
              LOCATION STATUS
          ================================== */}

          <section className="border-map-card">

            <div className="border-map-card-header">

              <MapPin
                className="border-map-card-icon"
                size={18}
              />

              <h2 className="border-map-card-title">
                Location Status
              </h2>

            </div>

            <div className="border-map-camera-status">

              <div className="border-map-camera-icon">
                {getSelectedIcon()}
              </div>

              <div className="border-map-camera-details">

                <p className="border-map-camera-name">
                  {selected.name}
                </p>

                <span className="border-map-camera-id">
                  ID: {selected.id}
                </span>

                <span className="border-map-warning">
                  <span className="border-map-warning-dot" />
                  {selected.status}
                </span>

              </div>

            </div>

            <div className="border-map-data-row">
              <span>Type</span>

              <strong className="border-map-data-value">
                {selected.type === "camera"
                  ? "Surveillance Camera"
                  : selected.type === "patrol"
                  ? "Patrol Unit"
                  : "Security Alert"}
              </strong>
            </div>

            <div className="border-map-data-row">
              <span>Sector</span>

              <strong className="border-map-data-value">
                {selected.sector}
              </strong>
            </div>

            <div className="border-map-data-row">
              <span>Coordinates</span>

              <strong className="border-map-data-value">
                {selected.coordinates}
              </strong>
            </div>

          </section>

          {/* =================================
              SURVEILLANCE STATUS
          ================================== */}

          <section className="border-map-card">

            <div className="border-map-card-header">

              <Radio
                className="border-map-card-icon"
                size={18}
              />

              <h2 className="border-map-card-title">
                Surveillance
              </h2>

            </div>

            <div className="border-map-surveillance-row">
              <span>Cameras Online</span>
              <strong className="border-map-surveillance-value green">
                4 / 5
              </strong>
            </div>

            <div className="border-map-surveillance-row">
              <span>Active Alerts</span>
              <strong className="border-map-surveillance-value red">
                02
              </strong>
            </div>

            <div className="border-map-surveillance-row">
              <span>Patrol Units</span>
              <strong className="border-map-surveillance-value blue">
                03
              </strong>
            </div>

            <div className="border-map-surveillance-row">
              <span>Secure Zones</span>
              <strong className="border-map-surveillance-value green">
                04 / 05
              </strong>
            </div>

          </section>

          {/* =================================
              ACTIVE ALERTS
          ================================== */}

          <section className="border-map-card">

            <div className="border-map-card-header">

              <AlertTriangle
                className="border-map-card-icon alert-icon"
                size={18}
              />

              <h2 className="border-map-card-title">
                Active Alerts
              </h2>

              <span className="border-map-alert-count">
                {alerts.length}
              </span>

            </div>

            <div className="border-map-alert-list">

              {alerts.map((alert) => (
                <button
                  key={alert.id}
                  type="button"
                  className={`border-map-alert ${
                    alert.severity === "MEDIUM"
                      ? "medium"
                      : ""
                  }`}
                  onClick={() => selectAlert(alert)}
                >

                  <div className="border-map-alert-top">

                    <span className="border-map-alert-title">
                      {alert.name}
                    </span>

                    <span
                      className={`border-map-alert-badge ${
                        alert.severity === "MEDIUM"
                          ? "medium"
                          : ""
                      }`}
                    >
                      {alert.severity}
                    </span>

                  </div>

                  <span className="border-map-alert-meta">
                    {alert.id} • {alert.sector} • {alert.time}
                  </span>

                </button>
              ))}

            </div>

          </section>

          {/* =================================
              QUICK ACTIONS
          ================================== */}

          <section className="border-map-card">

            <div className="border-map-card-header">

              <Navigation
                className="border-map-card-icon"
                size={18}
              />

              <h2 className="border-map-card-title">
                Quick Actions
              </h2>

            </div>

            <button
              type="button"
              className="border-map-action"
              onClick={resetZoom}
            >
              <span className="border-map-action-icon">
                <Crosshair size={14} />
              </span>

              <span>Center on Border</span>
            </button>

            <button
              type="button"
              className="border-map-action"
            >
              <span className="border-map-action-icon">
                <Camera size={14} />
              </span>

              <span>View All Cameras</span>
            </button>

            <button
              type="button"
              className="border-map-action"
            >
              <span className="border-map-action-icon">
                <AlertTriangle size={14} />
              </span>

              <span>Open Alert Center</span>
            </button>

          </section>

        </aside>

      </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default BorderMap;