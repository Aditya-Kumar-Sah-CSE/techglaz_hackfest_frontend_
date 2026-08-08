import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../services/apiClient";
import "./LiveCamera.css";

function LiveCamera({ cameraId, streamUrl, fallbackImage, alt = "Live camera feed" }) {
  const [reloadKey, setReloadKey] = useState(0);
  const [state, setState] = useState(streamUrl ? "loading" : "fallback");

  useEffect(() => {
    setState(streamUrl ? "loading" : "fallback");
    setReloadKey(0);
  }, [cameraId, streamUrl]);

  const url = useMemo(() => {
    if (streamUrl) return `${streamUrl}${streamUrl.includes("?") ? "&" : "?"}t=${reloadKey}`;
    if (!cameraId) return "";
    return `${API_BASE_URL}/cameras/${encodeURIComponent(cameraId)}/live?t=${reloadKey}`;
  }, [cameraId, reloadKey, streamUrl]);

  const reconnect = (event) => {
    event.stopPropagation();
    setState("loading");
    setReloadKey((key) => key + 1);
  };

  return (
    <div className="live-camera" role="status" aria-live="polite">
      {state === "loading" && <div className="live-camera-message">Connecting to live stream…</div>}
      {state === "error" && (
        <div className="live-camera-message">
          <span>Live stream unavailable.</span>
          <button type="button" onClick={reconnect}>Reconnect</button>
        </div>
      )}
      {state === "fallback" && fallbackImage && <img src={fallbackImage} alt={alt} />}
      {url && state !== "fallback" && (
        <img
          key={url}
          src={url}
          alt={alt}
          onLoad={() => setState("live")}
          onError={() => setState("error")}
        />
      )}
      {state === "live" && <span className="live-camera-indicator">LIVE</span>}
    </div>
  );
}

export default LiveCamera;
