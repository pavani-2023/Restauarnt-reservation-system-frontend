import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "user" | "admin"

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");



  return (
    <nav className="navbar">
      <div className="logo">🍽️ ReserveEase</div>
<div className="nav-actions">
  {/* USER: Reservations */}
  {role === "USER" && (
    <button
      className="nav-link"
      onClick={() => {
        if (!isLoggedIn) {
          navigate("/login", { state: { redirectTo: "/dashboard" } });
        } else {
          navigate("/dashboard");
        }
      }}
    >
      Reservations
    </button>
  )}

  {/* AUTH BUTTON */}
  {isLoggedIn ? (
    <button className="login-btn" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <button
      className="login-btn"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
  )}
</div>


    </nav>
  );
}
