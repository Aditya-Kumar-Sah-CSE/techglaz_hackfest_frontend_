import { API_ROOT_URL, apiRequest } from "./apiClient";

export function getHealth() {
  const healthUrl = API_ROOT_URL ? `${API_ROOT_URL}/health` : "/health";
  return fetch(healthUrl, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  }).then(async (response) => {
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error("Health check failed.");
    }

    return data;
  });
}

export function getDashboardSummary() {
  return apiRequest("/dashboard");
}

export function getDashboardMap() {
  return apiRequest("/dashboard/map");
}

export function getCameras() {
  return apiRequest("/cameras");
}

export function getCamera(cameraId) {
  return apiRequest(`/cameras/${cameraId}`);
}

export function createCamera(camera) {
  return apiRequest("/cameras", {
    method: "POST",
    auth: true,
    body: camera,
  });
}

export function uploadCameraFrame({ cameraId, frame }) {
  const formData = new FormData();
  formData.append("cameraId", cameraId);
  formData.append("frame", frame);

  return apiRequest("/frame", {
    method: "POST",
    body: formData,
  });
}

export function getAlerts(limit = 50) {
  return apiRequest(`/alerts?limit=${limit}`);
}

export function getAlert(alertId) {
  return apiRequest(`/alerts/${alertId}`);
}

export function acknowledgeAlert(alertId, officerId) {
  return apiRequest(`/alerts/${alertId}/acknowledge`, {
    method: "PATCH",
    auth: true,
    body: {
      status: "acknowledged",
      officerId,
    },
  });
}

export function getEvidenceByAlert(alertId) {
  return apiRequest(`/evidence/alert/${alertId}`);
}

export function getEvidenceByCamera(cameraId) {
  return apiRequest(`/evidence/camera/${cameraId}`);
}

export function getIncidents() {
  return apiRequest("/incidents");
}

export function getIncident(incidentId) {
  return apiRequest(`/incidents/${incidentId}`);
}

export function updateIncidentStatus(incidentId, status) {
  return apiRequest(`/incidents/${incidentId}/status`, {
    method: "PATCH",
    auth: true,
    body: { status },
  });
}

export function getOfficers() {
  return apiRequest("/officers");
}

export function getNearestOfficer({ latitude, longitude }) {
  return apiRequest(`/officers/nearest?latitude=${latitude}&longitude=${longitude}`);
}

export function createOfficer(officer) {
  return apiRequest("/officers", {
    method: "POST",
    auth: true,
    body: officer,
  });
}

export function getNotifications() {
  return apiRequest("/notifications");
}
