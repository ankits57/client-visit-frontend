import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";

const EditVisit = () => {
  const { visitId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    clientCompany: "",
    description: "",
    startDate: "",
    endDate: "",
    officeLocation: {
      name: "",
      address: "",
      mapUrl: "",
    },
    status: "UPCOMING",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVisit();
  }, [visitId]);

  const fetchVisit = async () => {
    try {
      const response = await api.get(`/visits/${visitId}`);

      const visit = response.data.visit;

      setFormData({
        title: visit.title || "",
        clientCompany: visit.clientCompany || "",
        description: visit.description || "",
        startDate: visit.startDate ? visit.startDate.split("T")[0] : "",
        endDate: visit.endDate ? visit.endDate.split("T")[0] : "",
        officeLocation: {
          name: visit.officeLocation?.name || "",
          address: visit.officeLocation?.address || "",
          mapUrl: visit.officeLocation?.mapUrl || "",
        },
        status: visit.status || "UPCOMING",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load visit");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.patch(`/visits/${visitId}`, formData);

      navigate(`/visits/${visitId}`);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to update visit");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading visit...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={styles.container}>
        <button
          onClick={() => navigate(`/visits/${visitId}`)}
          style={styles.backButton}
        >
          ← Back to Visit
        </button>

        <div style={styles.card}>
          <h2>Edit Visit</h2>

          <p style={styles.subtitle}>Update the client visit details.</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.group}>
              <label>Visit Title</label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.group}>
              <label>Client Company</label>

              <input
                name="clientCompany"
                value={formData.clientCompany}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.group}>
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={styles.textarea}
              />
            </div>

            <div style={styles.row}>
              <div style={styles.group}>
                <label>Start Date</label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.group}>
                <label>End Date</label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.group}>
              <label>Office Name</label>

              <input
                value={formData.officeLocation.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    officeLocation: {
                      ...prev.officeLocation,
                      name: e.target.value,
                    },
                  }))
                }
                style={styles.input}
              />
            </div>

            <div style={styles.group}>
              <label>Office Address</label>

              <input
                value={formData.officeLocation.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    officeLocation: {
                      ...prev.officeLocation,
                      address: e.target.value,
                    },
                  }))
                }
                style={styles.input}
              />
            </div>

            <div style={styles.group}>
              <label>Google Maps URL</label>

              <input
                type="url"
                value={formData.officeLocation.mapUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    officeLocation: {
                      ...prev.officeLocation,
                      mapUrl: e.target.value,
                    },
                  }))
                }
                placeholder="https://maps.google.com/..."
                style={styles.input}
              />
            </div>

            <div style={styles.group}>
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                onClick={() => navigate(`/visits/${visitId}`)}
                style={styles.cancelButton}
              >
                Cancel
              </button>

              <button type="submit" disabled={saving} style={styles.saveButton}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
  },

  backButton: {
    border: "none",
    background: "none",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "14px",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "25px",
  },

  group: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    marginBottom: "18px",
    flex: 1,
  },

  row: {
    display: "flex",
    gap: "20px",
  },

  input: {
    padding: "11px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
  },

  textarea: {
    minHeight: "100px",
    padding: "11px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    resize: "vertical",
    fontFamily: "inherit",
  },

  error: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "25px",
  },

  cancelButton: {
    padding: "11px 18px",
    border: "1px solid #d1d5db",
    background: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },

  saveButton: {
    padding: "11px 18px",
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default EditVisit;
