import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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

  const handleChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const forgotPassword = () => {
    toast.success("Redirecting to email verification...");
    navigate("/verify");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.email || !formFields.password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        formFields,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = res.data;

      if (data.success) {
        toast.success(data.message || "Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_role", data.user.role);

        navigate("/");
        window.location.reload();
      } else {
        toast.error(data.message || "Login failed.");
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error.");
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md relative">

        {/* LOADING SCREEN */}
        {loading ? (
          <div className="bg-white shadow-xl rounded-xl p-12 flex flex-col items-center justify-center animate-fade-in">
            <CircularProgress size={55} thickness={4} />
            <p className="mt-5 text-gray-700 font-medium text-lg">
              Logging you in…
            </p>
          </div>
        ) : (
          /* LOGIN FORM */
          <div className="bg-white shadow-2xl rounded-xl p-8 animate-fade-in">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
              Login to Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                variant="outlined"
                value={formFields.email}
                onChange={handleChange}
              />

              <div className="relative">
                <TextField
                  fullWidth
                  type={isShowPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  variant="outlined"
                  value={formFields.password}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="!absolute !top-[10px] !right-[10px] !min-w-[35px] !rounded-full"
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
                  className="text-sm text-blue-600 cursor-pointer hover:underline"
                >
                  Forgot Password?
                </span>
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="!bg-blue-600 hover:!bg-blue-700 !py-2 !text-lg"
              >
                Login
              </Button>

              <div className="text-center text-sm text-gray-600">
                Not registered yet?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </div>

              <div className="text-center text-gray-500 mt-3">or continue with</div>

              <Button
                fullWidth
                variant="outlined"
                className="!flex !items-center !justify-center !gap-2 hover:!bg-gray-100"
                onClick={() => toast("Google login coming soon!")}
              >
                <FcGoogle className="text-xl" />
                Login with Google
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
