import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>CV</div>
          <span>ClientVisit</span>
        </Link>

        <div style={styles.navActions}>
          <Link to="/login" style={styles.loginLink}>
            Sign In
          </Link>

          <Link to="/register" style={styles.navButton}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>✨ Simplify every client visit</div>

          <h1 style={styles.heroTitle}>
            Make every client visit
            <span style={styles.highlight}> seamless.</span>
          </h1>

          <p style={styles.heroDescription}>
            Plan visits, manage agendas, share live updates, and give your
            clients everything they need in one simple experience.
          </p>

          <div style={styles.heroActions}>
            <Link to="/register" style={styles.primaryButton}>
              Get Started →
            </Link>

            <Link to="/login" style={styles.secondaryButton}>
              Sign In
            </Link>
          </div>

          <div style={styles.trustText}>
            🚀 Simple setup &nbsp; • &nbsp; 🔗 Shareable client links
          </div>
        </div>

        {/* Hero visual */}
        <div style={styles.heroVisual}>
          <div style={styles.dashboardCard}>
            <div style={styles.cardHeader}>
              <div>
                <p style={styles.smallText}>UPCOMING VISIT</p>
                <h3 style={styles.cardTitle}>BFL Client Visit</h3>
              </div>

              <span style={styles.status}>UPCOMING</span>
            </div>

            <div style={styles.infoRow}>
              <span>📅</span>
              <span>August 26 – August 28</span>
            </div>

            <div style={styles.infoRow}>
              <span>👥</span>
              <span>4 Visitors</span>
            </div>

            <div style={styles.infoRow}>
              <span>📍</span>
              <span>Bangalore Office</span>
            </div>

            <div style={styles.divider} />

            <div style={styles.agendaPreview}>
              <p style={styles.smallText}>TODAY'S AGENDA</p>

              <div style={styles.agendaItem}>
                <span style={styles.time}>10:00</span>
                <span>Welcome & Registration</span>
              </div>

              <div style={styles.agendaItem}>
                <span style={styles.time}>11:00</span>
                <span>Product Discussion</span>
              </div>
            </div>
          </div>

          <div style={styles.floatingCard}>
            <span style={styles.greenDot} />
            Client portal is ready
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeading}>
          <p style={styles.sectionLabel}>FEATURES</p>

          <h2>Everything you need for a smooth client visit</h2>

          <p>
            Keep your team organized and your clients informed from start to
            finish.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          <Feature
            icon="📅"
            title="Visit Planning"
            description="Create and manage client visits with dates, schedules and visitor details."
          />

          <Feature
            icon="🗓️"
            title="Smart Agenda"
            description="Build a clear agenda so everyone knows exactly what is happening."
          />

          <Feature
            icon="📢"
            title="Live Updates"
            description="Share important updates with clients instantly during their visit."
          />

          <Feature
            icon="📍"
            title="Nearby Places"
            description="Help visitors discover restaurants, hotels and useful places nearby."
          />

          <Feature
            icon="🔗"
            title="Shareable Client Portal"
            description="Give clients a simple secure link to access their visit information."
          />

          <Feature
            icon="👥"
            title="Visitor Management"
            description="Keep track of visitors and make every visit feel organized."
          />
        </div>
      </section>

      {/* How it works */}
      <section style={styles.howSection}>
        <div style={styles.sectionHeading}>
          <p style={styles.sectionLabel}>HOW IT WORKS</p>

          <h2>From planning to welcoming in three steps</h2>
        </div>

        <div style={styles.steps}>
          <Step
            number="01"
            title="Create a Visit"
            description="Add client details, dates, agenda and useful information."
          />

          <Step
            number="02"
            title="Generate Client Link"
            description="Create a secure link that gives your client access to their visit portal."
          />

          <Step
            number="03"
            title="Keep Everyone Updated"
            description="Share updates and information throughout the visit."
          />
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2>Ready to make client visits easier?</h2>

        <p>Start organizing better client experiences today.</p>

        <Link to="/register" style={styles.ctaButton}>
          Get Started →
        </Link>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>
          <div style={styles.logoIcon}>CV</div>
          ClientVisit
        </div>

        <p>© 2026 ClientVisit. Built to make visits smoother.</p>
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, description }) => {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureIcon}>{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
};

const Step = ({ number, title, description }) => {
  return (
    <div style={styles.step}>
      <div style={styles.stepNumber}>{number}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#1f2937",
    background: "#ffffff",
  },

  navbar: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "700",
    fontSize: "20px",
    color: "#111827",
    textDecoration: "none",
  },

  logoIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
  },

  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  loginLink: {
    textDecoration: "none",
    color: "#374151",
    fontWeight: "500",
  },

  navButton: {
    textDecoration: "none",
    background: "#2563eb",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "600",
  },

  hero: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 30px 100px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "70px",
    alignItems: "center",
  },

  heroContent: {
    maxWidth: "560px",
  },

  badge: {
    display: "inline-block",
    background: "#eff6ff",
    color: "#2563eb",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "25px",
  },

  heroTitle: {
    fontSize: "58px",
    lineHeight: "1.08",
    letterSpacing: "-2px",
    margin: "0 0 25px",
    color: "#111827",
  },

  highlight: {
    color: "#2563eb",
  },

  heroDescription: {
    fontSize: "19px",
    lineHeight: "1.7",
    color: "#6b7280",
    marginBottom: "30px",
  },

  heroActions: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
  },

  primaryButton: {
    background: "#2563eb",
    color: "white",
    textDecoration: "none",
    padding: "14px 22px",
    borderRadius: "9px",
    fontWeight: "600",
  },

  secondaryButton: {
    border: "1px solid #d1d5db",
    color: "#374151",
    textDecoration: "none",
    padding: "14px 22px",
    borderRadius: "9px",
    fontWeight: "600",
  },

  trustText: {
    fontSize: "14px",
    color: "#6b7280",
  },

  heroVisual: {
    position: "relative",
  },

  dashboardCard: {
    background: "white",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 20px 60px rgba(37, 99, 235, 0.15)",
    border: "1px solid #eef2ff",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "25px",
  },

  smallText: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "1px",
    margin: "0 0 6px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "21px",
  },

  status: {
    height: "fit-content",
    background: "#dcfce7",
    color: "#16a34a",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
  },

  infoRow: {
    display: "flex",
    gap: "12px",
    padding: "10px 0",
    color: "#4b5563",
  },

  divider: {
    borderTop: "1px solid #e5e7eb",
    margin: "20px 0",
  },

  agendaPreview: {},

  agendaItem: {
    display: "flex",
    gap: "20px",
    padding: "10px 0",
    fontSize: "14px",
  },

  time: {
    color: "#2563eb",
    fontWeight: "700",
    minWidth: "45px",
  },

  floatingCard: {
    position: "absolute",
    right: "-20px",
    bottom: "-25px",
    background: "white",
    padding: "14px 18px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontSize: "14px",
    fontWeight: "600",
  },

  greenDot: {
    width: "9px",
    height: "9px",
    background: "#22c55e",
    display: "inline-block",
    borderRadius: "50%",
    marginRight: "8px",
  },

  featuresSection: {
    background: "#f8fafc",
    padding: "100px 30px",
  },

  sectionHeading: {
    textAlign: "center",
    maxWidth: "650px",
    margin: "0 auto 55px",
  },

  sectionLabel: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "1.5px",
  },

  featuresGrid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },

  featureCard: {
    background: "white",
    padding: "28px",
    borderRadius: "14px",
    border: "1px solid #eef2f7",
  },

  featureIcon: {
    fontSize: "28px",
    marginBottom: "15px",
  },

  howSection: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "100px 30px",
  },

  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "60px",
  },

  stepNumber: {
    color: "#2563eb",
    fontWeight: "800",
    fontSize: "14px",
    marginBottom: "15px",
  },

  cta: {
    maxWidth: "1100px",
    margin: "20px auto 80px",
    padding: "70px 30px",
    textAlign: "center",
    borderRadius: "20px",
    background: "#2563eb",
    color: "white",
  },

  ctaButton: {
    display: "inline-block",
    marginTop: "15px",
    padding: "14px 22px",
    background: "white",
    color: "#2563eb",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "700",
  },

  footer: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "30px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#6b7280",
    fontSize: "14px",
  },

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "700",
    color: "#111827",
  },
};

export default Home;
