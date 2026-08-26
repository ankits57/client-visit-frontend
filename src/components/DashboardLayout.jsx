import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Client Visits</h2>

        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>

          <Link to="/visits" style={styles.link}>
            Visits
          </Link>
        </nav>

        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1>Welcome, {user?.name} 👋</h1>

            <p>Manage your client visits and schedules.</p>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f6fa",
  },

  sidebar: {
    width: "240px",
    background: "#1e293b",
    color: "white",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    marginBottom: "40px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "6px",
  },

  logoutButton: {
    marginTop: "auto",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "40px",
  },

  header: {
    marginBottom: "30px",
  },
};

export default DashboardLayout;
