import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../../components/common/Button";

const LoginForm = ({ onSubmit, isLoading = false, onForgotPassword }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        {t.login.welcomeBack}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        {t.login.signInDescription}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.login.emailLabel} <span className="asterisk-sign">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors outline-none"
              placeholder={t.login.emailPlaceholder}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.login.passwordLabel} <span className="asterisk-sign">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors outline-none"
              placeholder={t.login.passwordPlaceholder}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="text-right mt-1">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-[#006eb8] dark:text-[#4da3e0] hover:underline font-medium"
            >
              {t.login.forgotPassword}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !email || !password}
          className="w-full bg-[#006eb8] hover:bg-[#005a9e] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {t.login.signingIn}
            </>
          ) : (
            t.login.signInButton
          )}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
