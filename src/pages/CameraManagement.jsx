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
  Database,
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
} from "lucide-react";
import { createCamera, getCameras } from "../services/guardianApi";
import { unwrapList } from "../services/apiClient";
import { countByStatus, normalizeCamera } from "../services/dataMappers";

const fallbackCameras = [
    {
      id: "CAM-001",
      name: "Main Entrance",
      location: "Building A",
      type: "Indoor",
      status: "Online",
      resolution: "1080p",
      lastActive: "2 sec ago",
      image: cam1,
    },
    {
      id: "CAM-002",
      name: "Lobby Area",
      location: "Building A",
      type: "Indoor",
      status: "Online",
      resolution: "1080p",
      lastActive: "5 sec ago",
      image: cam2,
    },
    {
      id: "CAM-003",
      name: "Corridor 1",
      location: "Building A",
      type: "Indoor",
      status: "Online",
      resolution: "720p",
      lastActive: "3 sec ago",
      image: cam3,
    },
    {
      id: "CAM-004",
      name: "Parking Zone B",
      location: "Building B",
      type: "Outdoor",
      status: "Online",
      resolution: "1080p",
      lastActive: "6 sec ago",
      image: cam4,
    },
    {
      id: "CAM-005",
      name: "Perimeter Fence",
      location: "Building B",
      type: "Outdoor",
      status: "Online",
      resolution: "1080p",
      lastActive: "1 sec ago",
      image: cam5,
    },
    {
      id: "CAM-006",
      name: "Server Room",
      location: "Building A",
      type: "Indoor",
      status: "Offline",
      resolution: "1080p",
      lastActive: "2 min ago",
      image: cam6,
    },
    {
      id: "CAM-007",
      name: "Side Entrance",
      location: "Building A",
      type: "Outdoor",
      status: "Online",
      resolution: "720p",
      lastActive: "4 sec ago",
      image: cam1,
    },
    {
      id: "CAM-008",
      name: "Rooftop",
      location: "Building B",
      type: "Outdoor",
      status: "Online",
      resolution: "1080p",
      lastActive: "7 sec ago",
      image: cam2,
    },
];

const CameraManagement = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cameras, setCameras] = useState(fallbackCameras);
  const [selectedCamera, setSelectedCamera] = useState(fallbackCameras[3]);
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
    latitude: "",
    longitude: "",
    status: "Online",
    ipAddress: "",
  });

  useEffect(() => {
    let active = true;

    async function loadCameras() {
      try {
        const response = await getCameras();
        const nextCameras = unwrapList(response, "cameras").map(normalizeCamera);
        if (active && nextCameras.length) {
          setCameras(nextCameras);
          setSelectedCamera(nextCameras[0]);
          setApiMessage("");
        }
      } catch (error) {
        if (active) setApiMessage(error.message || "Using local camera data.");
      }
    }

    loadCameras();

    return () => {
      active = false;
    };
  }, []);

  const onlineCount = countByStatus(cameras, "Online");
  const offlineCount = countByStatus(cameras, "Offline");
  const onlinePercent = cameras.length
    ? Math.round((onlineCount / cameras.length) * 100)
    : 0;

  const stats = [
    {
      title: "Total Cameras",
      value: String(cameras.length),
      subtitle: "All Locations",
      icon: <Camera size={30} />,
      color: "green",
    },
    {
      title: "Online Cameras",
      value: String(onlineCount),
      subtitle: `${onlinePercent}% Online`,
      icon: <Radio size={30} />,
      color: "lime",
    },
    {
      title: "Offline Cameras",
      value: String(offlineCount),
      subtitle: `${100 - onlinePercent}% Offline`,
      icon: <VideoOff size={30} />,
      color: "red",
    },
    {
      title: "Storage Used",
      value: "68%",
      subtitle: "Backend metric pending",
      icon: <Database size={30} />,
      color: "gold",
    },
    {
      title: "Active Feeds",
      value: String(onlineCount),
      subtitle: "Live Now",
      icon: <ShieldCheck size={30} />,
      color: "yellow",
    },
  ];

  const locations = [...new Set(cameras.map((camera) => camera.location))];
  const types = [...new Set(cameras.map((camera) => camera.type))];
  const filteredCameras = useMemo(
    () =>
      cameras.filter((camera) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          camera.name.toLowerCase().includes(query) ||
          camera.id.toLowerCase().includes(query) ||
          camera.location.toLowerCase().includes(query);
        const matchesLocation =
          locationFilter === "all" || camera.location === locationFilter;
        const matchesStatus =
          statusFilter === "all" || camera.status === statusFilter;
        const matchesType = typeFilter === "all" || camera.type === typeFilter;

        return matchesSearch && matchesLocation && matchesStatus && matchesType;
      }),
    [cameras, locationFilter, searchQuery, statusFilter, typeFilter]
  );

  const resetCameraForm = () => {
    setCameraForm({
      name: "",
      location: "",
      latitude: "",
      longitude: "",
      status: "Online",
      ipAddress: "",
    });
  };

  const handleCameraInputChange = (event) => {
    const { name, value } = event.target;
    setCameraForm((current) => ({ ...current, [name]: value }));
  };

  const handleCreateCamera = async (event) => {
    event.preventDefault();

    const name = cameraForm.name.trim();
    const location = cameraForm.location.trim();
    const ipAddress = cameraForm.ipAddress.trim();
    const latitude = Number(cameraForm.latitude);
    const longitude = Number(cameraForm.longitude);

    if (!name || !location || !ipAddress) {
      setApiMessage("Please complete the name, location, and IP address fields.");
      return;
    }

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      setApiMessage("Latitude and longitude must be valid numbers.");
      return;
    }

    const ipPattern = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    if (!ipPattern.test(ipAddress)) {
      setApiMessage("Please enter a valid IPv4 address.");
      return;
    }

    setIsSubmittingCamera(true);

    try {
      const response = await createCamera({
        name,
        location,
        latitude,
        longitude,
        status: cameraForm.status.toLowerCase(),
        ipAddress,
      });

      const camera = normalizeCamera(
        response?.camera || response?.data || response || {
          name,
          location,
          latitude,
          longitude,
          status: cameraForm.status.toLowerCase(),
          ipAddress,
        }
      );

      setCameras((current) => [camera, ...current]);
      setSelectedCamera(camera);
      setApiMessage("Camera created successfully.");
      setShowAddCameraModal(false);
      resetCameraForm();
    } catch (error) {
      setApiMessage(error.message || "Unable to create camera.");
    } finally {
      setIsSubmittingCamera(false);
    }
  };

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

      <div className="camera-management">

      {/* =====================================
              Header
      ====================================== */}

      <div className="camera-header">

        <div className="camera-title">

          <div className="camera-icon">
            <Camera size={34} />
          </div>

          <div>
            <h1>Camera Management</h1>
            <p>Manage and configure all surveillance cameras</p>
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
  onClick={() => alert("Report exported successfully.")}
>
            <Download size={18} />
            Export Report
          </button>

        </div>

      </div>

      {apiMessage && <p className="camera-api-message">{apiMessage}</p>}

      {showAddCameraModal && (
        <div className="camera-modal-overlay" onClick={() => setShowAddCameraModal(false)}>
          <div className="camera-modal" onClick={(event) => event.stopPropagation()}>
            <div className="camera-modal-header">
              <div>
                <p className="modal-label">New Camera</p>
                <h3>Add Camera</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowAddCameraModal(false)}
              >
                ×
              </button>
            </div>

            <form className="camera-form" onSubmit={handleCreateCamera}>
              <div className="form-grid">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Main Gate"
                    value={cameraForm.name}
                    onChange={handleCameraInputChange}
                    required
                  />
                </label>

                <label>
                  <span>Location</span>
                  <input
                    type="text"
                    name="location"
                    placeholder="College Campus"
                    value={cameraForm.location}
                    onChange={handleCameraInputChange}
                    required
                  />
                </label>

                <label>
                  <span>Latitude</span>
                  <input
                    type="number"
                    name="latitude"
                    step="any"
                    placeholder="12.9716"
                    value={cameraForm.latitude}
                    onChange={handleCameraInputChange}
                    required
                  />
                </label>

                <label>
                  <span>Longitude</span>
                  <input
                    type="number"
                    name="longitude"
                    step="any"
                    placeholder="77.5946"
                    value={cameraForm.longitude}
                    onChange={handleCameraInputChange}
                    required
                  />
                </label>

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

                <label>
                  <span>IP Address</span>
                  <input
                    type="text"
                    name="ipAddress"
                    placeholder="192.168.1.10"
                    value={cameraForm.ipAddress}
                    onChange={handleCameraInputChange}
                    required
                  />
                </label>
              </div>

              <div className="camera-modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddCameraModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-camera-btn" disabled={isSubmittingCamera}>
                  {isSubmittingCamera ? "Saving..." : "Save Camera"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================
              Statistics Cards
      ====================================== */}

      <div className="camera-stats">

        {stats.map((item, index) => (
          <div className="camera-stat-card" key={index}>

            <div className={`stat-icon ${item.color}`}>
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

      {/* =====================================
            Search + Filters
      ====================================== */}

      <div className="camera-toolbar">

        <div className="toolbar-left">

          <div className="search-box">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search cameras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

          </div>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

        </div>

        <div className="toolbar-right">

          <button
            className={viewMode === "grid" ? "active-view" : ""}
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 size={18} />
          </button>

          <button
            className={viewMode === "list" ? "active-view" : ""}
            onClick={() => setViewMode("list")}
          >
            <List size={18} />
          </button>

        </div>

      </div>
            {/* =====================================
              Main Content
      ====================================== */}

      <div className="camera-content">

        {/* ===========================
              Camera Table
        ============================ */}

        <div className="camera-table-card">

          <table className="camera-table">

            <thead>
              <tr>
                <th></th>
                <th>Camera</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Resolution</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredCameras.map((camera) => (

                <tr
                  key={camera.id}
                  onClick={() => setSelectedCamera(camera)}
                  className={
                    selectedCamera.id === camera.id
                      ? "selected-camera"
                      : ""
                  }
                >

                  {/* Status Dot */}

                  <td>

                    <span
                      className={
                        camera.status === "Online"
                          ? "status-dot online"
                          : "status-dot offline"
                      }
                    ></span>

                  </td>

                  {/* Camera */}

                  <td>

                    <div className="camera-cell">

                      <img
                        src={camera.image}
                        alt={camera.id}
                      />

                      <div>

                        <h4>{camera.id}</h4>

                        <span>{camera.name}</span>

                      </div>

                    </div>

                  </td>

                  {/* Location */}

                  <td>{camera.location}</td>

                  {/* Type */}

                  <td>{camera.type}</td>

                  {/* Status */}

                  <td>

                    <span
                      className={
                        camera.status === "Online"
                          ? "status online-status"
                          : "status offline-status"
                      }
                    >
                      {camera.status}
                    </span>

                  </td>

                  {/* Resolution */}

                  <td>{camera.resolution}</td>

                  {/* Last Active */}

                  <td
                    className={
                      camera.status === "Online"
                        ? "active-time"
                        : "offline-time"
                    }
                  >
                    {camera.lastActive}
                  </td>

                  {/* Actions */}

                  <td>

                    <div className="table-actions">

                      <button
                        className="action-btn view-btn"
                        onClick={(e) => {
  e.stopPropagation();
  setSelectedCamera(camera);
  navigate("/live-monitoring");
}}
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        className="action-btn settings-btn"
                        onClick={(e) => {
  e.stopPropagation();
  alert("Camera settings will be available soon.");
}}
                      >
                        <Settings size={15} />
                      </button>

                      <button
                        className="action-btn delete-btn"
                        onClick={(e) => {
  e.stopPropagation();

  if (window.confirm("Delete this camera?")) {
    alert("Delete functionality coming soon.");
  }
}}
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
                {/* ===========================
              Right Sidebar
        ============================ */}

        <div className="camera-sidebar">

          {/* ===========================
                Camera Preview
          ============================ */}

          <div
  className="preview-card"
  onClick={() => navigate("/live-monitoring")}
  style={{ cursor: "pointer" }}
>

            <div className="sidebar-header">
              <h3>Camera Preview</h3>

              <button className="fullscreen-btn">
                ⛶
              </button>
            </div>

            <div className="preview-image">

              <img
                src={selectedCamera.image}
                alt={selectedCamera.id}
              />

            </div>

            <div className="preview-footer">

              <div className="preview-info">

                <span className="status-dot online"></span>

                <span>
                  {selectedCamera.id} - {selectedCamera.name}
                </span>

              </div>

              <span className="live-text">
                Live
              </span>

            </div>

          </div>

          {/* ===========================
                Camera Details
          ============================ */}

          <div className="details-card">

            <h3>Camera Details</h3>

            <div className="detail-row">

              <div className="detail-label">
                <Monitor size={16} />
                Camera ID
              </div>

              <span>{selectedCamera.id}</span>

            </div>

            <div className="detail-row">

              <div className="detail-label">
                <MapPin size={16} />
                Location
              </div>

              <span>{selectedCamera.location}</span>

            </div>

            <div className="detail-row">

              <div className="detail-label">
                <Video size={16} />
                Type
              </div>

              <span>{selectedCamera.type}</span>

            </div>

            <div className="detail-row">

              <div className="detail-label">
                <Camera size={16} />
                Resolution
              </div>

              <span>
                {selectedCamera.resolution}
                {selectedCamera.resolution === "1080p"
                  ? " (1920×1080)"
                  : " (1280×720)"}
              </span>

            </div>

            <div className="detail-row">

              <div className="detail-label">
                <Clock3 size={16} />
                Frame Rate
              </div>

              <span>25 FPS</span>

            </div>

            <div className="detail-row">

              <div className="detail-label">
                <Cpu size={16} />
                Manufacturer
              </div>

              <span>Hikvision</span>

            </div>

            <div className="detail-row">

              <div className="detail-label">
                <Video size={16} />
                Model
              </div>

              <span>DS-2CD2143G0</span>

            </div>

            <div className="detail-row">

              <div className="detail-label">
                <Globe size={16} />
                IP Address
              </div>

              <span>{selectedCamera.ipAddress || "N/A"}</span>

            </div>

            <div className="detail-row">

              <div className="detail-label">
                <HardDrive size={16} />
                Storage
              </div>

              <span>Local + Cloud</span>

            </div>

          </div>

        </div>

      </div>
                </div>

    </main>

  </div>
);
};

export default CameraManagement;
