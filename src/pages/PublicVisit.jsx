import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

import api from "../api/axios";
import { toPng } from "html-to-image";
import "../App.css";

const PublicVisit = () => {
  const { token } = useParams();
  const publicUrl = window.location.href;
  const [showQR, setShowQR] = useState(false);
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const qrRef = useRef(null);

  useEffect(() => {
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

    fetchPublicVisit();
  }, [token]);

  const downloadQRCode = async () => {
    if (!qrRef.current) return;

    try {
      const dataUrl = await toPng(qrRef.current, {
        pixelRatio: 2,
      });

      const link = document.createElement("a");

      link.download = `${visit.title}-QR.png`;

      link.href = dataUrl;

      link.click();
    } catch (err) {
      console.error("Failed to download QR code:", err);

      alert("Failed to download QR code");
    }
  };

  if (loading) {
    return (
      <div className="public-visit-state">
        <div className="loading-mark" />
        <p>Preparing your visit guide...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-visit-state">
        <span className="eyebrow">Visit guide</span>
        <h2>We couldn&apos;t find this visit</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="public-visit-page">
      <div className="public-visit-qr">
        <button
          onClick={() => setShowQR((current) => !current)}
          className="qr-toggle"
        >
          {showQR ? "Hide QR code" : "Show visit QR code"}
        </button>

        {showQR && (
          <div className="qr-container">
            <div ref={qrRef} className="downloadable-qr">
              <span className="qr-kicker">ClientVisit guest guide</span>
              <h3>{visit.title}</h3>
              <div className="qr-box">
                <QRCode value={publicUrl} size={180} />
              </div>
              <p className="qr-text">Scan to open this visit page.</p>
            </div>

            <button onClick={downloadQRCode} className="download-qr-button">
              Download QR code
            </button>
          </div>
        )}
      </div>
      <main className="public-visit-container">
        <header className="visit-hero">
          <div className="hero-topline">
            <span className="brand-mark">FIELD NOTES</span>
            <span className="hero-status">
              <span /> Guest guide
            </span>
          </div>
          <div className="hero-content">
            <span className="eyebrow">Your itinerary</span>
            <h1>{visit.title}</h1>
            <p className="hero-welcome">Welcome, {visit.clientCompany}</p>
            <div className="visit-dates">
              <span>01</span>
              {new Date(visit.startDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              <i />
              <span>02</span>
              {new Date(visit.endDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </header>

        <section className="location-panel">
          <div className="section-icon">+</div>
          <div>
            <span className="eyebrow">Where to go</span>
            <h2>{visit.officeLocation?.name || "Visit location"}</h2>
            <p>
              {visit.officeLocation?.address ||
                "Location details will be shared soon."}
            </p>
          </div>
          {visit.officeLocation?.mapUrl && (
            <a
              className="text-link"
              href={visit.officeLocation.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open map <span>↗</span>
            </a>
          )}
        </section>

        <div className="visit-grid">
          <section className="visit-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">The schedule</span>
                <h2>Agenda</h2>
              </div>
              <span className="section-count">
                {visit.agenda?.length || 0} items
              </span>
            </div>
            {!visit.agenda || visit.agenda.length === 0 ? (
              <div className="empty-state">No agenda has been added yet.</div>
            ) : (
              <div className="agenda-list">
                {visit.agenda.map((item, index) => (
                  <div key={item._id} className="agenda-item">
                    <span className="agenda-index">0{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      {item.description && <p>{item.description}</p>}
                    </div>
                    <div className="agenda-time">
                      <strong>{item.startTime}</strong>
                      <span>
                        {new Date(item.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="side-column">
            <section className="visit-section updates-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Stay current</span>
                  <h2>Live updates</h2>
                </div>
              </div>
              {!visit.updates || visit.updates.length === 0 ? (
                <div className="empty-state">No updates at the moment.</div>
              ) : (
                visit.updates.map((update) => (
                  <div key={update._id} className="update-item">
                    <span className="update-dot" />
                    <div>
                      <span className="badge">{update.type}</span>
                      <h3>{update.title}</h3>
                      <p>{update.message}</p>
                    </div>
                  </div>
                ))
              )}
            </section>

            <section className="visit-section places-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Make yourself at home</span>
                  <h2>Nearby</h2>
                </div>
              </div>
              {!visit.places || visit.places.length === 0 ? (
                <div className="empty-state">No nearby places added yet.</div>
              ) : (
                visit.places.map((place) => (
                  <div key={place._id} className="place-item">
                    <div>
                      <h3>{place.name}</h3>
                      <p>
                        {place.category}{" "}
                        {place.distance && `· ${place.distance}`}
                      </p>
                      <p>{place.address}</p>
                    </div>
                    {place.mapUrl && (
                      <a
                        className="circle-link"
                        href={place.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${place.name} in maps`}
                      >
                        ↗
                      </a>
                    )}
                  </div>
                ))
              )}
            </section>
          </aside>
        </div>
        <footer>
          Prepared for {visit.clientCompany} <span>·</span> Have a wonderful
          visit
        </footer>
      </main>
    </div>
  );
};

export default PublicVisit;
