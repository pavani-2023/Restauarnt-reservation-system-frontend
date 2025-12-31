import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // reuse same styles

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        }
      );

      if (!response.ok) {
        throw new Error("REGISTER_FAILED");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🔁 redirect logic
      if (data.role === "ADMIN") {
        navigate("/", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError("Registration failed. Try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>
        <p>Register to start reserving tables</p>

        <form onSubmit={handleSubmit}>
          <label>
  Name
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
</label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
