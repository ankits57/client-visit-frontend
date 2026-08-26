const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.logo}>CV</div>

          <h1>Client Visit</h1>

          <p>Make every client visit organized and seamless.</p>
        </div>

        <div style={styles.content}>
          <h2>{title}</h2>

          <p style={styles.subtitle}>{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background: "#f4f6f8",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    borderRadius: "16px",
    padding: "35px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  brand: {
    textAlign: "center",
    marginBottom: "35px",
  },

  logo: {
    width: "55px",
    height: "55px",
    borderRadius: "14px",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
    fontWeight: "bold",
    fontSize: "20px",
  },

  content: {},

  subtitle: {
    color: "#6b7280",
    marginBottom: "25px",
  },
};

export default AuthLayout;
