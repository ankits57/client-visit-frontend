import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";

const PublicVisit = () => {
  const { token } = useParams();

  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublicVisit();
  }, [token]);

  const fetchPublicVisit = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/visits/public/${token}`);

      setVisit(response.data.visit);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to load visit information",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.center}>Loading visit information...</div>;
  }

  if (error) {
    return (
      <div style={styles.center}>
        <h2>Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}

      <div style={styles.hero}>
        <h1>{visit.title}</h1>

        <p style={styles.company}>Welcome, {visit.clientCompany} 👋</p>

        <p>
          📅 {new Date(visit.startDate).toLocaleDateString()} -{" "}
          {new Date(visit.endDate).toLocaleDateString()}
        </p>
      </div>

      {/* Agenda */}

      <section style={styles.section}>
        <h2>📅 Agenda</h2>

        {!visit.agenda || visit.agenda.length === 0 ? (
          <p>No agenda has been added yet.</p>
        ) : (
          visit.agenda.map((item) => (
            <div key={item._id} style={styles.card}>
              <h3>{item.title}</h3>

              {item.description && <p>{item.description}</p>}

              <p>📅 {new Date(item.date).toLocaleDateString()}</p>

              <p>
                🕒 {item.startTime} - {item.endTime}
              </p>
            </div>
          ))
        )}
      </section>

      {/* Live Updates */}

      <section style={styles.section}>
        <h2>📢 Live Updates</h2>

        {!visit.updates || visit.updates.length === 0 ? (
          <p>No updates at the moment.</p>
        ) : (
          visit.updates.map((update) => (
            <div key={update._id} style={styles.card}>
              <h3>{update.title}</h3>

              <p>{update.message}</p>

              <span style={styles.badge}>{update.type}</span>
            </div>
          ))
        )}
      </section>

      {/* Nearby Places */}

      <section style={styles.section}>
        <h2>📍 Nearby Places</h2>

        {!visit.places || visit.places.length === 0 ? (
          <p>No nearby places added yet.</p>
        ) : (
          visit.places.map((place) => (
            <div key={place._id} style={styles.card}>
              <h3>{place.name}</h3>

              <p>{place.category}</p>

              <p>{place.address}</p>

              {place.distance && <p>📏 {place.distance}</p>}

              {place.mapUrl && (
                <a href={place.mapUrl} target="_blank" rel="noreferrer">
                  📍 Open in Maps
                </a>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  hero: {
    background: "#2563eb",
    color: "white",
    padding: "35px",
    borderRadius: "15px",
    marginBottom: "25px",
  },

  company: {
    fontSize: "20px",
  },

  section: {
    marginBottom: "30px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  badge: {
    display: "inline-block",
    padding: "5px 10px",
    background: "#e5e7eb",
    borderRadius: "15px",
    fontSize: "12px",
  },
};

export default PublicVisit;
