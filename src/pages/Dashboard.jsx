import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      setLoading(true);

      const response = await api.get("/visits");

      console.log("Dashboard visits:", response.data);

      setVisits(response.data.visits || []);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const totalVisits = visits.length;

  const upcomingVisits = visits.filter(
    (visit) => visit.status === "UPCOMING",
  ).length;

  const activeVisits = visits.filter(
    (visit) => visit.status === "ACTIVE",
  ).length;

  const completedVisits = visits.filter(
    (visit) => visit.status === "COMPLETED",
  ).length;

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p style={{ color: "red" }}>{error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1>Dashboard</h1>

        <p>Manage your client visits and schedules.</p>

        {/* Stats */}

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Visits</p>
            <h2>{totalVisits}</h2>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Upcoming</p>
            <h2>{upcomingVisits}</h2>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Active</p>
            <h2>{activeVisits}</h2>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Completed</p>
            <h2>{completedVisits}</h2>
          </div>
        </div>

        {/* Recent Visits */}

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Recent Visits</h2>

            <button
              onClick={() => navigate("/visits")}
              style={styles.viewButton}
            >
              View All →
            </button>
          </div>

          {visits.length === 0 ? (
            <p>No visits created yet.</p>
          ) : (
            visits.slice(0, 5).map((visit) => (
              <div
                key={visit._id}
                style={styles.visitCard}
                onClick={() => navigate(`/visits/${visit._id}`)}
              >
                <div>
                  <strong>{visit.title}</strong>

                  <p>{visit.clientCompany}</p>

                  <p style={styles.date}>
                    📅 {new Date(visit.startDate).toLocaleDateString()}
                  </p>
                </div>

                <span style={styles.status}>{visit.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginTop: "30px",
    marginBottom: "30px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  statLabel: {
    color: "#6b7280",
    marginBottom: "8px",
  },

  section: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  viewButton: {
    border: "none",
    background: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px",
  },

  visitCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },

  date: {
    color: "#6b7280",
    fontSize: "14px",
  },

  status: {
    background: "#e0e7ff",
    padding: "6px 10px",
    borderRadius: "15px",
    fontSize: "12px",
  },
};

export default Dashboard;
