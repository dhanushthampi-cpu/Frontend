import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });

    // Correct keys
    const token = response.data.jwt; // match the backend
    const role = response.data.role;

    console.log("Token:", token, "Role:", role); // should now show both

    // Save in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // Redirect based on role
    if (role === "MERCHANT") {
      navigate("/merchant/dashboard");
    } else {
      navigate("/"); // user home page
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    setError("Invalid email or password.");
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
