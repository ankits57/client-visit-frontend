import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";

const CreateVisit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    clientCompany: "",
    startDate: "",
    endDate: "",
    officeLocation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      console.log("Sending:", formData);

      await api.post("/visits", formData);

      navigate("/visits");
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to create visit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={styles.container}>
        <h2>Create Client Visit</h2>

        <p>Set up the details for an upcoming client visit.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label>Visit Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Oracle Bangalore Visit"
              required
            />
          </div>

          <div style={styles.field}>
            <label>Client Company</label>

            <input
              type="text"
              name="clientCompany"
              value={formData.clientCompany}
              onChange={handleChange}
              placeholder="Oracle"
              required
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label>Start Date</label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.field}>
              <label>End Date</label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={styles.field}>
            <label>Office Location</label>

            <input
              type="text"
              name="officeLocation"
              value={formData.officeLocation}
              onChange={handleChange}
              placeholder="Bangalore Office"
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.actions}>
            <button type="button" onClick={() => navigate("/visits")}>
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              style={styles.createButton}
            >
              {loading ? "Creating..." : "Create Visit"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
  },

  form: {
    marginTop: "30px",
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  row: {
    display: "flex",
    gap: "20px",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  createButton: {
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  error: {
    color: "red",
  },
};

export default CreateVisit;
