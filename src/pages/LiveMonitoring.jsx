
import {
  FiVideo,
 
  FiAlertTriangle,
  FiUsers,
  FiHardDrive,
  FiMapPin,
  FiActivity,
  FiRadio,
  FiEye,
  FiMaximize2,
  FiCrosshair,
  FiThermometer,
} from "react-icons/fi";

import { FaShieldAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { useEffect, useMemo, useState } from "react";

import { getCameras } from "../services/guardianApi";
import { unwrapList } from "../services/apiClient";
import { normalizeCamera } from "../services/dataMappers";

import "../styles/LiveMonitoring.css";

/* =========================================================
   CAMERA IMAGES
========================================================= */

import cam1 from "../assets/images/cam1.jpg";
import cam2 from "../assets/images/cam2.jpg";
import cam3 from "../assets/images/cam3.jpg";
import cam4 from "../assets/images/cam4.jpg";
import cam5 from "../assets/images/cam5.jpg";
import cam6 from "../assets/images/cam6.jpg";

/* =========================================================
   FALLBACK BORDER SURVEILLANCE CAMERAS
========================================================= */

const fallbackCameraFeeds = [
  {
    id: "CAM-001",
    title: "North Gate",
    sector: "Sector A-01",
    type: "PTZ",
    image: cam1,
    live: true,
    aiMonitoring: true,
    detections: 2,
  },

  {
    id: "CAM-002",
    title: "Watchtower 01",
    sector: "Sector A-02",
    type: "Fixed",
    image: cam2,
    live: true,
    aiMonitoring: true,
    detections: 0,
  },

  {
    id: "CAM-003",
    title: "Perimeter West",
    sector: "Sector B-01",
    type: "Thermal",
    image: cam3,
    live: true,
    aiMonitoring: true,
    detections: 1,
  },

  {
    id: "CAM-004",
    title: "Vehicle Checkpoint",
    sector: "Sector B-03",
    type: "PTZ",
    image: cam4,
    live: true,
    aiMonitoring: true,
    detections: 3,
  },

  {
    id: "CAM-005",
    title: "Perimeter East",
    sector: "Sector C-02",
    type: "Fixed",
    image: cam5,
    live: true,
    aiMonitoring: true,
    detections: 0,
  },

  {
    id: "CAM-006",
    title: "Watchtower 03",
    sector: "Sector C-04",
    type: "Thermal",
    image: cam6,
    live: false,
    aiMonitoring: false,
    detections: 0,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const LiveMonitoring = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [cameraFeeds, setCameraFeeds] = useState(
    fallbackCameraFeeds
  );

  const [selectedSector, setSelectedSector] =
    useState("All Sectors");

  const [selectedType, setSelectedType] =
    useState("All Types");

  const [viewMode, setViewMode] = useState("grid");

  /* =========================================================
     LOAD CAMERAS
  ========================================================= */

  useEffect(() => {
    let active = true;

    async function loadCameras() {
      try {
        const response = await getCameras();

        const cameras = unwrapList(
          response,
          "cameras"
        ).map(normalizeCamera);

        if (active && cameras.length) {
          setCameraFeeds(
            cameras.map((camera) => ({
              id: camera.id,
              title: camera.name,
              sector:
                camera.location ||
                "Unknown Sector",
              type:
                camera.type ||
                "Fixed",
              image:
                camera.image ||
                cam1,
              live:
                camera.status ===
                "Online",
              aiMonitoring:
                camera.aiMonitoring !==
                false,
              detections:
                camera.detections ||
                0,
            }))
          );
        }
      } catch {
        if (active) {
          setCameraFeeds(
            fallbackCameraFeeds
          );
        }
      }
    }

    loadCameras();

    return () => {
      active = false;
    };
  }, []);

  /* =========================================================
     COUNTS
  ========================================================= */

  const activeFeeds = cameraFeeds.filter(
    (camera) => camera.live
  ).length;

  const aiActiveFeeds = cameraFeeds.filter(
    (camera) =>
      camera.aiMonitoring !== false
  ).length;

  const totalDetections = cameraFeeds.reduce(
    (total, camera) =>
      total + Number(camera.detections || 0),
    0
  );

  const sectors = [
    "All Sectors",
    ...new Set(
      cameraFeeds
        .map((camera) => camera.sector)
        .filter(Boolean)
    ),
  ];

  const cameraTypes = [
    "All Types",
    ...new Set(
      cameraFeeds
        .map((camera) => camera.type)
        .filter(Boolean)
    ),
  ];

  /* =========================================================
     FILTER CAMERAS
  ========================================================= */

  const filteredCameras = useMemo(() => {
    return cameraFeeds.filter((camera) => {
      const sectorMatch =
        selectedSector === "All Sectors" ||
        camera.sector === selectedSector;

      const typeMatch =
        selectedType === "All Types" ||
        camera.type === selectedType;

      return sectorMatch && typeMatch;
    });
  }, [
    cameraFeeds,
    selectedSector,
    selectedType,
  ]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stats = [
    {
      icon: <FiVideo />,
      title: "Total Cameras",
      value: String(
        cameraFeeds.length
      ),
      status: "Border Network",
      className: "green",
      action: () =>
        navigate(
          "/camera-management"
        ),
    },

    {
      icon: <FiRadio />,
      title: "Live Feeds",
      value: String(
        activeFeeds
      ),
      status: `${activeFeeds}/${cameraFeeds.length} Online`,
      className: "green",
    },

    {
      icon: <FiCrosshair />,
      title: "AI Monitoring",
      value: String(
        aiActiveFeeds
      ),
      status: "AI Detection Active",
      className: "gold",
      action: () =>
        navigate("/analytics"),
    },

    {
      icon: <FiAlertTriangle />,
      title: "Active Alerts",
      value: String(
        totalDetections
      ),
      status: "Requires Attention",
      className: "red",
      action: () =>
        navigate(
          "/alert-details"
        ),
    },

    {
      icon: <FiHardDrive />,
      title: "Storage",
      value: "68%",
      status: "Recording",
      className: "green",
      action: () =>
        navigate("/analytics"),
    },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="dashboard">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={
          setSidebarOpen
        }
      />

      <main className="main-content">

        <Navbar
          setSidebarOpen={
            setSidebarOpen
          }
        />

        <div className="live-page">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="live-header">

            <div className="live-title">

              <div className="live-icon">
                <FiVideo />
              </div>

              <div>
                <h1>
                  Live Monitoring
                </h1>

                <p>
                  Real-time AI-powered
                  border surveillance
                </p>
              </div>

            </div>

            {/* SYSTEM STATUS */}

            <div className="system-active">

              <div className="status-left">

                <span className="status-dot"></span>

                <div>
                  <h4>
                    Surveillance Active
                  </h4>

                  <p>
                    {activeFeeds} live feeds
                    monitoring border
                  </p>
                </div>

              </div>

              <FaShieldAlt className="status-icon" />

            </div>

          </div>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="stats-container">

            {stats.map(
              (item, index) => (
                <div
                  key={index}
                  className="stat-card"
                  style={{
                    cursor:
                      item.action
                        ? "pointer"
                        : "default",
                  }}
                  onClick={
                    item.action
                  }
                >

                  <div
                    className={`stat-icon ${item.className}`}
                  >
                    {item.icon}
                  </div>

                  <div className="stat-info">

                    <span>
                      {item.title}
                    </span>

                    <h2>
                      {item.value}
                    </h2>

                    <p>
                      {item.status}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="live-main">

            {/* =================================================
                CAMERA SECTION
            ================================================= */}

            <div className="camera-section">

              <div className="section-header">

                <div>
                  <h2>
                    Border Camera Feeds
                  </h2>

                  <p className="section-subtitle">
                    Live surveillance across
                    monitored sectors
                  </p>
                </div>

                <div className="camera-controls">

                  {/* GRID */}
                  <button
                    className={
                      viewMode === "grid"
                        ? "view-btn active"
                        : "view-btn"
                    }
                    onClick={() =>
                      setViewMode(
                        "grid"
                      )
                    }
                    title="Grid View"
                  >
                    ▦
                  </button>

                  {/* LIST */}
                  <button
                    className={
                      viewMode === "list"
                        ? "view-btn active"
                        : "view-btn"
                    }
                    onClick={() =>
                      setViewMode(
                        "list"
                      )
                    }
                    title="List View"
                  >
                    ☰
                  </button>

                  {/* SECTOR FILTER */}
                  <select
                    className="camera-filter"
                    value={
                      selectedSector
                    }
                    onChange={(event) =>
                      setSelectedSector(
                        event.target.value
                      )
                    }
                  >
                    {sectors.map(
                      (sector) => (
                        <option
                          key={sector}
                          value={sector}
                        >
                          {sector}
                        </option>
                      )
                    )}
                  </select>

                  {/* TYPE FILTER */}
                  <select
                    className="camera-filter"
                    value={
                      selectedType
                    }
                    onChange={(event) =>
                      setSelectedType(
                        event.target.value
                      )
                    }
                  >
                    {cameraTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </div>

              {/* =================================================
                  CAMERA GRID
              ================================================= */}

              <div
                className={
                  viewMode === "grid"
                    ? "camera-grid"
                    : "camera-grid list-view"
                }
              >

                {filteredCameras.map(
                  (camera) => (

                    <div
                      key={camera.id}
                      className="camera-card"
                    >

                      {/* CAMERA IMAGE */}

                      <div className="camera-image">

                        <img
                          src={
                            camera.image
                          }
                          alt={
                            camera.title
                          }
                        />

                        {/* LIVE / OFFLINE */}

                        <div className="live-badge">

                          <span
                            className={
                              camera.live
                                ? "live-dot"
                                : "live-dot offline"
                            }
                          ></span>

                          {camera.live
                            ? "LIVE"
                            : "OFFLINE"}

                        </div>

                        {/* AI BADGE */}

                        {camera.aiMonitoring &&
                          camera.live && (
                            <div className="ai-badge">

                              <FiCrosshair />

                              AI ACTIVE

                            </div>
                          )}

                        {/* CAMERA TYPE */}

                        <div className="camera-type-badge">

                          {camera.type ===
                            "Thermal" && (
                            <FiThermometer />
                          )}

                          {camera.type ===
                            "PTZ" && (
                            <FiEye />
                          )}

                          {camera.type ===
                            "Fixed" && (
                            <FiVideo />
                          )}

                          {camera.type}

                        </div>

                      </div>

                      {/* CAMERA FOOTER */}

                      <div className="camera-footer">

                        <div className="camera-location">

                          <FaShieldAlt />

                          <div>

                            <strong>
                              {camera.title}
                            </strong>

                            <span>
                              <FiMapPin />
                              {camera.sector}
                            </span>

                          </div>

                        </div>

                        <button
                          className="expand-btn"
                          title="Open Live Feed"
                          onClick={() =>
                            navigate(
                              "/alert-details"
                            )
                          }
                        >
                          <FiMaximize2 />
                        </button>

                      </div>

                      {/* AI DETECTION FOOTER */}

                      <div className="camera-ai-footer">

                        <span>
                          <FiActivity />

                          AI Detection
                        </span>

                        <strong>
                          {camera.detections ||
                            0}{" "}
                          detected
                        </strong>

                      </div>

                    </div>

                  )
                )}

                {filteredCameras.length ===
                  0 && (
                  <div className="no-cameras">

                    <FiVideo />

                    <h3>
                      No cameras found
                    </h3>

                    <p>
                      Try selecting another
                      sector or camera type.
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <div className="right-sidebar">

              {/* =================================================
                  AI DETECTION SUMMARY
              ================================================= */}

              <div className="sidebar-card">

                <div className="sidebar-header">

                  <div>
                    <h2>
                      AI Detection
                    </h2>

                    <span>
                      Real-time analysis
                    </span>
                  </div>

                  <FiCrosshair />

                </div>

                <div className="detection-summary">

                  <div className="detection-number">
                    <strong>
                      {totalDetections}
                    </strong>

                    <span>
                      Active detections
                    </span>
                  </div>

                  <div className="detection-status">

                    <span className="status-dot"></span>

                    AI engine operational

                  </div>

                </div>

              </div>

              {/* =================================================
                  RECENT ALERTS
              ================================================= */}

              <div className="sidebar-card">

                <div className="sidebar-header">

                  <h2>
                    Recent Alerts
                  </h2>

                  <button
                    onClick={() =>
                      navigate(
                        "/alert-details"
                      )
                    }
                  >
                    View All
                  </button>

                </div>

                <div className="alert-list">

                  {/* Alert 1 */}
                  <div className="alert-item">

                    <div className="alert-icon danger">
                      <FiAlertTriangle />
                    </div>

                    <div className="alert-info">

                      <h4>
                        Perimeter Intrusion
                      </h4>

                      <p>
                        Sector A-01
                      </p>

                    </div>

                    <div className="alert-meta">

                      <small>
                        2m ago
                      </small>

                      <span className="alert-badge high">
                        High
                      </span>

                    </div>

                  </div>

                  {/* Alert 2 */}
                  <div className="alert-item">

                    <div className="alert-icon warning">
                      <FiUsers />
                    </div>

                    <div className="alert-info">

                      <h4>
                        Suspicious Movement
                      </h4>

                      <p>
                        Sector B-01
                      </p>

                    </div>

                    <div className="alert-meta">

                      <small>
                        5m ago
                      </small>

                      <span className="alert-badge medium">
                        Medium
                      </span>

                    </div>

                  </div>

                  {/* Alert 3 */}
                  <div className="alert-item">

                    <div className="alert-icon yellow">
                      <FiActivity />
                    </div>

                    <div className="alert-info">

                      <h4>
                        Motion Detected
                      </h4>

                      <p>
                        Sector C-02
                      </p>

                    </div>

                    <div className="alert-meta">

                      <small>
                        8m ago
                      </small>

                      <span className="alert-badge medium">
                        Medium
                      </span>

                    </div>

                  </div>

                  {/* Alert 4 */}
                  <div className="alert-item">

                    <div className="alert-icon success">
                      <FiRadio />
                    </div>

                    <div className="alert-info">

                      <h4>
                        Vehicle Detected
                      </h4>

                      <p>
                        Sector B-03
                      </p>

                    </div>

                    <div className="alert-meta">

                      <small>
                        12m ago
                      </small>

                      <span className="alert-badge low">
                        Low
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SURVEILLANCE STATUS
              ================================================= */}

              <div className="sidebar-card">

                <div className="sidebar-header">

                  <h2>
                    Surveillance Status
                  </h2>

                  <button
                    onClick={() =>
                      navigate(
                        "/analytics"
                      )
                    }
                  >
                    Analytics
                  </button>

                </div>

                <div className="status-list">

                  <div className="status-item">

                    <span>
                      <FiVideo />
                      Camera Network
                    </span>

                    <strong className="online">
                      ● Online
                    </strong>

                  </div>

                  <div className="status-item">

                    <span>
                      <FiCrosshair />
                      AI Detection
                    </span>

                    <strong className="online">
                      ● Active
                    </strong>

                  </div>

                  <div className="status-item">

                    <span>
                      <FiRadio />
                      Network
                    </span>

                    <strong className="online">
                      ● Stable
                    </strong>

                  </div>

                  <div className="status-item">

                    <span>
                      <FiHardDrive />
                      Video Recording
                    </span>

                    <strong className="recording">
                      Recording
                    </strong>

                  </div>

                  <div className="status-item">

                    <span>
                      <FaShieldAlt />
                      Border Coverage
                    </span>

                    <strong className="storage">
                      {cameraFeeds.length
                        ? Math.round(
                            (activeFeeds /
                              cameraFeeds.length) *
                              100
                          )
                        : 0}
                      %
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              BOTTOM SYSTEM BANNER
          ================================================= */}

          <div className="live-banner">

            <div className="banner-left">

              <div className="banner-icon">
                <FaShieldAlt />
              </div>

              <div>

                <h3>
                  Border surveillance system
                  operational
                </h3>

                <p>
                  {activeFeeds} cameras online
                  • {aiActiveFeeds} AI systems
                  active • Monitoring
                  continuously
                </p>

              </div>

            </div>

            <div className="banner-right">

              <span className="status-dot"></span>

              <span>
                System Healthy
              </span>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default LiveMonitoring;

