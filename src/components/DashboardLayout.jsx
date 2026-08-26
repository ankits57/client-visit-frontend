import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link to="/dashboard" className="dashboard-brand">
          <span className="dashboard-brand-mark">CV</span>
          <span>ClientVisit</span>
        </Link>

        <nav className="dashboard-nav">
          <Link to="/dashboard" className="dashboard-nav-link">
            Overview
          </Link>
          <Link to="/visits" className="dashboard-nav-link">
            All visits
          </Link>
        </nav>

        <div className="dashboard-sidebar-footer">
          <span className="dashboard-sidebar-label">Workspace</span>
          <button onClick={handleLogout} className="dashboard-logout">
            Sign out <span>↗</span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-kicker">Client operations</span>
            <h1>Good to see you, {user?.name}</h1>
            <p>Everything for your next client visit, in one place.</p>
          </div>
          <div className="dashboard-user">
            <span>{user?.name?.charAt(0) || "U"}</span>
            <div>
              <strong>{user?.name}</strong>
              <small>Workspace owner</small>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
