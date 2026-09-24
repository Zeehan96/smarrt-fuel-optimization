import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, Lock } from "lucide-react";
import Button from "../../../components/common/Button";

const PasswordResetStepForm = ({ onSubmit, isLoading, t }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(newPassword, confirmPassword);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        {t.forgotPassword.resetTitle}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        {t.forgotPassword.resetDescription}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.forgotPassword.newPassword}
            <span className="asterisk-sign"> *</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors outline-none"
              placeholder={t.forgotPassword.newPasswordPlaceholder}
              required
              minLength={6}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showNewPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {t.forgotPassword.minCharacters}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.forgotPassword.confirmPassword}
            <span className="asterisk-sign"> *</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors outline-none"
              placeholder={t.forgotPassword.confirmPasswordPlaceholder}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {newPassword &&
            confirmPassword &&
            newPassword !== confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {t.forgotPassword.passwordsNotMatch}
              </p>
            )}
        </div>

        <Button
          type="submit"
          disabled={
            isLoading ||
            !newPassword ||
            !confirmPassword ||
            newPassword !== confirmPassword ||
            newPassword.length < 6
          }
          className="w-full bg-[#006eb8] hover:bg-[#005a9e] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {t.forgotPassword.resetting}
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              {t.forgotPassword.resetButton}
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default PasswordResetStepForm;
