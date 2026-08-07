import "./AlertDetails.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Use one of your existing images
import alertPreview from "../assets/images/cam5.jpg";

import {
  ArrowLeft,
  ShieldAlert,
  Check,
  Upload,
  Download,
  Calendar,
  Clock3,
  MapPin,
  Camera,
  Brain,
  Activity,
  Crosshair,
  Shield,
} from "lucide-react";

const AlertDetails = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  /* ===========================================
      Alert Data
  =========================================== */

  const alert = {
    id: "ALERT-2025-0730-0012",

    title: "Intrusion Detected",

    priority: "HIGH PRIORITY",

    description:
      "Unauthorized access detected in restricted area. Person detected climbing over perimeter fence.",

    status: "ACTIVE",

    confidence: 92,

    type: "Intrusion / Perimeter Breach",

    date: "Jul 30, 2025",

    time: "02:14:32 AM",

    image: alertPreview,

    camera: "CAM-005",

    location: "Perimeter Fence",

    building: "Building B",
  };

  return (
    <div className="dashboard">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="alert-details-page">
          {/* ===================================
              Header
      ==================================== */}

          <div className="alert-header">
            <div className="alert-header-left">
              <button
                className="back-btn"
                onClick={() => navigate("/live-monitoring")}
              >
                <ArrowLeft size={18} />
                Back to Alerts
              </button>

              <div className="alert-page-title">
                <div className="title-icon">
                  <ShieldAlert size={30} />
                </div>

                <div>
                  <h1>Alert Details</h1>

                  <p>
                    View detailed information about the security alert and
                    incident
                  </p>
                </div>
              </div>
            </div>

            <div className="alert-header-actions">
              <button
                className="resolve-btn"
                onClick={() => alert("Alert marked as resolved.")}
              >
                <Check size={18} />
                Mark as Resolved
              </button>

              <button
                className="escalate-btn"
                onClick={() => alert("Alert escalated successfully.")}
              >
                <Upload size={18} />
                Escalate Alert
              </button>

              <button
                className="download-btn"
                onClick={() => alert("Downloading report...")}
              >
                <Download size={18} />
                Download Report
              </button>
            </div>
          </div>

          {/* ===================================
            Main Grid
      ==================================== */}

          <div className="alert-main-grid">
            {/* ===================================
                Left Side
        ==================================== */}

            <div className="alert-left">
              {/* ===================================
                Alert Summary
          ==================================== */}

              <div className="summary-card">
                <div className="summary-left">
                  <div className="alert-icon-box">
                    <ShieldAlert size={70} />
                  </div>

                  <div className="alert-summary-content">
                    <span className="priority-badge">{alert.priority}</span>

                    <h2>{alert.title}</h2>

                    <p>{alert.description}</p>

                    <div className="summary-meta">
                      <div className="meta-item">
                        <Calendar size={16} />

                        {alert.date}
                      </div>

                      <div className="meta-item">
                        <Clock3 size={16} />

                        {alert.time}
                      </div>

                      <div className="meta-item">{alert.id}</div>
                    </div>
                  </div>
                </div>

                {/* ===============================
                    Status Card
            ================================ */}

                <div className="summary-right">
                  <div className="status-box">
                    <span>Status</span>

                    <div className="status-active">{alert.status}</div>
                  </div>

                  <div className="confidence-box">
                    <span>Confidence Score</span>

                    <h2>{alert.confidence}%</h2>

                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{
                          width: `${alert.confidence}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="alert-type-card">
  <span>Alert Type</span>

  <p>{alert.type}</p>
</div>
                </div>
              </div>

              {/* ===================================
                Alert Information
          ==================================== */}

              <div className="info-card">
                <h3>Alert Information</h3>

                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <Brain size={22} />
                    </div>

                    <div>
                      <span>Detection Method</span>

                      <h4>AI Motion Detection</h4>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <Camera size={22} />
                    </div>

                    <div>
                      <span>Detected At</span>

                      <h4>02:14:32 AM</h4>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <Clock3 size={22} />
                    </div>

                    <div>
                      <span>Duration</span>

                      <h4>00:00:18</h4>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <Crosshair size={22} />
                    </div>

                    <div>
                      <span>Zone</span>

                      <h4>Restricted Zone B</h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* ===================================
                  AI Analysis
          =================================== */}

              <div className="analysis-card">
                <h3>AI Analysis</h3>

                <div className="analysis-content">
                  {/* Left */}

                  <div className="analysis-list">
                    <div className="analysis-item">
                      <Activity size={18} />

                      <span>Object Detected</span>

                      <strong>Human (1 Person)</strong>
                    </div>

                    <div className="analysis-item">
                      <Shield size={18} />

                      <span>Activity</span>

                      <strong>Climbing Over Fence</strong>
                    </div>

                    <div className="analysis-item">
                      <ShieldAlert size={18} />

                      <span>Risk Level</span>

                      <label className="risk-high">High</label>
                    </div>

                    <div className="analysis-item">
                      <Brain size={18} />

                      <span>Confidence</span>

                      <strong>92%</strong>
                    </div>
                  </div>

                  {/* Right */}

                  <div className="analysis-summary">
                    <h4>Analysis Summary</h4>

                    <p>
                      AI model detected a human attempting to cross the
                      perimeter fence in a restricted area. Behaviour has been
                      classified as suspicious based on movement pattern and
                      restricted-zone detection.
                    </p>

                    <div className="recommendation">
                      <span>Recommendation:</span>
                      Immediate attention required.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================
                Right Side
        =================================== */}

            <div className="alert-right">
              {/* ===================================
                Camera & Location
          =================================== */}

              <div className="camera-location-card">
                <h3>Camera & Location</h3>

                <div className="camera-preview">
                  <img src={alert.image} alt="Alert Camera" />
                </div>

                <div className="camera-footer">
                  <div className="camera-info">
                    <span className="live-dot"></span>

                    <span>
                      {alert.camera} - {alert.location}
                    </span>
                  </div>

                  <span className="live-status">Live</span>
                </div>

                <div className="location-info">
                  <div className="location-row">
                    <MapPin size={18} />

                    <span>{alert.building}</span>
                  </div>

                  <div className="location-row">
                    <MapPin size={18} />

                    <span>Perimeter Fence - North Side</span>
                  </div>
                </div>

                <button
                  className="map-btn"
                  onClick={() => navigate("/live-monitoring")}
                >
                  View on Map
                </button>
              </div>

              {/* ===================================
                Alert Timeline
          =================================== */}

              <div className="timeline-card">
                <h3>Alert Timeline</h3>

                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon danger">
                      <ShieldAlert size={18} />
                    </div>

                    <div className="timeline-content">
                      <h4>Alert Triggered</h4>

                      <p>AI detected suspicious activity</p>
                    </div>

                    <span>02:14:32 AM</span>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon success">
                      <Camera size={18} />
                    </div>

                    <div className="timeline-content">
                      <h4>Video Recording Started</h4>

                      <p>Recording initiated on CAM-005</p>
                    </div>

                    <span>02:14:32 AM</span>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon warning">
                      <Activity size={18} />
                    </div>

                    <div className="timeline-content">
                      <h4>Notification Sent</h4>

                      <p>Security team notified</p>
                    </div>

                    <span>02:14:33 AM</span>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon review">
                      <Shield size={18} />
                    </div>

                    <div className="timeline-content">
                      <h4>Under Review</h4>

                      <p>Alert is being reviewed</p>
                    </div>

                    <span>02:15:02 AM</span>
                  </div>
                </div>
              </div>
              {/* ===================================
                  Action Panel
          =================================== */}

              <div className="action-panel">
                <h3>Action Panel</h3>

                <div className="action-grid">
                  <button
                    className="action-card notes"
                    onClick={() => alert("Notes feature coming soon.")}
                  >
                    <Activity size={28} />

                    <span>Add Notes</span>
                  </button>

                  <button
                    className="action-card assign"
                    onClick={() => alert("Assigned to security guard.")}
                  >
                    <Shield size={28} />

                    <span>Assign to Guard</span>
                  </button>

                  <button
                    className="action-card share"
                    onClick={() => alert("Share feature coming soon.")}
                  >
                    <Upload size={28} />

                    <span>Share Alert</span>
                  </button>

                  <button
                    className="action-card false"
                    onClick={() => alert("Marked as false alarm.")}
                  >
                    <ShieldAlert size={28} />

                    <span>False Alarm</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================
              Snapshot Timeline
      =================================== */}

          <div className="snapshot-card">
            <h3>Snapshot Timeline</h3>

            <div className="snapshot-wrapper">
              <button className="snapshot-nav">❮</button>

              <div className="snapshot-list">
                {[
                  "02:14:20 AM",
                  "02:14:24 AM",
                  "02:14:32 AM",
                  "02:14:36 AM",
                  "02:14:40 AM",
                ].map((time, index) => (
                  <div
                    key={index}
                    className={`snapshot-item ${index === 2 ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={alert.image} alt={time} />

                    <span>{time}</span>
                  </div>
                ))}
              </div>

              <button className="snapshot-nav">❯</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlertDetails;
