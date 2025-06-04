import axios from "axios";
import React, { useContext, useState } from "react";
import { FaLock, FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const {setUser} = useUser()

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      credentials
    );
    setUser(response.data)
    if (response.data.message == "success") {
      navigate("/dashboard");
    }
  }; 
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-blue-300 opacity-20 rounded-full -z-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 opacity-20 rounded-full -z-10 blur-3xl" />

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <FaWallet className="text-4xl text-blue-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Login to your payment account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. user123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign up
          </span>
        </div>

        <div className="flex justify-center mt-4 text-blue-500 text-xs">
          <FaLock className="mr-1" />
          <span>Secure login powered by PaymentSecure™</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
