import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard">Auth Module</Link>
        <div className="nav-links">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button className="nav-button logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-button" to="/login">
                Login
              </Link>
              <Link className="nav-button" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
