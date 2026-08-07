import { useState } from "react";
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

const CameraManagement = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
  /* =====================================
      Camera Statistics
  ====================================== */

  const stats = [
    {
      title: "Total Cameras",
      value: "12",
      subtitle: "All Locations",
      icon: <Camera size={30} />,
      color: "green",
    },
    {
      title: "Online Cameras",
      value: "10",
      subtitle: "83% Online",
      icon: <Radio size={30} />,
      color: "lime",
    },
    {
      title: "Offline Cameras",
      value: "2",
      subtitle: "17% Offline",
      icon: <VideoOff size={30} />,
      color: "red",
    },
    {
      title: "Storage Used",
      value: "68%",
      subtitle: "2.1 TB / 3.0 TB",
      icon: <Database size={30} />,
      color: "gold",
    },
    {
      title: "Active Feeds",
      value: "12",
      subtitle: "Live Now",
      icon: <ShieldCheck size={30} />,
      color: "yellow",
    },
  ];

  /* =====================================
      Camera Data
  ====================================== */

  const cameras = [
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

  const [selectedCamera, setSelectedCamera] = useState(cameras[3]);
  const [viewMode, setViewMode] = useState("grid");

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
  onClick={() => alert("Add Camera feature coming soon.")}
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
            />

          </div>

          <select>
            <option>All Locations</option>
            <option>Building A</option>
            <option>Building B</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Online</option>
            <option>Offline</option>
          </select>

          <select>
            <option>All Types</option>
            <option>Indoor</option>
            <option>Outdoor</option>
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

              {cameras.map((camera) => (

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

              <span>192.168.1.104</span>

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