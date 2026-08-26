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
    fetchVisits();
  }, []);

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
        <div style={styles.header}>
          <div>
            <h2>Client Visits</h2>
            <p>Manage upcoming client visits.</p>
          </div>

          <button
            style={styles.createButton}
            onClick={() => navigate("/visits/create")}
          >
            + Create Visit
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {visits.length === 0 ? (
          <div style={styles.empty}>
            <h3>No visits yet</h3>
            <p>Create your first client visit.</p>
          </div>
        ) : (
          <div style={styles.list}>
            {visits.map((visit) => (
              <div key={visit._id} style={styles.visitCard}>
                <div>
                  <h3>{visit.title}</h3>

                  <p>{visit.clientCompany}</p>

                  <p>
                    {new Date(visit.startDate).toLocaleDateString()}
                    {" - "}
                    {new Date(visit.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div style={styles.right}>
                  <span style={styles.status}>{visit.status}</span>

                  <button
                    style={styles.viewButton}
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

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  createButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  visitCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "15px",
  },

  status: {
    padding: "5px 10px",
    background: "#e0e7ff",
    borderRadius: "20px",
    fontSize: "12px",
  },

  viewButton: {
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "#2563eb",
    fontWeight: "bold",
  },

  empty: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
  },

  error: {
    color: "red",
  },
};

export default Visits;
