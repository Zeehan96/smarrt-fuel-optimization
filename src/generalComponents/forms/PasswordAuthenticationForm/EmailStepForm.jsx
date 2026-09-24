import React from "react";
import { Mail, Send } from "lucide-react";
import Button from "../../../components/common/Button";

const EmailStepForm = ({ email, setEmail, onSubmit, isLoading, t }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        {t.forgotPassword.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        {t.forgotPassword.description}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.forgotPassword.emailLabel}{" "}
            <span className="asterisk-sign"> *</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors outline-none"
              placeholder={t.forgotPassword.emailPlaceholder}
              required
              autoFocus
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-[#006eb8] hover:bg-[#005a9e] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {t.forgotPassword.sending}
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {t.forgotPassword.sendCode}
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default EmailStepForm;
