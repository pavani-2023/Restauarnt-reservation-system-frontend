import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    guests: 1
  });

  // 👉 if user logged in and came from login with intent to book
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && location.state?.openBooking) {
      setShowModal(true);
      // clear state so modal doesn't reopen on refresh
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  const handleBookClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { openBooking: true } });
    } else {
      setShowModal(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🍽️ ReserveEase</div>

        <div className="nav-actions">
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

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Reserve your table <br />
          <span>without the wait</span>
        </h1>

        <p>
          Simple, fast, and reliable restaurant reservations.
          Choose your time, we’ll handle the rest.
        </p>

        <div className="hero-actions">
          <button className="primary-btn" onClick={handleBookClick}>
            Book a Table
          </button>

          {!isLoggedIn && (
            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={() => {
          // backend wiring comes next
          console.log("Booking data:", formData);
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default Home;
