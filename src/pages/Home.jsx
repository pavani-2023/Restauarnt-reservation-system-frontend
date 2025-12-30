import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import "../App.css";

import Navbar from "../components/Navbar";

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

  
  
  const role = localStorage.getItem("role"); // "user" | "admin"


  return (
    <div className="home-container">
      {/* Navbar */}
    <Navbar/>

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

        {/* <div className="hero-actions">
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
        </div> */}
          <div className="hero-actions">
          {/* USER CTA */}
          {role !== "ADMIN" && (
            <>
              <button className="primary-btn" onClick={handleBookClick}>
                Book a Table
              </button>


            </>
          )}

          {/* ADMIN CTA */}
          {role === "ADMIN" && (
            <>
              <button
                className="primary-btn"
                onClick={() => navigate("/admin/tables")}
              >
                Manage Tables
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/admin/reservation-list")}
              >
                Manage Reservations
              </button>
              <button className="primary-btn" onClick={()=>navigate("/add-admin")}>
                Add users
              </button>
            </>
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
