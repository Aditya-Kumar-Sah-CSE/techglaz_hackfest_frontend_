import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./CameraManagement.css";

import cam1 from "../assets/images/cam1.jpg";
import cam2 from "../assets/images/cam2.jpg";
import cam3 from "../assets/images/cam3.jpg";
import cam4 from "../assets/images/cam4.jpg";
import cam5 from "../assets/images/cam5.jpg";
import cam6 from "../assets/images/cam6.jpg";

import {
  Search,
  Plus,
  Download,
  Camera,
  Radio,
  VideoOff,

  ShieldCheck,
  Grid2X2,
  List,
  Eye,
  Settings,
  Trash2,
  Monitor,
  MapPin,
  Video,
  Clock3,
  HardDrive,
  Cpu,
  Globe,
  ScanLine,
  Crosshair,
} from "lucide-react";

import { createCamera, getCameras } from "../services/guardianApi";
import { unwrapList } from "../services/apiClient";
import { countByStatus, normalizeCamera } from "../services/dataMappers";

/* =========================================================
   BORDER SURVEILLANCE FALLBACK CAMERAS
========================================================= */

const fallbackCameras = [
  {
    id: "CAM-001",
    name: "North Gate",
    location: "Sector A-01",
    type: "PTZ",
    status: "Online",
    resolution: "1080p",
    lastActive: "2 sec ago",
    image: cam1,
    latitude: 26.8467,
    longitude: 80.9462,
    ipAddress: "192.168.1.101",
    aiMonitoring: true,
    manufacturer: "Hikvision",
    model: "PTZ-4MP",
    frameRate: "25 FPS",
    storage: "Local + Cloud",
  },
  {
    id: "CAM-002",
    name: "Watchtower 01",
    location: "Sector A-02",
    type: "Fixed",
    status: "Online",
    resolution: "1080p",
    lastActive: "5 sec ago",
    image: cam2,
    latitude: 26.8481,
    longitude: 80.9495,
    ipAddress: "192.168.1.102",
    aiMonitoring: true,
    manufacturer: "Hikvision",
    model: "Bullet-4MP",
    frameRate: "25 FPS",
    storage: "Local + Cloud",
  },
  {
    id: "CAM-003",
    name: "Perimeter West",
    location: "Sector B-01",
    type: "Thermal",
    status: "Online",
    resolution: "720p",
    lastActive: "3 sec ago",
    image: cam3,
    latitude: 26.8512,
    longitude: 80.9511,
    ipAddress: "192.168.1.103",
    aiMonitoring: true,
    manufacturer: "FLIR",
    model: "Thermal-X1",
    frameRate: "30 FPS",
    storage: "Local + Cloud",
  },
  {
    id: "CAM-004",
    name: "Vehicle Checkpoint",
    location: "Sector B-03",
    type: "PTZ",
    status: "Online",
    resolution: "1080p",
    lastActive: "6 sec ago",
    image: cam4,
    latitude: 26.8542,
    longitude: 80.9548,
    ipAddress: "192.168.1.104",
    aiMonitoring: true,
    manufacturer: "Hikvision",
    model: "PTZ-4MP",
    frameRate: "25 FPS",
    storage: "Local + Cloud",
  },
  {
    id: "CAM-005",
    name: "Perimeter East",
    location: "Sector C-02",
    type: "Fixed",
    status: "Online",
    resolution: "1080p",
    lastActive: "1 sec ago",
    image: cam5,
    latitude: 26.8571,
    longitude: 80.9584,
    ipAddress: "192.168.1.105",
    aiMonitoring: true,
    manufacturer: "Hikvision",
    model: "Bullet-4MP",
    frameRate: "25 FPS",
    storage: "Local + Cloud",
  },
  {
    id: "CAM-006",
    name: "Watchtower 03",
    location: "Sector C-04",
    type: "Thermal",
    status: "Offline",
    resolution: "1080p",
    lastActive: "2 min ago",
    image: cam6,
    latitude: 26.8598,
    longitude: 80.9612,
    ipAddress: "192.168.1.106",
    aiMonitoring: false,
    manufacturer: "FLIR",
    model: "Thermal-X1",
    frameRate: "30 FPS",
    storage: "Local + Cloud",
  },
  {
    id: "CAM-007",
    name: "River Crossing",
    location: "Sector D-01",
    type: "PTZ",
    status: "Online",
    resolution: "720p",
    lastActive: "4 sec ago",
    image: cam1,
    latitude: 26.8621,
    longitude: 80.9645,
    ipAddress: "192.168.1.107",
    aiMonitoring: true,
    manufacturer: "Hikvision",
    model: "PTZ-4MP",
    frameRate: "25 FPS",
    storage: "Local + Cloud",
  },
  {
    id: "CAM-008",
    name: "Observation Point",
    location: "Sector D-03",
    type: "Fixed",
    status: "Online",
    resolution: "1080p",
    lastActive: "7 sec ago",
    image: cam2,
    latitude: 26.8652,
    longitude: 80.9681,
    ipAddress: "192.168.1.108",
    aiMonitoring: true,
    manufacturer: "Hikvision",
    model: "Bullet-4MP",
    frameRate: "25 FPS",
    storage: "Local + Cloud",
  },
];

/* =========================================================
   CAMERA MANAGEMENT
========================================================= */

const CameraManagement = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [cameras, setCameras] = useState(fallbackCameras);
  const [selectedCamera, setSelectedCamera] = useState(fallbackCameras[0]);

  const [viewMode, setViewMode] = useState("grid");

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [apiMessage, setApiMessage] = useState("");

  const [showAddCameraModal, setShowAddCameraModal] = useState(false);
  const [isSubmittingCamera, setIsSubmittingCamera] = useState(false);

  const [cameraForm, setCameraForm] = useState({
    name: "",
    location: "",
    type: "Fixed",
    latitude: "",
    longitude: "",
    status: "Online",
    ipAddress: "",
    resolution: "1080p",
    aiMonitoring: true,
  });

  /* =========================================================
     LOAD CAMERAS
  ========================================================= */

  useEffect(() => {
    let active = true;

    async function loadCameras() {
      try {
        const response = await getCameras();

        const nextCameras = unwrapList(response, "cameras").map(
          normalizeCamera
        );

        if (active && nextCameras.length) {
          setCameras(nextCameras);
          setSelectedCamera(nextCameras[0]);
          setApiMessage("");
        }
      } catch (error) {
        if (active) {
          setApiMessage(
            error.message ||
              "Unable to load cameras. Showing local surveillance data."
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
     CAMERA STATISTICS
  ========================================================= */

  const onlineCount = countByStatus(cameras, "Online");
  const offlineCount = countByStatus(cameras, "Offline");

  const onlinePercent = cameras.length
    ? Math.round((onlineCount / cameras.length) * 100)
    : 0;

  const aiActiveCount = cameras.filter(
    (camera) => camera.aiMonitoring !== false
  ).length;

  const stats = [
    {
      title: "Total Cameras",
      value: String(cameras.length),
      subtitle: "Border Network",
      icon: <Camera size={28} />,
      color: "green",
    },
    {
      title: "Online",
      value: String(onlineCount),
      subtitle: `${onlinePercent}% Operational`,
      icon: <Radio size={28} />,
      color: "lime",
    },
    {
      title: "Offline",
      value: String(offlineCount),
      subtitle: "Requires Attention",
      icon: <VideoOff size={28} />,
      color: "red",
    },
    {
      title: "AI Active",
      value: String(aiActiveCount),
      subtitle: "AI Monitoring",
      icon: <ScanLine size={28} />,
      color: "gold",
    },
    {
      title: "Coverage",
      value: `${onlinePercent}%`,
      subtitle: "Border Coverage",
      icon: <ShieldCheck size={28} />,
      color: "yellow",
    },
  ];

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const locations = [
    ...new Set(cameras.map((camera) => camera.location).filter(Boolean)),
  ];

  const types = [
    ...new Set(cameras.map((camera) => camera.type).filter(Boolean)),
  ];

  const filteredCameras = useMemo(() => {
    return cameras.filter((camera) => {
      const query = searchQuery.toLowerCase().trim();

      const cameraName = String(camera.name || "").toLowerCase();
      const cameraId = String(camera.id || "").toLowerCase();
      const location = String(camera.location || "").toLowerCase();

      const matchesSearch =
        cameraName.includes(query) ||
        cameraId.includes(query) ||
        location.includes(query);

      const matchesLocation =
        locationFilter === "all" || camera.location === locationFilter;

      const matchesStatus =
        statusFilter === "all" || camera.status === statusFilter;

      const matchesType =
        typeFilter === "all" || camera.type === typeFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    cameras,
    locationFilter,
    searchQuery,
    statusFilter,
    typeFilter,
  ]);

  /* =========================================================
     FORM
  ========================================================= */

  const resetCameraForm = () => {
    setCameraForm({
      name: "",
      location: "",
      type: "Fixed",
      latitude: "",
      longitude: "",
      status: "Online",
      ipAddress: "",
      resolution: "1080p",
      aiMonitoring: true,
    });
  };

  const handleCameraInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setCameraForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================================================
     CREATE CAMERA
  ========================================================= */

  const handleCreateCamera = async (event) => {
    event.preventDefault();

    const name = cameraForm.name.trim();
    const location = cameraForm.location.trim();
    const ipAddress = cameraForm.ipAddress.trim();

    const latitude = Number(cameraForm.latitude);
    const longitude = Number(cameraForm.longitude);

    if (!name || !location || !ipAddress) {
      setApiMessage(
        "Please complete the camera name, border sector, and IP address."
      );
      return;
    }

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      setApiMessage("Latitude and longitude must be valid numbers.");
      return;
    }

    const ipPattern =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

    if (!ipPattern.test(ipAddress)) {
      setApiMessage("Please enter a valid IPv4 address.");
      return;
    }

    setIsSubmittingCamera(true);

    try {
      const response = await createCamera({
        name,
        location,
        type: cameraForm.type,
        latitude,
        longitude,
        status: cameraForm.status.toLowerCase(),
        ipAddress,
        resolution: cameraForm.resolution,
        aiMonitoring: cameraForm.aiMonitoring,
      });

      const camera = normalizeCamera(
        response?.camera ||
          response?.data ||
          response || {
            id: `CAM-${String(cameras.length + 1).padStart(3, "0")}`,
            name,
            location,
            type: cameraForm.type,
            latitude,
            longitude,
            status: cameraForm.status,
            ipAddress,
            resolution: cameraForm.resolution,
            aiMonitoring: cameraForm.aiMonitoring,
            lastActive: "Just now",
            image: cam1,
          }
      );

      setCameras((current) => [camera, ...current]);

      setSelectedCamera(camera);

      setApiMessage("Camera added to the border surveillance network.");

      setShowAddCameraModal(false);

      resetCameraForm();
    } catch (error) {
      setApiMessage(error.message || "Unable to add camera.");
    } finally {
      setIsSubmittingCamera(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="dashboard">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="camera-management">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="camera-header">
            <div className="camera-title">
              <div className="camera-icon">
                <Camera size={34} />
              </div>

              <div>
                <h1>Camera Management</h1>

                <p>
                  Manage and monitor border surveillance cameras
                </p>
              </div>
            </div>

            <div className="camera-actions">
              <button
                className="add-camera-btn"
                onClick={() => {
                  resetCameraForm();
                  setShowAddCameraModal(true);
                }}
              >
                <Plus size={18} />
                Add Camera
              </button>

              <button
                className="export-btn"
                onClick={() =>
                  alert("Camera surveillance report exported successfully.")
                }
              >
                <Download size={18} />
                Export Report
              </button>
            </div>
          </div>

          {apiMessage && (
            <p className="camera-api-message">{apiMessage}</p>
          )}

          {/* =================================================
              ADD CAMERA MODAL
          ================================================= */}

          {showAddCameraModal && (
            <div
              className="camera-modal-overlay"
              onClick={() => setShowAddCameraModal(false)}
            >
              <div
                className="camera-modal"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="camera-modal-header">
                  <div>
                    <p className="modal-label">
                      SURVEILLANCE NETWORK
                    </p>

                    <h3>Add Border Camera</h3>
                  </div>

                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={() => setShowAddCameraModal(false)}
                  >
                    ×
                  </button>
                </div>

                <form
                  className="camera-form"
                  onSubmit={handleCreateCamera}
                >
                  <div className="form-grid">

                    {/* Camera Name */}
                    <label>
                      <span>Camera Name</span>

                      <input
                        type="text"
                        name="name"
                        placeholder="North Gate"
                        value={cameraForm.name}
                        onChange={handleCameraInputChange}
                        required
                      />
                    </label>

                    {/* Border Sector */}
                    <label>
                      <span>Border Sector</span>

                      <input
                        type="text"
                        name="location"
                        placeholder="Sector A-01"
                        value={cameraForm.location}
                        onChange={handleCameraInputChange}
                        required
                      />
                    </label>

                    {/* Camera Type */}
                    <label>
                      <span>Camera Type</span>

                      <select
                        name="type"
                        value={cameraForm.type}
                        onChange={handleCameraInputChange}
                      >
                        <option value="Fixed">Fixed</option>
                        <option value="PTZ">PTZ</option>
                        <option value="Thermal">Thermal</option>
                      </select>
                    </label>

                    {/* Resolution */}
                    <label>
                      <span>Resolution</span>

                      <select
                        name="resolution"
                        value={cameraForm.resolution}
                        onChange={handleCameraInputChange}
                      >
                        <option value="720p">720p</option>
                        <option value="1080p">1080p</option>
                        <option value="4K">4K</option>
                      </select>
                    </label>

                    {/* Latitude */}
                    <label>
                      <span>Latitude</span>

                      <input
                        type="number"
                        name="latitude"
                        step="any"
                        placeholder="26.8467"
                        value={cameraForm.latitude}
                        onChange={handleCameraInputChange}
                        required
                      />
                    </label>

                    {/* Longitude */}
                    <label>
                      <span>Longitude</span>

                      <input
                        type="number"
                        name="longitude"
                        step="any"
                        placeholder="80.9462"
                        value={cameraForm.longitude}
                        onChange={handleCameraInputChange}
                        required
                      />
                    </label>

                    {/* IP */}
                    <label>
                      <span>IP Address</span>

                      <input
                        type="text"
                        name="ipAddress"
                        placeholder="192.168.1.101"
                        value={cameraForm.ipAddress}
                        onChange={handleCameraInputChange}
                        required
                      />
                    </label>

                    {/* Status */}
                    <label>
                      <span>Status</span>

                      <select
                        name="status"
                        value={cameraForm.status}
                        onChange={handleCameraInputChange}
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </select>
                    </label>

                  </div>

                  {/* AI Monitoring */}
                  <label className="ai-monitoring-option">
                    <input
                      type="checkbox"
                      name="aiMonitoring"
                      checked={cameraForm.aiMonitoring}
                      onChange={handleCameraInputChange}
                    />

                    <span>
                      <strong>Enable AI Monitoring</strong>
                      <small>
                        Enable intelligent detection for this camera
                      </small>
                    </span>
                  </label>

                  <div className="camera-modal-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() =>
                        setShowAddCameraModal(false)
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="save-camera-btn"
                      disabled={isSubmittingCamera}
                    >
                      {isSubmittingCamera
                        ? "Adding..."
                        : "Add Camera"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="camera-stats">
            {stats.map((item, index) => (
              <div
                className="camera-stat-card"
                key={index}
              >
                <div
                  className={`stat-icon ${item.color}`}
                >
                  {item.icon}
                </div>

                <div className="stat-info">
                  <span>{item.title}</span>

                  <h2>{item.value}</h2>

                  <small>{item.subtitle}</small>
                </div>
              </div>
            ))}
          </div>

          {/* =================================================
              SEARCH + FILTERS
          ================================================= */}

          <div className="camera-toolbar">
            <div className="toolbar-left">

              <div className="search-box">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search cameras or sectors..."
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                />
              </div>

              <select
                value={locationFilter}
                onChange={(event) =>
                  setLocationFilter(event.target.value)
                }
              >
                <option value="all">
                  All Border Sectors
                </option>

                {locations.map((location) => (
                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="all">All Status</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
              >
                <option value="all">
                  All Camera Types
                </option>

                {types.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="toolbar-right">
              <button
                className={
                  viewMode === "grid"
                    ? "active-view"
                    : ""
                }
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <Grid2X2 size={18} />
              </button>

              <button
                className={
                  viewMode === "list"
                    ? "active-view"
                    : ""
                }
                onClick={() => setViewMode("list")}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="camera-content">

            {/* =================================================
                CAMERA TABLE
            ================================================= */}

            <div className="camera-table-card">
              <table className="camera-table">

                <thead>
                  <tr>
                    <th></th>
                    <th>Camera</th>
                    <th>Border Sector</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>AI Detection</th>
                    <th>Resolution</th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCameras.map((camera) => {

                    const isOnline =
                      camera.status === "Online";

                    const aiActive =
                      camera.aiMonitoring !== false;

                    return (
                      <tr
                        key={camera.id}
                        onClick={() =>
                          setSelectedCamera(camera)
                        }
                        className={
                          selectedCamera?.id === camera.id
                            ? "selected-camera"
                            : ""
                        }
                      >

                        {/* Status Dot */}
                        <td>
                          <span
                            className={
                              isOnline
                                ? "status-dot online"
                                : "status-dot offline"
                            }
                          />
                        </td>

                        {/* Camera */}
                        <td>
                          <div className="camera-cell">

                            <img
                              src={camera.image || cam1}
                              alt={camera.id}
                            />

                            <div>
                              <h4>{camera.id}</h4>

                              <span>
                                {camera.name}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Sector */}
                        <td>
                          <div className="sector-cell">
                            <MapPin size={14} />
                            {camera.location}
                          </div>
                        </td>

                        {/* Type */}
                        <td>
                          <span className="camera-type">
                            {camera.type || "Fixed"}
                          </span>
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={
                              isOnline
                                ? "status online-status"
                                : "status offline-status"
                            }
                          >
                            {camera.status}
                          </span>
                        </td>

                        {/* AI */}
                        <td>
                          <span
                            className={
                              aiActive
                                ? "ai-status active"
                                : "ai-status inactive"
                            }
                          >
                            <ScanLine size={13} />

                            {aiActive
                              ? "Active"
                              : "Disabled"}
                          </span>
                        </td>

                        {/* Resolution */}
                        <td>
                          {camera.resolution || "1080p"}
                        </td>

                        {/* Last Active */}
                        <td
                          className={
                            isOnline
                              ? "active-time"
                              : "offline-time"
                          }
                        >
                          {camera.lastActive ||
                            "Unknown"}
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="table-actions">

                            <button
                              className="action-btn view-btn"
                              title="View Live Feed"
                              onClick={(event) => {
                                event.stopPropagation();

                                setSelectedCamera(camera);

                                navigate(
                                  "/live-monitoring"
                                );
                              }}
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              className="action-btn settings-btn"
                              title="Camera Settings"
                              onClick={(event) => {
                                event.stopPropagation();

                                alert(
                                  "Camera settings will be available soon."
                                );
                              }}
                            >
                              <Settings size={15} />
                            </button>

                            <button
                              className="action-btn delete-btn"
                              title="Delete Camera"
                              onClick={(event) => {
                                event.stopPropagation();

                                if (
                                  window.confirm(
                                    `Remove ${camera.id} from the surveillance network?`
                                  )
                                ) {
                                  alert(
                                    "Delete functionality coming soon."
                                  );
                                }
                              }}
                            >
                              <Trash2 size={15} />
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredCameras.length === 0 && (
                    <tr>
                      <td
                        colSpan="9"
                        className="empty-camera-state"
                      >
                        <Camera size={28} />

                        <strong>
                          No cameras found
                        </strong>

                        <span>
                          Try changing your search or filters.
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            {selectedCamera && (
              <div className="camera-sidebar">

                {/* =================================================
                    CAMERA PREVIEW
                ================================================= */}

                <div
                  className="preview-card"
                  onClick={() =>
                    navigate("/live-monitoring")
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="sidebar-header">
                    <div>
                      <h3>Live Camera Preview</h3>

                      <small>
                        {selectedCamera.location}
                      </small>
                    </div>

                    <button
                      className="fullscreen-btn"
                      onClick={(event) => {
                        event.stopPropagation();

                        navigate("/live-monitoring");
                      }}
                    >
                      ⛶
                    </button>
                  </div>

                  <div className="preview-image">
                    <img
                      src={
                        selectedCamera.image || cam1
                      }
                      alt={selectedCamera.id}
                    />

                    {/* Live overlay */}
                    <div className="preview-live-badge">
                      <span className="status-dot online" />
                      LIVE
                    </div>

                    {/* AI overlay */}
                    {selectedCamera.aiMonitoring !==
                      false && (
                      <div className="preview-ai-badge">
                        <ScanLine size={13} />
                        AI MONITORING
                      </div>
                    )}
                  </div>

                  <div className="preview-footer">

                    <div className="preview-info">
                      <span
                        className={
                          selectedCamera.status ===
                          "Online"
                            ? "status-dot online"
                            : "status-dot offline"
                        }
                      />

                      <span>
                        {selectedCamera.id} —{" "}
                        {selectedCamera.name}
                      </span>
                    </div>

                    <span
                      className={
                        selectedCamera.aiMonitoring !==
                        false
                          ? "live-text"
                          : "live-text inactive"
                      }
                    >
                      {selectedCamera.status ===
                      "Online"
                        ? "LIVE"
                        : "OFFLINE"}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    CAMERA DETAILS
                ================================================= */}

                <div className="details-card">

                  <div className="details-header">
                    <div>
                      <h3>Camera Details</h3>

                      <span>
                        Surveillance Configuration
                      </span>
                    </div>

                    <Crosshair size={20} />
                  </div>

                  {/* Camera ID */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <Monitor size={16} />
                      Camera ID
                    </div>

                    <span>
                      {selectedCamera.id}
                    </span>
                  </div>

                  {/* Camera Name */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <Camera size={16} />
                      Camera Name
                    </div>

                    <span>
                      {selectedCamera.name}
                    </span>
                  </div>

                  {/* Border Sector */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <MapPin size={16} />
                      Border Sector
                    </div>

                    <span>
                      {selectedCamera.location}
                    </span>
                  </div>

                  {/* Camera Type */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <Video size={16} />
                      Camera Type
                    </div>

                    <span>
                      {selectedCamera.type ||
                        "Fixed"}
                    </span>
                  </div>

                  {/* Resolution */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <Camera size={16} />
                      Resolution
                    </div>

                    <span>
                      {selectedCamera.resolution ||
                        "1080p"}
                    </span>
                  </div>

                  {/* Frame Rate */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <Clock3 size={16} />
                      Frame Rate
                    </div>

                    <span>
                      {selectedCamera.frameRate ||
                        "25 FPS"}
                    </span>
                  </div>

                  {/* AI Monitoring */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <ScanLine size={16} />
                      AI Monitoring
                    </div>

                    <span
                      className={
                        selectedCamera.aiMonitoring !==
                        false
                          ? "detail-ai-active"
                          : "detail-ai-inactive"
                      }
                    >
                      {selectedCamera.aiMonitoring !==
                      false
                        ? "Active"
                        : "Disabled"}
                    </span>
                  </div>

                  {/* Manufacturer */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <Cpu size={16} />
                      Manufacturer
                    </div>

                    <span>
                      {selectedCamera.manufacturer ||
                        "N/A"}
                    </span>
                  </div>

                  {/* Model */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <Video size={16} />
                      Model
                    </div>

                    <span>
                      {selectedCamera.model ||
                        "N/A"}
                    </span>
                  </div>

                  {/* IP */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <Globe size={16} />
                      IP Address
                    </div>

                    <span>
                      {selectedCamera.ipAddress ||
                        "N/A"}
                    </span>
                  </div>

                  {/* Coordinates */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <MapPin size={16} />
                      Coordinates
                    </div>

                    <span>
                      {selectedCamera.latitude ??
                        "N/A"}
                      ,{" "}
                      {selectedCamera.longitude ??
                        "N/A"}
                    </span>
                  </div>

                  {/* Storage */}
                  <div className="detail-row">
                    <div className="detail-label">
                      <HardDrive size={16} />
                      Storage
                    </div>

                    <span>
                      {selectedCamera.storage ||
                        "Local + Cloud"}
                    </span>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CameraManagement;