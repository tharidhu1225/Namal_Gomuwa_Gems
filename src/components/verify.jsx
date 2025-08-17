import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import OtpInput from "./otpInputBox";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return setMessage("Enter all 6 digits of the OTP.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/verifyEmail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        setMessage(data.message || "Verification failed.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendCooldown > 0) return;

    try {
      setResendLoading(true);
      setMessage("");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/resendOtp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("OTP resent successfully.");
        setResendCooldown(30); // 30 seconds cooldown
      } else {
        setMessage(data.message || "Failed to resend OTP.");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 md:p-8">
        <div className="text-center">
          <img
            src="/verify3.png"
            width="80"
            alt="Verify"
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            We sent an OTP to{" "}
            <span className="text-yellow-600 font-medium">{email}</span>
          </p>
        </div>

        {message && (
          <p className="text-red-500 text-sm text-center mb-4">{message}</p>
        )}

        <form onSubmit={verifyOTP} className="space-y-6">
          <div className="flex justify-center">
            <OtpInput length={6} onChange={handleOtpChange} />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="warning"
            fullWidth
            disabled={loading}
            className="!capitalize !py-3 !text-white !text-base !rounded-md"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Didn’t receive the code?{" "}
          <button
            onClick={resendOtp}
            disabled={resendLoading || resendCooldown > 0}
            className={`text-yellow-600 font-medium hover:underline cursor-pointer ${
              resendLoading || resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
          </button>
        </div>
      </div>
    </section>
  );
}
