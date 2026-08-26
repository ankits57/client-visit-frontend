import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";

const VisitDetails = () => {
  const { visitId } = useParams();
  const navigate = useNavigate();

  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAgendaForm, setShowAgendaForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [editingUpdateId, setEditingUpdateId] = useState(null);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [editingPlaceId, setEditingPlaceId] = useState(null);

  const [editPlaceData, setEditPlaceData] = useState({
    name: "",
    category: "",
    address: "",
    distance: "",
    mapUrl: "",
  });

  const [editPlaceLoading, setEditPlaceLoading] = useState(false);

  const [placeData, setPlaceData] = useState({
    name: "",
    category: "",
    address: "",
    distance: "",
    mapUrl: "",
  });

  const [placeLoading, setPlaceLoading] = useState(false);

  const [editUpdateData, setEditUpdateData] = useState({
    title: "",
    message: "",
    type: "INFO",
  });

  const [editUpdateLoading, setEditUpdateLoading] = useState(false);

  const [updateData, setUpdateData] = useState({
    title: "",
    message: "",
    type: "INFO",
  });

  const [updateLoading, setUpdateLoading] = useState(false);

  const [editingAgendaId, setEditingAgendaId] = useState(null);

  const [editAgendaData, setEditAgendaData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [editAgendaLoading, setEditAgendaLoading] = useState(false);

  const [agendaData, setAgendaData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [agendaLoading, setAgendaLoading] = useState(false);
  useEffect(() => {
    fetchVisit();
  }, [visitId]);

  const fetchVisit = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/visits/${visitId}`);

      console.log("Visit:", response.data);

      setVisit(response.data.visit);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to load visit");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVisit = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this visit? This cannot be undone.",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/visits/${visitId}`);

      alert("Visit deleted successfully!");

      navigate("/visits");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to delete visit");
    }
  };

  const generatePublicLink = async () => {
    try {
      const response = await api.post(`/visits/${visitId}/generate-link`);
      setVisit((prev) => ({
        ...prev,
        publicToken: response.data.publicToken,
      }));

      alert("Public link generated successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to generate public link");
    }
  };

  const handleAgendaChange = (e) => {
    setAgendaData({
      ...agendaData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditAgendaChange = (e) => {
    setEditAgendaData({
      ...editAgendaData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateAgenda = async (e) => {
    e.preventDefault();

    try {
      setEditAgendaLoading(true);

      await api.patch(
        `/visits/${visitId}/agenda/${editingAgendaId}`,
        editAgendaData,
      );

      await fetchVisit();

      setEditingAgendaId(null);

      alert("Agenda item updated successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to update agenda item");
    } finally {
      setEditAgendaLoading(false);
    }
  };

  const handleAddAgenda = async (e) => {
    e.preventDefault();

    try {
      setAgendaLoading(true);

      const response = await api.post(`/visits/${visitId}/agenda`, agendaData);

      console.log("Agenda response:", response.data);

      // Refetch visit so we always have latest data
      await fetchVisit();

      setAgendaData({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
      });

      setShowAgendaForm(false);
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to add agenda item");
    } finally {
      setAgendaLoading(false);
    }
  };

  const handleDeleteAgenda = async (agendaId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this agenda item?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/visits/${visitId}/agenda/${agendaId}`);

      // Refresh visit data
      await fetchVisit();

      alert("Agenda item deleted successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to delete agenda item");
    }
  };

  const handleEditAgenda = (item) => {
    setEditingAgendaId(item._id);

    setEditAgendaData({
      title: item.title || "",
      description: item.description || "",
      date: item.date ? new Date(item.date).toISOString().split("T")[0] : "",
      startTime: item.startTime || "",
      endTime: item.endTime || "",
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdateLoading(true);

      await api.post(`/visits/${visitId}/updates`, updateData);

      await fetchVisit();

      setUpdateData({
        title: "",
        message: "",
        type: "INFO",
      });

      setShowUpdateForm(false);

      alert("Update added successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to add update");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteUpdate = async (updateId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this update?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/visits/${visitId}/updates/${updateId}`);

      await fetchVisit();

      alert("Update deleted successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to delete update");
    }
  };
  const handleEditUpdate = (update) => {
    setEditingUpdateId(update._id);

    setEditUpdateData({
      title: update.title || "",
      message: update.message || "",
      type: update.type || "INFO",
    });
  };
  const handleEditUpdateChange = (e) => {
    setEditUpdateData({
      ...editUpdateData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateUpdate = async (e) => {
    e.preventDefault();

    try {
      setEditUpdateLoading(true);

      await api.patch(
        `/visits/${visitId}/updates/${editingUpdateId}`,
        editUpdateData,
      );

      await fetchVisit();

      setEditingUpdateId(null);

      alert("Update updated successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to update");
    } finally {
      setEditUpdateLoading(false);
    }
  };

  const handlePlaceChange = (e) => {
    setPlaceData({
      ...placeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();

    try {
      setPlaceLoading(true);

      await api.post(`/visits/${visitId}/places`, placeData);

      await fetchVisit();

      setPlaceData({
        name: "",
        category: "",
        address: "",
        distance: "",
        mapUrl: "",
      });

      setShowPlaceForm(false);

      alert("Place added successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to add place");
    } finally {
      setPlaceLoading(false);
    }
  };

  const handleDeletePlace = async (placeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this place?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/visits/${visitId}/places/${placeId}`);

      await fetchVisit();

      alert("Place deleted successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to delete place");
    }
  };
  const handleEditPlace = (place) => {
    setEditingPlaceId(place._id);

    setEditPlaceData({
      name: place.name || "",
      category: place.category || "",
      address: place.address || "",
      distance: place.distance || "",
      mapUrl: place.mapUrl || "",
    });
  };

  const handleEditPlaceChange = (e) => {
    setEditPlaceData({
      ...editPlaceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePlace = async (e) => {
    e.preventDefault();

    try {
      setEditPlaceLoading(true);

      await api.patch(
        `/visits/${visitId}/places/${editingPlaceId}`,
        editPlaceData,
      );

      await fetchVisit();

      setEditingPlaceId(null);

      alert("Place updated successfully!");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to update place");
    } finally {
      setEditPlaceLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading visit...</p>
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

  if (!visit) {
    return (
      <DashboardLayout>
        <p>Visit not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="visit-details-page">
        <button onClick={() => navigate("/visits")} style={styles.backButton}>
          ← Back to Visits
        </button>

        <button
          onClick={() => navigate(`/visits/${visitId}/edit`)}
          style={styles.editButton}
        >
          ✏️ Edit Visit
        </button>

        <div style={styles.header}>
          <div>
            <h2>{visit.title}</h2>
            <p>{visit.clientCompany}</p>
            <p>
              📅 {new Date(visit.startDate).toLocaleDateString()}
              {" - "}
              {new Date(visit.endDate).toLocaleDateString()}
            </p>
            {visit.officeLocation && (
              <div>
                <p>📍 {visit.officeLocation.name || "Office location"}</p>

                {visit.officeLocation.address && (
                  <p>{visit.officeLocation.address}</p>
                )}

                {visit.officeLocation.mapUrl && (
                  <a
                    href={visit.officeLocation.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps →
                  </a>
                )}
              </div>
            )}{" "}
          </div>

          <div style={styles.headerActions}>
            <span style={styles.status}>{visit.status}</span>

            <button onClick={handleDeleteVisit} style={styles.deleteButton}>
              🗑 Delete Visit
            </button>
          </div>
        </div>

        {/* Public Link */}

        {/* Public Link */}

        <div style={styles.section}>
          <h3>Client Access Link</h3>

          {visit.publicToken ? (
            <>
              <p>Share this link with the client.</p>

              <div style={styles.linkBox}>
                <input
                  readOnly
                  value={`${import.meta.env.VITE_FRONTEND_URL}/visit/${visit.publicToken}`}
                  style={styles.linkInput}
                />

                <button
                  onClick={() => {
                    const link = `${import.meta.env.VITE_FRONTEND_URL}/visit/${visit.publicToken}`;

                    navigator.clipboard.writeText(link);

                    alert("Link copied!");
                  }}
                >
                  Copy
                </button>
              </div>
            </>
          ) : (
            <>
              <p>No public access link has been generated yet.</p>

              <button
                onClick={generatePublicLink}
                style={styles.generateButton}
              >
                Generate Public Link
              </button>
            </>
          )}
        </div>
        {/* Agenda */}

        {/* Agenda */}

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3>Agenda</h3>

            <button
              onClick={() => setShowAgendaForm(!showAgendaForm)}
              style={styles.addButton}
            >
              {showAgendaForm ? "Cancel" : "+ Add Agenda Item"}
            </button>
          </div>

          {showAgendaForm && (
            <form onSubmit={handleAddAgenda} style={styles.agendaForm}>
              <input
                type="text"
                name="title"
                placeholder="Agenda title"
                value={agendaData.title}
                onChange={handleAgendaChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description (optional)"
                value={agendaData.description}
                onChange={handleAgendaChange}
              />

              {/* NEW DATE FIELD */}
              <div>
                <label>Agenda Date</label>

                <input
                  type="date"
                  name="date"
                  value={agendaData.date}
                  onChange={handleAgendaChange}
                  required
                />
              </div>

              <div style={styles.timeRow}>
                <div>
                  <label>Start Time</label>

                  <input
                    type="time"
                    name="startTime"
                    value={agendaData.startTime}
                    onChange={handleAgendaChange}
                    required
                  />
                </div>

                <div>
                  <label>End Time</label>

                  <input
                    type="time"
                    name="endTime"
                    value={agendaData.endTime}
                    onChange={handleAgendaChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={agendaLoading}
                style={styles.saveButton}
              >
                {agendaLoading ? "Adding..." : "Add Agenda"}
              </button>
            </form>
          )}

          {!visit.agenda || visit.agenda.length === 0 ? (
            <p>No agenda items yet.</p>
          ) : (
            visit.agenda.map((item) => (
              <div key={item._id} style={styles.item}>
                {editingAgendaId === item._id ? (
                  <form onSubmit={handleUpdateAgenda} style={styles.agendaForm}>
                    <input
                      type="text"
                      name="title"
                      placeholder="Agenda title"
                      value={editAgendaData.title}
                      onChange={handleEditAgendaChange}
                      required
                    />

                    <textarea
                      name="description"
                      placeholder="Description"
                      value={editAgendaData.description}
                      onChange={handleEditAgendaChange}
                    />

                    <input
                      type="date"
                      name="date"
                      value={editAgendaData.date}
                      onChange={handleEditAgendaChange}
                      required
                    />

                    <div style={styles.timeRow}>
                      <input
                        type="time"
                        name="startTime"
                        value={editAgendaData.startTime}
                        onChange={handleEditAgendaChange}
                        required
                      />

                      <input
                        type="time"
                        name="endTime"
                        value={editAgendaData.endTime}
                        onChange={handleEditAgendaChange}
                        required
                      />
                    </div>

                    <div style={styles.editActions}>
                      <button
                        type="submit"
                        disabled={editAgendaLoading}
                        style={styles.saveButton}
                      >
                        {editAgendaLoading ? "Saving..." : "Save"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingAgendaId(null)}
                        style={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div style={styles.itemHeader}>
                      <strong>{item.title}</strong>

                      <div style={styles.itemActions}>
                        <button
                          onClick={() => handleEditAgenda(item)}
                          style={styles.editButton}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => handleDeleteAgenda(item._id)}
                          style={styles.deleteSmallButton}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>

                    {item.description && <p>{item.description}</p>}

                    <p>📅 {new Date(item.date).toLocaleDateString()}</p>

                    <p>
                      🕒 {item.startTime} - {item.endTime}
                    </p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        {/* Updates */}

        {/* Updates */}

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3>Live Updates</h3>

            <button
              onClick={() => setShowUpdateForm(!showUpdateForm)}
              style={styles.addButton}
            >
              {showUpdateForm ? "Cancel" : "+ Add Update"}
            </button>
          </div>

          {showUpdateForm && (
            <form onSubmit={handleAddUpdate} style={styles.agendaForm}>
              <input
                type="text"
                name="title"
                placeholder="Update title"
                value={updateData.title}
                onChange={handleUpdateChange}
                required
              />

              <textarea
                name="message"
                placeholder="Update message"
                value={updateData.message}
                onChange={handleUpdateChange}
                required
              />

              <div>
                <label>Update Type</label>

                <select
                  name="type"
                  value={updateData.type}
                  onChange={handleUpdateChange}
                >
                  <option value="INFO">ℹ️ Information</option>
                  <option value="IMPORTANT">⚠️ Important</option>
                  <option value="ALERT">🚨 Alert</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={updateLoading}
                style={styles.saveButton}
              >
                {updateLoading ? "Adding..." : "Post Update"}
              </button>
            </form>
          )}

          {!visit.updates || visit.updates.length === 0 ? (
            <p>No updates yet.</p>
          ) : (
            visit.updates.map((update) => (
              <div key={update._id} style={styles.item}>
                {editingUpdateId === update._id ? (
                  <form onSubmit={handleUpdateUpdate} style={styles.agendaForm}>
                    <input
                      type="text"
                      name="title"
                      placeholder="Update title"
                      value={editUpdateData.title}
                      onChange={handleEditUpdateChange}
                      required
                    />

                    <textarea
                      name="message"
                      placeholder="Update message"
                      value={editUpdateData.message}
                      onChange={handleEditUpdateChange}
                      required
                    />

                    <select
                      name="type"
                      value={editUpdateData.type}
                      onChange={handleEditUpdateChange}
                    >
                      <option value="INFO">ℹ️ Information</option>
                      <option value="IMPORTANT">⚠️ Important</option>
                      <option value="ALERT">🚨 Alert</option>
                    </select>

                    <div style={styles.editActions}>
                      <button
                        type="submit"
                        disabled={editUpdateLoading}
                        style={styles.saveButton}
                      >
                        {editUpdateLoading ? "Saving..." : "Save"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingUpdateId(null)}
                        style={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div style={styles.itemHeader}>
                      <strong>{update.title}</strong>

                      <div style={styles.itemActions}>
                        <button
                          onClick={() => handleEditUpdate(update)}
                          style={styles.editButton}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => handleDeleteUpdate(update._id)}
                          style={styles.deleteSmallButton}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>

                    <p>{update.message}</p>

                    <span style={styles.updateType}>{update.type}</span>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        {/* Places */}

        {/* Places */}

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3>Nearby Places</h3>

            <button
              onClick={() => setShowPlaceForm(!showPlaceForm)}
              style={styles.addButton}
            >
              {showPlaceForm ? "Cancel" : "+ Add Place"}
            </button>
          </div>

          {showPlaceForm && (
            <form onSubmit={handleAddPlace} style={styles.agendaForm}>
              <input
                type="text"
                name="name"
                placeholder="Place name (e.g. Starbucks)"
                value={placeData.name}
                onChange={handlePlaceChange}
                required
              />

              <select
                name="category"
                value={placeData.category}
                onChange={handlePlaceChange}
                required
              >
                <option value="">Select category</option>
                <option value="RESTAURANT">🍽 Restaurant</option>
                <option value="CAFE">☕ Cafe</option>
                <option value="HOTEL">🏨 Hotel</option>
                <option value="TRANSPORT">🚕 Transport</option>
                <option value="SHOPPING">🛍 Shopping</option>
                <option value="OTHER">📍 Other</option>
              </select>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={placeData.address}
                onChange={handlePlaceChange}
                required
              />

              <input
                type="text"
                name="distance"
                placeholder="Distance (e.g. 500m)"
                value={placeData.distance}
                onChange={handlePlaceChange}
              />

              <input
                type="url"
                name="mapUrl"
                placeholder="Google Maps URL"
                value={placeData.mapUrl}
                onChange={handlePlaceChange}
              />

              <button
                type="submit"
                disabled={placeLoading}
                style={styles.saveButton}
              >
                {placeLoading ? "Adding..." : "Add Place"}
              </button>
            </form>
          )}

          {!visit.places || visit.places.length === 0 ? (
            <p>No places added yet.</p>
          ) : (
            visit.places.map((place) => (
              <div key={place._id} style={styles.item}>
                {editingPlaceId === place._id ? (
                  <form onSubmit={handleUpdatePlace} style={styles.agendaForm}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Place name"
                      value={editPlaceData.name}
                      onChange={handleEditPlaceChange}
                      required
                    />

                    <select
                      name="category"
                      value={editPlaceData.category}
                      onChange={handleEditPlaceChange}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="RESTAURANT">🍽 Restaurant</option>
                      <option value="CAFE">☕ Cafe</option>
                      <option value="HOTEL">🏨 Hotel</option>
                      <option value="TRANSPORT">🚕 Transport</option>
                      <option value="SHOPPING">🛍 Shopping</option>
                      <option value="OTHER">📍 Other</option>
                    </select>

                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={editPlaceData.address}
                      onChange={handleEditPlaceChange}
                      required
                    />

                    <input
                      type="text"
                      name="distance"
                      placeholder="Distance"
                      value={editPlaceData.distance}
                      onChange={handleEditPlaceChange}
                    />

                    <input
                      type="url"
                      name="mapUrl"
                      placeholder="Google Maps URL"
                      value={editPlaceData.mapUrl}
                      onChange={handleEditPlaceChange}
                    />

                    <div style={styles.editActions}>
                      <button
                        type="submit"
                        disabled={editPlaceLoading}
                        style={styles.saveButton}
                      >
                        {editPlaceLoading ? "Saving..." : "Save"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingPlaceId(null)}
                        style={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div style={styles.itemHeader}>
                      <strong>{place.name}</strong>

                      <div style={styles.itemActions}>
                        <button
                          onClick={() => handleEditPlace(place)}
                          style={styles.editButton}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => handleDeletePlace(place._id)}
                          style={styles.deleteSmallButton}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>

                    <p>{place.category}</p>

                    <p>{place.address}</p>

                    {place.distance && <p>📏 {place.distance}</p>}

                    {place.mapUrl && (
                      <a href={place.mapUrl} target="_blank" rel="noreferrer">
                        📍 Open in Maps
                      </a>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  backButton: {
    border: "none",
    background: "none",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "14px",
  },

  generateButton: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  header: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },
  editButton: {
    marginLeft: "15px",
    padding: "8px 14px",
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  status: {
    height: "fit-content",
    padding: "6px 12px",
    background: "#e0e7ff",
    borderRadius: "20px",
  },
  headerActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "15px",
  },

  deleteButton: {
    padding: "8px 14px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addButton: {
    padding: "8px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  agendaForm: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "8px",
  },

  timeRow: {
    display: "flex",
    gap: "15px",
  },

  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemActions: {
    display: "flex",
    gap: "8px",
  },

  editButton: {
    padding: "6px 10px",
    background: "#dbeafe",
    color: "#2563eb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  editActions: {
    display: "flex",
    gap: "10px",
  },

  cancelButton: {
    padding: "10px",
    background: "#e5e7eb",
    color: "#374151",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteSmallButton: {
    padding: "6px 10px",
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveButton: {
    padding: "10px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  section: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  updateType: {
    display: "inline-block",
    padding: "4px 8px",
    background: "#f3f4f6",
    borderRadius: "12px",
    fontSize: "12px",
  },
  item: {
    borderBottom: "1px solid #eee",
    padding: "15px 0",
  },

  linkBox: {
    display: "flex",
    gap: "10px",
  },

  linkInput: {
    flex: 1,
    padding: "10px",
  },
};

export default VisitDetails;
