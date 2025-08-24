import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateFields = () => {
    const errs = {};
    if (!formFields.name.trim()) errs.name = "Name is required";
    if (!formFields.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formFields.email))
      errs.email = "Enter a valid email";
    if (!formFields.password.trim()) errs.password = "Password is required";
    else if (formFields.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateFields();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formFields),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        navigate("/verify", { state: { email: formFields.email } });
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formFields.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formFields.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <div className="relative">
            <TextField
              fullWidth
              type={isShowPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={formFields.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="!absolute !top-[10px] !right-[10px] !min-w-[35px] !rounded-full !text-gray-700"
            >
              {isShowPassword ? (
                <IoMdEye className="text-xl" />
              ) : (
                <IoMdEyeOff className="text-xl" />
              )}
            </Button>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="!bg-yellow-500 hover:!bg-yellow-600"
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
