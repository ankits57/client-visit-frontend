import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/visits");

        console.log(response.data);

        setVisits(response.data.visits);
      } catch (err) {
        console.error(err);

        setError(err.response?.data?.message || "Failed to load visits");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading visits...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div className="page-intro visits-intro">
          <div>
            <span className="eyebrow">Your workspace</span>
            <h2>Client visits</h2>
            <p>Plan, share, and host every visit from one place.</p>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/visits/create")}
          >
            + Create Visit
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {visits.length === 0 ? (
          <div className="empty-panel">
            <h3>No visits yet</h3>
            <p>Create your first client visit.</p>
          </div>
        ) : (
          <div className="visits-list">
            {visits.map((visit) => (
              <div key={visit._id} className="visit-list-row">
                <div>
                  <span className="eyebrow">{visit.status}</span>
                  <h3>{visit.title}</h3>

                  <p>{visit.clientCompany}</p>

                  <p>
                    {new Date(visit.startDate).toLocaleDateString()}
                    {" - "}
                    {new Date(visit.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="visit-list-actions">
                  <span
                    className={`status-pill status-${visit.status.toLowerCase()}`}
                  >
                    {visit.status}
                  </span>

                  <button
                    className="quiet-button"
                    onClick={() => navigate(`/visits/${visit._id}`)}
                  >
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Visits;
