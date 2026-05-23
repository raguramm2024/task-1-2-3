import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register, error } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError(null);

    if (!form.name || !form.email || !form.password) {
      setLocalError("All fields are required.");
      return;
    }

    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await register(form);
      navigate("/dashboard");
    } catch (_err) {
      setLocalError("Unable to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Register</h1>
      <p>Register a new account and get access to protected dashboard routes.</p>
      {localError && <div className="alert">{localError}</div>}
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <span className="loading-spinner" /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
