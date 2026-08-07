// ===============================
// Part 1 - Imports & Setup
// ===============================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

// Images
import guardianLogo from "../assets/images/guardian-logo.png";

import citySkyline from "../assets/images/city-skyline.png";
import radarBg from "../assets/images/radar-bg.png";
import bgPattern from "../assets/images/bg-pattern.png";

// Lucide Icons
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Monitor,
  BarChart3,
  UserPlus,
  Mail,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  Check,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Role Selection State ("police" or "admin")
  const [selectedRole, setSelectedRole] = useState("police");

  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Login Form State
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  // Login Button
  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      username: loginData.username || (selectedRole === "police" ? "Officer" : "Admin"),
      fullName: selectedRole === "police" ? "Inspector Singh" : "System Administrator",
      roleLabel: selectedRole === "police" ? "Police Authority" : "System Administrator",
    };

    const targetPath = login(userData, selectedRole);
    navigate(targetPath);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log(signupData);

    // Connect backend later
  };

  return (
    <div
      className={`login-container ${showLogin ? "show-login" : ""}`}
      style={{
        backgroundImage: `url(${bgPattern})`,
      }}
    >
      {/* ========================= */}
      {/* Left Branding Panel */}
      {/* ========================= */}

      <div className="left-panel">
        {/* ========================= */}
        {/* Background Texture */}
        {/* ========================= */}

        <div className="left-overlay"></div>

        <img src={radarBg} alt="Radar Background" className="radar-bg" />

        {/* ========================= */}
        {/* Logo */}
        {/* ========================= */}

        <div className="brand-section">
          <img
            src={guardianLogo}
            alt="GuardianAI Logo"
            className="guardian-logo"
          />

          <h1 className="brand-title">
            Guardian<span>AI</span>
          </h1>

          <p className="brand-tagline">
            AI-Powered Surveillance.
            <br />
            Real-Time Protection.
          </p>

          <div className="gold-line"></div>
        </div>

        {/* ========================= */}
        {/* Feature Cards */}
        {/* ========================= */}

        <div className="feature-list">
          {/* Feature 1 */}

          <div className="feature-card">
            <div className="feature-icon">
              <Monitor size={24} />
            </div>

            <div className="feature-content">
              <h3>Real-time Monitoring</h3>
              <p>Monitor all cameras and activities in real-time.</p>
            </div>
          </div>

          {/* Feature 2 */}

          <div className="feature-card">
            <div className="feature-icon">
              <Bell size={24} />
            </div>

            <div className="feature-content">
              <h3>Instant Alerts</h3>
              <p>Get AI-powered alerts for critical incidents.</p>
            </div>
          </div>

          {/* Feature 3 */}

          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>

            <div className="feature-content">
              <h3>Smart Analytics</h3>
              <p>AI insights and analytics for better decisions.</p>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* Bottom City Skyline */}
        {/* ========================= */}

        <button
          className="next-button"
          onClick={() => setShowLogin(true)}
          aria-label="Go to Login"
        >
          <ChevronRight size={30} strokeWidth={2.5} />
        </button>

        <div className="city-container">
          <div className="city-gradient"></div>

          <img src={citySkyline} alt="City Skyline" className="city-skyline" />
        </div>
      </div>

      {/* ========================= */}
      {/* Right Login Panel */}
      {/* ========================= */}

      <div className="right-panel">
        <div className="login-card">
          <button
            className="back-button"
            onClick={() => setShowLogin(false)}
            aria-label="Back"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          {/* User Icon */}
          {!isSignup ? (
            <form onSubmit={handleLogin}>
              {/* Header Badge & Emblem */}
              <div className="police-login-header">
                <div className="gold-user-avatar-glow">
                  <svg
                    width="54"
                    height="54"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f5c542"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="rgba(245, 197, 66, 0.08)" />
                    {/* Officer Cap */}
                    <path d="M7.5 9c0-1.5 2-2.5 4.5-2.5s4.5 1 4.5 2.5v1.5h-9V9z" fill="#f5c542" stroke="none" />
                    <ellipse cx="12" cy="7.2" rx="4" ry="1.2" fill="#f5c542" stroke="none" />
                    {/* Head */}
                    <circle cx="12" cy="12" r="2.2" fill="#f5c542" stroke="none" />
                    {/* Shoulders */}
                    <path d="M8 17.5c.6-1.8 2.2-2.5 4-2.5s3.4.7 4 2.5" fill="none" stroke="#f5c542" strokeWidth="1.6" />
                  </svg>
                </div>

                <h1 className="welcome-heading">Welcome Back!</h1>
                <p className="welcome-sub">
                  Sign in to access your GuardianAI Security Dashboard.
                </p>
              </div>

              {/* ========================= */}
              {/* Select Command Role */}
              {/* ========================= */}
              <div className="role-selector-container">
                <h3 className="role-selector-label">Select Command Role</h3>

                <div className="role-cards-grid">
                  {/* Card 1 – Police Authority */}
                  <div
                    className={`role-card-item ${
                      selectedRole === "police" ? "selected-police" : ""
                    }`}
                    onClick={() => setSelectedRole("police")}
                  >
                    <div className="role-card-radio">
                      <div
                        className={`radio-outer ${
                          selectedRole === "police" ? "active-green" : ""
                        }`}
                      >
                        {selectedRole === "police" && (
                          <div className="radio-inner-green" />
                        )}
                      </div>
                    </div>

                    <div className="role-card-icon-wrap">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                        <polygon
                          points="12 7.5 13.6 10.7 17.1 11.2 14.6 13.7 15.2 17.2 12 15.5 8.8 17.2 9.4 13.7 6.9 11.2 10.4 10.7 12 7.5"
                          fill="#22c55e"
                          stroke="none"
                        />
                      </svg>
                    </div>

                    <h4 className="role-card-title">Police Authority</h4>
                    <p className="role-card-desc">
                      Access real-time alerts, live monitoring, and incident response.
                    </p>
                  </div>

                  {/* Card 2 – Admin System */}
                  <div
                    className={`role-card-item ${
                      selectedRole === "admin" ? "selected-admin" : ""
                    }`}
                    onClick={() => setSelectedRole("admin")}
                  >
                    <div className="role-card-radio">
                      <div
                        className={`radio-outer ${
                          selectedRole === "admin" ? "active-gold" : ""
                        }`}
                      >
                        {selectedRole === "admin" && (
                          <div className="radio-inner-gold" />
                        )}
                      </div>
                    </div>

                    <div className="role-card-icon-wrap">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f5c542"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                        <circle cx="12" cy="9.5" r="2.5" fill="#f5c542" stroke="none" />
                        <path
                          d="M7.8 15.5c.6-1.8 2.3-3 4.2-3s3.6 1.2 4.2 3"
                          stroke="#f5c542"
                          strokeWidth="1.8"
                          fill="none"
                        />
                        <circle
                          cx="17.5"
                          cy="17.5"
                          r="2.2"
                          fill="#0b111e"
                          stroke="#f5c542"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>

                    <h4 className="role-card-title">Admin System</h4>
                    <p className="role-card-desc">
                      Manage system settings, users, and overall operations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Username Field */}
              <div className="input-group">
                <label className="input-label font-gold">Username</label>
                <div className="input-box gold-icon-box">
                  <Mail className="input-icon text-gold" size={20} />
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={loginData.username}
                    onChange={handleChange}
                    className="login-input"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="input-group">
                <label className="input-label font-gold">Password</label>
                <div className="input-box gold-icon-box">
                  <Lock className="input-icon text-gold" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                    className="login-input"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle text-gold"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="forgot-password text-right">
                  <a href="#" className="forgot-link-gold">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button type="submit" className="gold-login-button">
                <Shield size={20} />
                <span>Login</span>
              </button>

              {/* OTP Information Card */}
              <div className="otp-note-banner">
                <Shield size={16} className="text-emerald" />
                <span>
                  OTP verification will be sent after successful login.
                </span>
              </div>

              {/* Divider */}
              <div className="or-divider font-gold">
                <span>OR</span>
              </div>

              {/* Sign Up Button */}
              <div className="signup-section">
                <button
                  type="button"
                  className="create-account-btn"
                  onClick={() => setIsSignup(true)}
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </button>
                <p className="signup-footer-text">
                  New to GuardianAI? Create an account to get started.
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              {/* Icon */}

              <div className="login-icon">
                <UserPlus size={40} />
              </div>

              {/* Heading */}

              <h2 className="login-title">Create Admin Account</h2>

              {/* Subtitle */}

              <p className="login-subtitle">
                Register your GuardianAI administrator account.
              </p>

              {/* ========================= */}
              {/* Full Name */}
              {/* ========================= */}

              <div className="input-group">
                <label className="input-label">Full Name</label>

                <div className="input-box">
                  <Mail className="input-icon" size={20} />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    className="login-input"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {/* ========================= */}
              {/* Username */}
              {/* ========================= */}

              <div className="input-group">
                <label className="input-label">Username</label>

                <div className="input-box">
                  <Mail className="input-icon" size={20} />

                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    className="login-input"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* ========================= */}
              {/* Email */}
              {/* ========================= */}

              <div className="input-group">
                <label className="input-label">Email Address</label>

                <div className="input-box">
                  <Mail className="input-icon" size={20} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="login-input"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* ========================= */}
              {/* Password */}
              {/* ========================= */}

              <div className="input-group">
                <label className="input-label">Password</label>

                <div className="input-box">
                  <Lock className="input-icon" size={20} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="login-input"
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="password-note">
                  Use at least 8 characters with letters and numbers.
                </p>
              </div>

              {/* ========================= */}
              {/* Confirm Password */}
              {/* ========================= */}

              <div className="input-group">
                <label className="input-label">Confirm Password</label>

                <div className="input-box">
                  <Lock className="input-icon" size={20} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className="login-input"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* ========================= */}
              {/* Create Account Button */}
              {/* ========================= */}

              <button type="submit" className="login-button">
                <UserPlus size={20} />
                <span>Create Account</span>
              </button>

              {/* Divider */}

              <div className="or-divider">
                <span>OR</span>
              </div>

              {/* Back to Login */}

              <div className="signup-section">
                <p className="signup-title">Already have an account?</p>

                <button
                  type="button"
                  className="signup-button"
                  onClick={() => setIsSignup(false)}
                >
                  <ArrowLeft size={18} />
                  <span>Back to Login</span>
                </button>
              </div>
            </form>
          )}
          {/* ========================= */}
          {/* Footer */}
          {/* ========================= */}

          <div className="login-footer">
            <div className="footer-brand">
              <Lock size={16} />

              <span>GuardianAI</span>
            </div>

            <p className="footer-text">Protecting what matters most.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
