import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only keep one digit

    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Move to next input if value exists
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace and arrow navigation
  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength="1"
          value={digit}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 shadow-sm"
        />
      ))}
    </div>
  );
};

export default OtpInput;
