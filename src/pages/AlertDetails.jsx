
import "./AlertDetails.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Existing camera image
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

import {
  acknowledgeAlert,
  getAlert,
  getAlerts,
  getEvidenceByAlert,
} from "../services/guardianApi";

import { unwrapList, unwrapObject } from "../services/apiClient";
import { normalizeAlert } from "../services/dataMappers";

/* =========================================================
   FALLBACK ALERT
   Used when API data is unavailable
========================================================= */

const fallbackAlert = {
  id: "ALERT-2026-0908-0012",
  title: "Perimeter Intrusion Detected",
  priority: "high",
  description:
    "AI detected a person entering a restricted border zone. Movement indicates a possible unauthorized perimeter breach.",
  status: "active",
  confidence: 94,
  type: "Perimeter Intrusion",
  date: "Sep 8, 2026",
  time: "02:14:32 AM",
  image: alertPreview,
  cameraId: "CAM-005",
  cameraName: "North Border Surveillance Cam",
  location: "Border Sector A-12",
  sector: "Sector A-12",
  direction: "Towards Border Interior",
};

/* =========================================================
   ALERT DETAILS COMPONENT
========================================================= */

const AlertDetails = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alert, setAlert] = useState(fallbackAlert);
  const [evidence, setEvidence] = useState([]);
  const [apiMessage, setApiMessage] = useState("");

  /* =======================================================
     LOAD ALERT DETAILS
  ======================================================= */

  useEffect(() => {
    let active = true;

    async function loadAlertDetails() {
      const selectedAlertId = localStorage.getItem(
        "surakshaai-selected-alert-id"
      );

      try {
        const response = selectedAlertId
          ? await getAlert(selectedAlertId)
          : await getAlerts(1);

        const alertData = selectedAlertId
          ? unwrapObject(response, "alert")
          : unwrapList(response, "alerts")[0];

        const normalizedAlert = normalizeAlert(
          alertData || fallbackAlert
        );

        if (active) {
          setAlert({
            ...fallbackAlert,
            ...normalizedAlert,
          });

          setApiMessage("");
        }

        if (normalizedAlert?.id) {
          const evidenceResponse = await getEvidenceByAlert(
            normalizedAlert.id
          );

          if (active) {
            setEvidence(
              unwrapList(evidenceResponse, "evidence")
            );
          }
        }
      } catch (error) {
        if (active) {
          setApiMessage(
            error.message || "Using fallback alert details."
          );
        }
      }
    }

    loadAlertDetails();

    return () => {
      active = false;
    };
  }, []);

  /* =======================================================
     ACKNOWLEDGE ALERT
  ======================================================= */

  const handleAcknowledge = async () => {
    const officerId =
      localStorage.getItem("surakshaai-officer-id") ||
      window.prompt("Officer ID for acknowledgement");

    if (!officerId) return;

    localStorage.setItem("surakshaai-officer-id", officerId);

    try {
      await acknowledgeAlert(alert.id, officerId);

      setAlert((current) => ({
        ...current,
        status: "acknowledged",
      }));

      setApiMessage("Alert acknowledged.");
    } catch (error) {
      setApiMessage(
        error.message || "Unable to acknowledge alert."
      );
    }
  };

  /* =======================================================
     ESCALATE INCIDENT
  ======================================================= */

  const handleEscalate = () => {
    window.alert(
      "Border security incident escalated successfully."
    );
  };

  /* =======================================================
     DOWNLOAD REPORT
  ======================================================= */

  const handleDownloadReport = () => {
    window.alert("Incident report download initiated.");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="dashboard">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="alert-details-page">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="alert-header">

            <div className="alert-header-left">

              <button
                className="back-btn"
                onClick={() => navigate("/alerts")}
              >
                <ArrowLeft size={18} />
                Back to Alerts
              </button>

              <div className="alert-page-title">

                <div className="title-icon">
                  <ShieldAlert size={30} />
                </div>

                <div>
                  <h1>Incident Details</h1>

                  <p>
                    Investigate AI-detected border security
                    incidents and review supporting evidence
                  </p>
                </div>

              </div>
            </div>

            {/* HEADER ACTIONS */}

            <div className="alert-header-actions">

              <button
                className="resolve-btn"
                onClick={handleAcknowledge}
              >
                <Check size={18} />
                Acknowledge
              </button>

              <button
                className="escalate-btn"
                onClick={handleEscalate}
              >
                <Upload size={18} />
                Escalate Incident
              </button>

              <button
                className="download-btn"
                onClick={handleDownloadReport}
              >
                <Download size={18} />
                Download Report
              </button>

            </div>
          </div>

          {/* API MESSAGE */}

          {apiMessage && (
            <p className="details-api-message">
              {apiMessage}
            </p>
          )}

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div className="alert-main-grid">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="alert-left">

              {/* =================================================
                  INCIDENT SUMMARY
              ================================================= */}

              <div className="summary-card">

                <div className="summary-left">

                  <div className="alert-icon-box">
                    <ShieldAlert size={70} />
                  </div>

                  <div className="alert-summary-content">

                    <span className="priority-badge">
                      {alert.priority?.toUpperCase()} PRIORITY
                    </span>

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

                      <div className="meta-item">
                        {alert.id}
                      </div>

                    </div>
                  </div>
                </div>

                {/* =================================================
                    STATUS
                ================================================= */}

                <div className="summary-right">

                  <div className="status-box">

                    <span>Status</span>

                    <div className="status-active">
                      {alert.status?.toUpperCase()}
                    </div>

                  </div>

                  <div className="confidence-box">

                    <span>AI Confidence Score</span>

                    <h2>{alert.confidence}%</h2>

                    <div className="confidence-bar">

                      <div
                        className="confidence-fill"
                        style={{
                          width: `${alert.confidence}%`,
                        }}
                      />

                    </div>
                  </div>

                  <div className="alert-type-card">

                    <span>Incident Type</span>

                    <p>{alert.type}</p>

                  </div>

                </div>
              </div>

              {/* =================================================
                  ALERT INFORMATION
              ================================================= */}

              <div className="info-card">

                <h3>Incident Information</h3>

                <div className="info-grid">

                  {/* Detection Method */}

                  <div className="info-item">

                    <div className="info-icon">
                      <Brain size={22} />
                    </div>

                    <div>
                      <span>Detection Method</span>

                      <h4>YOLOv8 Object Detection</h4>
                    </div>

                  </div>

                  {/* Detected At */}

                  <div className="info-item">

                    <div className="info-icon">
                      <Camera size={22} />
                    </div>

                    <div>
                      <span>Detected At</span>

                      <h4>{alert.time}</h4>
                    </div>

                  </div>

                  {/* Object */}

                  <div className="info-item">

                    <div className="info-icon">
                      <Activity size={22} />
                    </div>

                    <div>
                      <span>Object Detected</span>

                      <h4>1 Person</h4>
                    </div>

                  </div>

                  {/* Zone */}

                  <div className="info-item">

                    <div className="info-icon">
                      <Crosshair size={22} />
                    </div>

                    <div>
                      <span>Restricted Zone</span>

                      <h4>
                        {alert.sector ||
                          alert.location ||
                          "Border Sector A-12"}
                      </h4>
                    </div>

                  </div>

                </div>
              </div>

              {/* =================================================
                  AI ANALYSIS
              ================================================= */}

              <div className="analysis-card">

                <h3>AI Analysis</h3>

                <div className="analysis-content">

                  {/* ANALYSIS LIST */}

                  <div className="analysis-list">

                    {/* Object */}

                    <div className="analysis-item">

                      <Activity size={18} />

                      <span>Object Detected</span>

                      <strong>
                        Human (1 Person)
                      </strong>

                    </div>

                    {/* Movement */}

                    <div className="analysis-item">

                      <Shield size={18} />

                      <span>Movement</span>

                      <strong>
                        Entering Restricted Zone
                      </strong>

                    </div>

                    {/* Direction */}

                    <div className="analysis-item">

                      <Crosshair size={18} />

                      <span>Direction</span>

                      <strong>
                        {alert.direction ||
                          "Towards Border Interior"}
                      </strong>

                    </div>

                    {/* Risk */}

                    <div className="analysis-item">

                      <ShieldAlert size={18} />

                      <span>Risk Level</span>

                      <label className="risk-high">
                        High
                      </label>

                    </div>

                    {/* Confidence */}

                    <div className="analysis-item">

                      <Brain size={18} />

                      <span>Confidence</span>

                      <strong>
                        {alert.confidence}%
                      </strong>

                    </div>

                  </div>

                  {/* ANALYSIS SUMMARY */}

                  <div className="analysis-summary">

                    <h4>Analysis Summary</h4>

                    <p>
                      YOLOv8 detected a human entering a
                      restricted border zone. The movement
                      pattern indicates a possible unauthorized
                      perimeter breach. The incident has been
                      classified as high risk and requires
                      immediate verification by the security
                      team.
                    </p>

                    <div className="recommendation">

                      <span>Recommendation:</span>

                      Verify the incident and initiate
                      border response protocol.

                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="alert-right">

              {/* =================================================
                  SURVEILLANCE CAMERA
              ================================================= */}

              <div className="camera-location-card">

                <h3>Surveillance Camera</h3>

                <div className="camera-preview">

                  <img
                    src={alert.image || alertPreview}
                    alt="Border surveillance camera"
                  />

                </div>

                <div className="camera-footer">

                  <div className="camera-info">

                    <span className="live-dot"></span>

                    <span>
                      {alert.cameraId || "CAM-005"} -{" "}
                      {alert.cameraName ||
                        "North Border Surveillance Cam"}
                    </span>

                  </div>

                  <span className="live-status">
                    Live
                  </span>

                </div>

                {/* LOCATION */}

                <div className="location-info">

                  <div className="location-row">

                    <MapPin size={18} />

                    <span>
                      {alert.sector ||
                        "Border Sector A-12"}
                    </span>

                  </div>

                  <div className="location-row">

                    <Crosshair size={18} />

                    <span>
                      {alert.location ||
                        "Restricted Border Zone"}
                    </span>

                  </div>

                </div>

                <button
                  className="map-btn"
                  onClick={() =>
                    navigate("/live-monitoring")
                  }
                >
                  View on Map
                </button>

              </div>

              {/* =================================================
                  INCIDENT TIMELINE
              ================================================= */}

              <div className="timeline-card">

                <h3>Incident Timeline</h3>

                <div className="timeline">

                  {/* AI Detection */}

                  <div className="timeline-item">

                    <div className="timeline-icon danger">
                      <ShieldAlert size={18} />
                    </div>

                    <div className="timeline-content">

                      <h4>
                        AI Detection Triggered
                      </h4>

                      <p>
                        YOLOv8 detected a person in the
                        restricted zone
                      </p>

                    </div>

                    <span>
                      {alert.time}
                    </span>

                  </div>

                  {/* Object Tracking */}

                  <div className="timeline-item">

                    <div className="timeline-icon success">
                      <Camera size={18} />
                    </div>

                    <div className="timeline-content">

                      <h4>
                        Object Tracking Started
                      </h4>

                      <p>
                        Person tracking initiated by
                        AI engine
                      </p>

                    </div>

                    <span>
                      {alert.time}
                    </span>

                  </div>

                  {/* Alert Generated */}

                  <div className="timeline-item">

                    <div className="timeline-icon warning">
                      <Activity size={18} />
                    </div>

                    <div className="timeline-content">

                      <h4>
                        Security Alert Generated
                      </h4>

                      <p>
                        Border security personnel
                        notified
                      </p>

                    </div>

                    <span>
                      02:14:33 AM
                    </span>

                  </div>

                  {/* Review */}

                  <div className="timeline-item">

                    <div className="timeline-icon review">
                      <Shield size={18} />
                    </div>

                    <div className="timeline-content">

                      <h4>
                        Incident Under Review
                      </h4>

                      <p>
                        Security operator is reviewing
                        the incident
                      </p>

                    </div>

                    <span>
                      02:15:02 AM
                    </span>

                  </div>

                </div>
              </div>

              {/* =================================================
                  ACTION PANEL
              ================================================= */}

              <div className="action-panel">

                <h3>Action Panel</h3>

                <div className="action-grid">

                  {/* Notes */}

                  <button
                    className="action-card notes"
                    onClick={() =>
                      window.alert(
                        "Notes feature coming soon."
                      )
                    }
                  >
                    <Activity size={28} />

                    <span>Add Notes</span>
                  </button>

                  {/* Live Camera */}

                  <button
                    className="action-card assign"
                    onClick={() =>
                      navigate("/live-monitoring")
                    }
                  >
                    <Camera size={28} />

                    <span>
                      View Live Camera
                    </span>
                  </button>

                  {/* Share */}

                  <button
                    className="action-card share"
                    onClick={() =>
                      window.alert(
                        "Incident sharing feature coming soon."
                      )
                    }
                  >
                    <Upload size={28} />

                    <span>
                      Share Incident
                    </span>
                  </button>

                  {/* False Alarm */}

                  <button
                    className="action-card false"
                    onClick={() =>
                      window.alert(
                        "Incident marked as false alarm."
                      )
                    }
                  >
                    <ShieldAlert size={28} />

                    <span>
                      False Alarm
                    </span>
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SNAPSHOT TIMELINE
          ================================================= */}

          <div className="snapshot-card">

            <h3>Evidence Snapshot Timeline</h3>

            <div className="snapshot-wrapper">

              <button className="snapshot-nav">
                ❮
              </button>

              <div className="snapshot-list">

                {(evidence.length
                  ? evidence
                  : [{ timestamp: alert.time }]
                )
                  .slice(0, 5)
                  .map((item, index) => {

                    const time =
                      item.timestamp ||
                      item.createdAt ||
                      alert.time;

                    const image =
                      item.imageUrl ||
                      item.snapshotUrl ||
                      alert.image ||
                      alertPreview;

                    return (
                      <div
                        key={index}
                        className={`snapshot-item ${
                          index === 0
                            ? "active"
                            : ""
                        }`}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={image}
                          alt={`Evidence at ${time}`}
                        />

                        <span>{time}</span>
                      </div>
                    );
                  })}

              </div>

              <button className="snapshot-nav">
                ❯
              </button>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AlertDetails;

