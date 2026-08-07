// ==============================================
// CameraFeed.jsx (Part 1)
// GuardianAI
// ==============================================


import "./CameraFeed.css";

import {
  Video,
  ShieldCheck,
  Camera,
  Settings,
  Maximize2,
  Circle,
} from "lucide-react";

// Temporary CCTV Image
import cameraFeed from "../../assets/images/camera-feed.jpg";

const CameraFeed = () => {
  return (
    <div className="camera-feed-page">

      {/* =======================================
          Header
      ======================================== */}
      <div className="camera-header">

        <div className="camera-title">

          <div className="camera-icon">
            <Video size={30} />
          </div>

          <div>
            <h1>Camera Feed</h1>
            <p>Real-time surveillance and AI monitoring</p>
          </div>

        </div>

        {/* System Status */}

        <div className="system-status-card">

          <div className="status-left">

            <div className="green-dot"></div>

            <div>
              <h4>System Active</h4>
              <span>All systems operational</span>
            </div>

          </div>

          <div className="status-logo">
            <ShieldCheck size={28} />
          </div>

        </div>

      </div>



      {/* =======================================
          Camera Card
      ======================================== */}

      <div className="camera-card">

        {/* Camera Top Bar */}

        <div className="camera-topbar">

          <div className="camera-info">

            <span className="live-badge">
              LIVE
            </span>

            <h3>Camera 01 - Main Entrance</h3>

          </div>


          <div className="camera-options">

            <button className="icon-btn">
              <Maximize2 size={18} />
            </button>

            <button className="icon-btn">
              <Camera size={18} />
            </button>

            <button className="icon-btn">
              <Settings size={18} />
            </button>

          </div>

        </div>



        {/* =======================================
            Live Camera Feed
        ======================================== */}

        <div className="camera-preview">

          <img
            src={cameraFeed}
            alt="Camera Feed"
          />

          <div className="camera-time">
            29-07-2026&nbsp;&nbsp;19:45:32
          </div>

        </div>

      </div>



      {/* =======================================
          Camera Status
      ======================================== */}

      <div className="camera-status-grid">

        {/* Status */}

        <div className="status-box">

          <div className="status-title">
            <Circle
              size={10}
              fill="#22c55e"
              color="#22c55e"
            />

            <span>Camera Status</span>

          </div>

          <h4>Online</h4>

        </div>



        {/* Resolution */}

        <div className="status-box">

          <span className="status-label">
            Resolution
          </span>

          <h4>1920 × 1080</h4>

        </div>



        {/* FPS */}

        <div className="status-box">

          <span className="status-label">
            FPS
          </span>

          <h4>25 FPS</h4>

        </div>



        {/* Stream */}

        <div className="status-box">

          <span className="status-label">
            Stream Quality
          </span>

          <h4>HD</h4>

        </div>

      </div>

      {/* ======================================
    Bottom Controls
====================================== */}

<div className="camera-controls">

    <button className="control-btn green-btn">
        <span>⏸</span>
        Pause Stream
    </button>

    <button className="control-btn gold-btn">
        <Camera size={18}/>
        Capture Snapshot
    </button>

    <button className="control-btn gold-outline">
        <Circle size={16}/>
        Start Recording
    </button>

    <button className="control-btn green-btn">
        🔊 Audio On
    </button>

</div>

    </div>
  );
};

export default CameraFeed;