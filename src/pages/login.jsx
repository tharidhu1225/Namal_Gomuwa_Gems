import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const forgotPassword = () => {
    if (!formFields.email) {
      return toast.error("Enter your email to receive OTP");
    }
    toast.success("OTP sent to your email.");
    navigate("/verify", { state: { email: formFields.email } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.email || !formFields.password) {
      return toast.error("Please fill all fields.");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        formFields,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ Send cookies (important for auth)
        }
      );

      const data = res.data;

      if (data.success) {
        toast.success("Login successful!");

        // Optional: fetch and store user
        const userRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`,
          { withCredentials: true }
        );

        if (userRes.data.success) {
          localStorage.setItem("user", JSON.stringify(userRes.data.data));
        }

        navigate("/");
        window.location.reload();
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            name="email"
            value={formFields.email}
            onChange={handleChange}
            disabled={loading}
          />

          <div className="relative">
            <TextField
              fullWidth
              type={isShowPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              name="password"
              value={formFields.password}
              onChange={handleChange}
              disabled={loading}
            />
            <Button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="!absolute !top-[10px] !right-[10px] !min-w-[35px] !rounded-full !text-gray-700"
              disabled={loading}
            >
              {isShowPassword ? (
                <IoMdEye className="text-xl" />
              ) : (
                <IoMdEyeOff className="text-xl" />
              )}
            </Button>
          </div>

          <div className="flex justify-end">
            <span
              onClick={forgotPassword}
              className="text-sm text-yellow-600 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="!bg-yellow-500 hover:!bg-yellow-600"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Not Registered?{" "}
            <Link to="/register" className="text-yellow-600 font-medium hover:underline">
              Sign Up
            </Link>
          </div>

          <div className="text-center text-gray-500 mt-3">or continue with</div>

          <Button
            fullWidth
            variant="outlined"
            className="!flex !items-center !justify-center !gap-2"
            onClick={() => toast("Google login not implemented yet.")}
            disabled={loading}
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </Button>
        </form>
      </div>
    </section>
  );
}
