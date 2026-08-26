import "../App.css";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth-page">
      <div className="auth-aside">
        <span className="auth-brand-mark">CV</span>
        <span className="eyebrow">Client operations</span>
        <h1>
          Make the visit
          <br />
          <em>the easy part.</em>
        </h1>
        <p>
          One calm workspace for planning, hosting, and keeping clients in the
          loop.
        </p>
      </div>
      <div className="auth-card">
        <div className="auth-brand-mobile">ClientVisit</div>
        <div className="auth-content">
          <span className="eyebrow">Welcome back</span>
          <h2>{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
