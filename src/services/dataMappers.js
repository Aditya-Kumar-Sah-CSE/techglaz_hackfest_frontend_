import cam1 from "../assets/images/cam1.jpg";
import cam2 from "../assets/images/cam2.jpg";
import cam3 from "../assets/images/cam3.jpg";
import cam4 from "../assets/images/cam4.jpg";
import cam5 from "../assets/images/cam5.jpg";
import cam6 from "../assets/images/cam6.jpg";

const cameraImages = [cam1, cam2, cam3, cam4, cam5, cam6];

function pickImage(value, index = 0) {
  return value || cameraImages[index % cameraImages.length];
}

export function normalizeCamera(camera, index = 0) {
  const id = camera._id || camera.id || camera.cameraId || `CAM-${index + 1}`;
  const status = String(camera.status || "offline").toLowerCase();

  return {
    id,
    name: camera.name || camera.title || `Camera ${index + 1}`,
    location:
      camera.location?.area ||
      camera.location?.building ||
      camera.location ||
      camera.address ||
      "Unknown Location",
    type: camera.type || camera.cameraType || "Surveillance",
    status: status === "online" || camera.online ? "Online" : "Offline",
    resolution: camera.resolution || "1080p",
    lastActive: camera.lastActive || camera.updatedAt || camera.createdAt || "Just now",
    image: pickImage(camera.imageUrl || camera.snapshotUrl || camera.frameUrl, index),
    latitude: camera.latitude ?? camera.location?.latitude,
    longitude: camera.longitude ?? camera.location?.longitude,
    ipAddress: camera.ipAddress || camera.ip || camera.ip_address || camera.address || "N/A",
    raw: camera,
  };
}

export function normalizeAlert(alert, index = 0) {
  const id = alert._id || alert.id || alert.alertId || `ALERT-${index + 1}`;
  const priority = String(alert.priority || alert.severity || "medium").toLowerCase();
  const status = String(alert.status || "active").toLowerCase();
  const camera = alert.camera || alert.cameraId || {};
  const location = alert.location || {};
  const createdAt = alert.createdAt || alert.timestamp || alert.time;
  const date = createdAt ? new Date(createdAt) : null;
  const validDate = date && !Number.isNaN(date.getTime());

  return {
    id,
    title: alert.title || alert.type || alert.alertType || "Security Alert",
    description: alert.description || alert.summary || "Security event detected.",
    priority,
    status,
    confidence: alert.confidence || alert.confidenceScore || alert.score || 0,
    type: alert.alertType || alert.type || "Security Event",
    cameraId:
      typeof camera === "object"
        ? camera.cameraId || camera.id || camera._id || alert.cameraId || "Camera"
        : camera,
    cameraName:
      typeof camera === "object"
        ? camera.name || camera.title || "Camera"
        : String(camera || "Camera"),
    location:
      location.area ||
      location.building ||
      location.address ||
      alert.locationName ||
      alert.location ||
      "Unknown Location",
    building: location.building || alert.building || "",
    image: pickImage(alert.imageUrl || alert.snapshotUrl || alert.frameUrl, index),
    date: validDate ? date.toLocaleDateString() : alert.date || "Today",
    time: validDate ? date.toLocaleTimeString() : alert.timeDisplay || alert.time || "Just now",
    createdAt,
    raw: alert,
  };
}

export function normalizeOfficer(officer, index = 0) {
  return {
    id: officer._id || officer.id || officer.officerId || `OFFICER-${index + 1}`,
    name: officer.name || `Officer ${index + 1}`,
    phone: officer.phone || "",
    email: officer.email || "",
    badgeNumber: officer.badgeNumber || "",
    available: officer.available ?? officer.status === "available",
    status: officer.status || (officer.available ? "available" : "busy"),
    latitude: officer.currentLatitude,
    longitude: officer.currentLongitude,
    raw: officer,
  };
}

export function countByStatus(items, status) {
  return items.filter((item) => item.status.toLowerCase() === status).length;
}

export function countByPriority(alerts, priority) {
  return alerts.filter((alert) => alert.priority === priority).length;
}
