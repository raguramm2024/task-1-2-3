import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError(null);

    if (!form.email || !form.password) {
      setLocalError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      await login(form);
      navigate("/dashboard");
    } catch (_err) {
      setLocalError("Unable to login. Please confirm your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Login</h1>
      <p>Sign in to access the protected dashboard.</p>
      {localError && <div className="alert">{localError}</div>}
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
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
            placeholder="Your secure password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <span className="loading-spinner" /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
