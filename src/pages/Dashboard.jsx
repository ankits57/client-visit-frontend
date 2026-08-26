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
    const fetchVisits = async () => {
      try {
        setLoading(true);

        const response = await api.get("/visits");

        console.log("Dashboard visits:", response.data);

        setVisits(response.data.visits || []);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message || "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

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
        <div className="page-intro">
          <span className="eyebrow">Overview</span>
          <h2>Your visit workspace</h2>
          <p>Keep every client experience moving with clarity.</p>
        </div>

        {/* Stats */}

        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <p>Total visits</p>
            <h2>{totalVisits}</h2>
          </div>
          <div className="dashboard-stat stat-lime">
            <p>Upcoming</p>
            <h2>{upcomingVisits}</h2>
          </div>
          <div className="dashboard-stat stat-coral">
            <p>Active now</p>
            <h2>{activeVisits}</h2>
          </div>
          <div className="dashboard-stat">
            <p>Completed</p>
            <h2>{completedVisits}</h2>
          </div>
        </div>

        {/* Recent Visits */}

        <div className="dashboard-panel">
          <div className="panel-heading">
            <h2>Recent Visits</h2>

            <button
              onClick={() => navigate("/visits")}
              className="quiet-button"
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
                className="dashboard-visit-row"
                onClick={() => navigate(`/visits/${visit._id}`)}
              >
                <div>
                  <strong>{visit.title}</strong>

                  <p>{visit.clientCompany}</p>

                  <p className="muted-line">
                    {new Date(visit.startDate).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`status-pill status-${visit.status.toLowerCase()}`}
                >
                  {visit.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
