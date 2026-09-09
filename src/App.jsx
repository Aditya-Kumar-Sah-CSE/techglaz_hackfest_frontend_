import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import LiveMonitoring from "./pages/LiveMonitoring";
import CameraManagement from "./pages/CameraManagement";
import Analytics from "./pages/Analytics";
import AlertDetails from "./pages/AlertDetails";
import Alert from "./pages/Alerts";

// ===============================
// NEW BORDER SURVEILLANCE PAGES
// ===============================
import BorderMap from "./pages/BorderMap";
import VirtualFence from "./pages/VirtualFence";

// ===============================
// POLICE
// ===============================
import PoliceDashboard from "./pages/police/PoliceDashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* ========================= */}
        {/* SPLASH SCREEN */}
        {/* ========================= */}

        <Route
          path="/"
          element={<SplashScreen />}
        />

        {/* ========================= */}
        {/* LOGIN */}
        {/* ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ========================= */}
        {/* ADMIN DASHBOARD */}
        {/* ========================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Live Monitoring */}

        <Route
          path="/live-monitoring"
          element={<LiveMonitoring />}
        />

        {/* Camera Management */}

        <Route
          path="/camera-management"
          element={<CameraManagement />}
        />

        {/* Analytics */}

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Alert Details */}

        <Route
          path="/alert-details"
          element={<AlertDetails />}
        />

        {/* Alerts */}

        <Route
          path="/alerts"
          element={<Alert />}
        />

        {/* ========================= */}
        {/* BORDER SURVEILLANCE */}
        {/* ========================= */}

        <Route
          path="/border-map"
          element={<BorderMap />}
        />

        {/* ========================= */}
        {/* VIRTUAL FENCE */}
        {/* ========================= */}

        <Route
          path="/virtual-fence"
          element={<VirtualFence />}
        />

        {/* ========================= */}
        {/* POLICE DASHBOARD */}
        {/* ========================= */}

        <Route
          path="/police/dashboard"
          element={<PoliceDashboard />}
        />

        <Route
          path="/police/alerts"
          element={<PoliceDashboard />}
        />

        <Route
          path="/police/live-camera"
          element={<PoliceDashboard />}
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;