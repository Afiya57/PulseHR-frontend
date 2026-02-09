import { useState } from "react";
import { useToast } from "./Toast";

const API_URL = "http://localhost:5000/api";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "employee",
    department: "",
    position: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Login successful!");
        onLogin(data.token, data.employee);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch {
      toast.error("Error connecting to server");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, name, department, position, phone, role } =
      formData;

    if (!email || !password || !name || !department || !position || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          department,
          position,
          phone,
          role,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful! Please login.");
        setTimeout(() => setIsLogin(true), 1500);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch {
      toast.error("Error connecting to server");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>PulseHR</h1>
            <p>Streamline your workforce management</p>
          </div>

          <div className="auth-body">
            <div className="tabs">
              <button
                className={`tab ${isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`tab ${!isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            {isLogin ? (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g., IT, HR, Sales"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    placeholder="e.g., Developer, Manager"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
