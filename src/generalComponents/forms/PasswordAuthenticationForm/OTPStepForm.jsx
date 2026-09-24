import React, { useState } from "react";
import { Key } from "lucide-react";
import Button from "../../../components/common/Button";

const OTPStepForm = ({ email, onSubmit, onResend, isLoading, t }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (onSubmit && otpValue.length === 6) {
      onSubmit(otpValue);
    }
  };

  const handleResendClick = () => {
    setOtp(["", "", "", "", "", ""]);
    if (onResend) {
      onResend();
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        {t.forgotPassword.otpTitle}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        {t.forgotPassword.otpDescription} <br />
        <span className="font-medium text-[#006eb8] dark:text-[#4da3e0]">
          {email}
        </span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
            {t.forgotPassword.verificationCode}
            <span className="asterisk-sign"> *</span>
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:text-white transition-all outline-none"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleResendClick}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#006eb8] dark:hover:text-[#4da3e0] mt-3 text-center w-full"
          >
            {t.forgotPassword.didntReceive}
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading || otp.join("").length < 6}
          className="w-full bg-[#006eb8] hover:bg-[#005a9e] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {t.forgotPassword.verifying}
            </>
          ) : (
            <>
              <Key className="w-4 h-4 mr-2" />
              {t.forgotPassword.verifyCode}
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default OTPStepForm;
