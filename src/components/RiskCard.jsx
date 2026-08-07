
import {
  FiShield,
  FiAlertTriangle,
  FiTrendingUp,
  FiTrendingDown,
  
} from "react-icons/fi";

import { FaShieldAlt, FaVideo, FaDoorOpen, FaServer } from "react-icons/fa";

import "../styles/riskcard.css";

const RiskCard = () => {
  return (
    <div className="risk-page">
      {/* ==========================
            PAGE HEADER
      =========================== */}

      <div className="risk-header">
        <div className="risk-title">
          <div className="title-icon">
            <FiShield />
          </div>

          <div>
            <h1>Risk Assessment</h1>
            <p>Analyze and manage security risks</p>
          </div>
        </div>

        <div className="system-status">
          <div className="status-left">
            <span className="status-dot"></span>

            <div>
              <h4>System Active</h4>
              <p>All systems operational</p>
            </div>
          </div>

          <FaShieldAlt className="status-shield" />
        </div>
      </div>

      {/* ==========================
            RISK OVERVIEW
      =========================== */}

      <section className="risk-overview">
        <h3>Risk Overview</h3>

        <div className="overview-grid">
          {/* Circular Score */}

          <div className="risk-score-card">
            <div className="risk-circle">
              <div className="circle-inner">
                <h2>72</h2>

                <span>Overall Risk</span>

                <small>Score</small>
              </div>
            </div>

            <div className="score-details">
              <h4>Risk Level</h4>

              <h2>High</h2>

              <p>Score Range: 60-100</p>

              <button>Requires Attention</button>
            </div>
          </div>

          {/* Stats */}

          <div className="risk-stat critical">
            <FiAlertTriangle />

            <div>
              <span>Critical Risks</span>
              <h2>8</h2>
              <p>Requires immediate action</p>
            </div>
          </div>

          <div className="risk-stat high">
            <FaShieldAlt />

            <div>
              <span>High Risks</span>
              <h2>15</h2>
              <p>High priority attention</p>
            </div>
          </div>

          <div className="risk-stat medium">
            <FiShield />

            <div>
              <span>Medium Risks</span>
              <h2>22</h2>
              <p>Monitor and review</p>
            </div>
          </div>

          <div className="risk-stat low">
            <FiShield />

            <div>
              <span>Low Risks</span>
              <h2>12</h2>
              <p>Under control</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
      SECOND ROW
========================== */}

      <div className="risk-middle-grid">
        {/* Risk Trend */}

        <div className="risk-card trend-card">
          <div className="card-header">
            <h3>Risk Trend</h3>

            <select>
              <option>Last 7 Days</option>
              <option>Last Month</option>
            </select>
          </div>

          <div className="fake-chart">
            <div className="chart-grid"></div>

            <svg viewBox="0 0 400 170" className="line-chart">
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                points="
          20,95
          80,60
          140,75
          200,85
          260,115
          320,100
          380,70"
              />

              <circle cx="20" cy="95" r="5" />
              <circle cx="80" cy="60" r="5" />
              <circle cx="140" cy="75" r="5" />
              <circle cx="200" cy="85" r="5" />
              <circle cx="260" cy="115" r="5" />
              <circle cx="320" cy="100" r="5" />
              <circle cx="380" cy="70" r="5" />
            </svg>

            <div className="chart-labels">
              <span>23 Jul</span>
              <span>24 Jul</span>
              <span>25 Jul</span>
              <span>26 Jul</span>
              <span>27 Jul</span>
              <span>28 Jul</span>
              <span>29 Jul</span>
            </div>
          </div>
        </div>

        {/* Category */}

        <div className="risk-card category-card">
          <h3>Risk by Category</h3>

          <div className="category-content">
            <div className="donut-chart">
              <div className="donut-center">
                <h2>57</h2>
                <span>Total Risks</span>
              </div>
            </div>

            <div className="category-list">
              <div className="category-item">
                <span className="red"></span>
                <p>Access Control</p>
                <strong>18 (31%)</strong>
              </div>

              <div className="category-item">
                <span className="orange"></span>
                <p>Surveillance</p>
                <strong>15 (26%)</strong>
              </div>

              <div className="category-item">
                <span className="yellow"></span>
                <p>Perimeter Security</p>
                <strong>12 (21%)</strong>
              </div>

              <div className="category-item">
                <span className="green"></span>
                <p>System Security</p>
                <strong>7 (12%)</strong>
              </div>

              <div className="category-item">
                <span className="blue"></span>
                <p>Environmental</p>
                <strong>5 (9%)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================
      BOTTOM SECTION
========================== */}

      <div className="risk-bottom-grid">
        {/* Top Risk Areas */}

        <div className="risk-card">
          <h3>Top Risk Areas</h3>

          <div className="risk-table">
            <div className="risk-row">
              <FaDoorOpen className="danger" />

              <div>
                <h4>Main Entrance</h4>
                <p>Access Control</p>
              </div>

              <span className="badge critical">Critical</span>

              <strong>85/100</strong>

              <FiTrendingUp className="danger" />
            </div>

            <div className="risk-row">
              <FaVideo className="orange" />

              <div>
                <h4>Parking Zone B</h4>
                <p>Surveillance</p>
              </div>

              <span className="badge high">High</span>

              <strong>72/100</strong>

              <FiTrendingUp className="orange" />
            </div>

            <div className="risk-row">
              <FaShieldAlt className="yellow" />

              <div>
                <h4>Perimeter Fence</h4>
                <p>Perimeter Security</p>
              </div>

              <span className="badge medium">Medium</span>

              <strong>58/100</strong>

              <FiTrendingDown className="green" />
            </div>

            <div className="risk-row">
              <FaServer className="green" />

              <div>
                <h4>Server Room</h4>
                <p>System Security</p>
              </div>

              <span className="badge low">Low</span>

              <strong>32/100</strong>

              <FiTrendingDown className="green" />
            </div>
          </div>
        </div>

        {/* Recommendations */}

        <div className="risk-card">
          <h3>Recommendations</h3>

          <div className="recommendations">
            <div className="recommendation">
              <FiAlertTriangle className="danger" />

              <div>
                <h4>Strengthen access control protocols</h4>

                <p>Implement biometric authentication</p>
              </div>

              <span className="priority high">High Priority</span>
            </div>

            <div className="recommendation">
              <FaVideo className="orange" />

              <div>
                <h4>Upgrade surveillance coverage</h4>

                <p>Add more cameras in parking zones</p>
              </div>

              <span className="priority high">High Priority</span>
            </div>

            <div className="recommendation">
              <FaShieldAlt className="yellow" />

              <div>
                <h4>Enhance perimeter security</h4>

                <p>Install additional sensors</p>
              </div>

              <span className="priority medium">Medium Priority</span>
            </div>

            <div className="recommendation">
              <FaServer className="green" />

              <div>
                <h4>Update security software</h4>

                <p>Apply latest security patches</p>
              </div>

              <span className="priority low">Low Priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskCard;
