import React, { useState } from "react";
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import {
  _admin_forgot_password_api,
  _admin_otp_verify_api,
  _admin_confirmation_password_api,
} from "../../DAL/auth/adminAuth";
import {
  EmailStepForm,
  OTPStepForm,
  PasswordResetStepForm,
} from "./PasswordAuthenticationForm";
import { enqueueSnackbar } from "notistack";
import { steps } from "../../utils/constant";

const AuthForm = ({ onBack, onComplete }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    const response = await ({ email });
    if (response.code === 200) {
      enqueueSnackbar(response?.message, { variant: "success" });
      setCurrentStep(2);
      setLoading(false);
    } else {
      const errorMessage =
        response.message || "Failed to send verification code";
      enqueueSnackbar(errorMessage, { variant: "error" });
      setLoading(false);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (otpCode) => {
    setLoading(true);

    const response = await _admin_otp_verify_api({
      email,
      verification_code: otpCode,
    });

    if (response.code === 200) {
      setVerificationCode(otpCode);
      enqueueSnackbar(response?.message, { variant: "success" });
      setCurrentStep(3);
      setLoading(false);
    } else {
      const errorMessage = response.message || "Invalid verification code";
      enqueueSnackbar(errorMessage, { variant: "error" });
      setLoading(false);
    }
  };

  const handleResetPassword = async (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      const errorMessage = "Passwords do not match";
      enqueueSnackbar(errorMessage, { variant: "error" });
      return;
    }
    if (newPassword.length < 6) {
      const errorMessage = "Password must be at least 6 characters";
      enqueueSnackbar(errorMessage, { variant: "error" });
      return;
    }

    setLoading(true);

    const response = await _admin_confirmation_password_api({
      email,
      password: newPassword,
      confirm_password: confirmPassword,
      verification_code: verificationCode,
    });

    if (response.code === 200) {
      enqueueSnackbar(response?.message, { variant: "success" });
      setLoading(false);

      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
        if (onBack) {
          onBack();
        }
      }, 200);
    } else {
      const errorMessage = response.message || "Failed to reset password";
      enqueueSnackbar(errorMessage, { variant: "error" });
      setLoading(false);
    }
    setLoading(false);
  };

  const handleResendOtp = () => {
    setCurrentStep(1);
  };

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      if (onBack) {
        onBack();
      }
    }
  };

  return (
    <>
      <div className="mb-6">
        <button
          type="button"
          onClick={handleBackClick}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#006eb8] dark:hover:text-[#4da3e0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentStep === 1
            ? t.forgotPassword.backToLogin
            : t.forgotPassword.back}
        </button>
      </div>

      <div className="flex items-center justify-center mb-6">
        {steps.map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                step === currentStep
                  ? "bg-[#006eb8] text-white scale-110"
                  : step < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-1 mx-2 transition-colors duration-200 ${
                  step < currentStep
                    ? "bg-green-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {currentStep === 1 && (
        <EmailStepForm
          email={email}
          setEmail={setEmail}
          onSubmit={handleSendEmail}
          isLoading={loading}
          t={t}
        />
      )}
      {currentStep === 2 && (
        <OTPStepForm
          email={email}
          onSubmit={handleVerifyOtp}
          onResend={handleResendOtp}
          isLoading={loading}
          t={t}
        />
      )}
      {currentStep === 3 && (
        <PasswordResetStepForm
          onSubmit={handleResetPassword}
          isLoading={loading}
          t={t}
        />
      )}
    </>
  );
};

export default AuthForm;
