import { Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./context/AuthContext";

import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LiveMonitoring from "./pages/LiveMonitoring";
import CameraManagement from "./pages/CameraManagement";
import Analytics from "./pages/Analytics";
import AlertDetails from "./pages/AlertDetails";
import Alert from "./pages/Alerts";
import PoliceDashboard from "./pages/police/PoliceDashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Portal Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live-monitoring"
          element={
            <ProtectedRoute allowedRole="admin">
              <LiveMonitoring />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camera-management"
          element={
            <ProtectedRoute allowedRole="admin">
              <CameraManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRole="admin">
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alert-details"
          element={
            <ProtectedRoute allowedRole="admin">
              <AlertDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute allowedRole="admin">
              <Alert />
            </ProtectedRoute>
          }
        />

        {/* Police Authority Portal Routes */}
        <Route
          path="/police/dashboard"
          element={
            <ProtectedRoute allowedRole="police">
              <PoliceDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/police/alerts"
          element={
            <ProtectedRoute allowedRole="police">
              <PoliceDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/police/live-camera"
          element={
            <ProtectedRoute allowedRole="police">
              <PoliceDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;