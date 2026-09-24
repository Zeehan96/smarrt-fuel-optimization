import { useEffect, useState, useRef } from "react";
import FormModal from "./FormModal";
import Button from "./Button";

const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const WARNING_TIME = 30 * 1000; // 30 seconds before timeout (warning period)

const SessionTimeout = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    Math.ceil(WARNING_TIME / 1000),
  );
  const inactivityTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const activityDebounceRef = useRef(null);
  const countdownValueRef = useRef(30);
  const showWarningRef = useRef(false);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userAdmin");
  };

  // Clear all timers
  const clearAllTimers = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
    if (activityDebounceRef.current) {
      clearTimeout(activityDebounceRef.current);
    }
  };

  // Reset the inactivity timer
  const resetInactivityTimer = () => {
    clearAllTimers();
    if (!isAuthenticated()) return;

    inactivityTimerRef.current = setTimeout(() => {
      handleInactivityLogout();
    }, SESSION_TIMEOUT);

    // Set warning timer (30 seconds before timeout)
    const warningDelay = Math.max(0, SESSION_TIMEOUT - WARNING_TIME);
    warningTimerRef.current = setTimeout(() => {
      if (isAuthenticated()) {
        const initialTime = Math.ceil(WARNING_TIME / 1000);

        // Clear any existing countdown
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }

        // Initialize countdown value and show modal
        countdownValueRef.current = initialTime;
        showWarningRef.current = true;
        setTimeRemaining(initialTime);
        setShowWarning(true);

        // Start countdown interval immediately
        countdownTimerRef.current = setInterval(() => {
          countdownValueRef.current = countdownValueRef.current - 1;
          const newTime = countdownValueRef.current;
          setTimeRemaining(newTime);

          if (newTime <= 0) {
            if (countdownTimerRef.current) {
              clearInterval(countdownTimerRef.current);
              countdownTimerRef.current = null;
            }
            handleInactivityLogout();
          }
        }, 1000);
      }
    }, warningDelay);
  };

  // Handle inactivity logout
  const handleInactivityLogout = () => {
    clearAllTimers();
    setShowWarning(false);
    logout();
    // Redirect to login page
    window.location.href = "/";
  };

  // Handle continue session
  const handleContinueSession = () => {
    showWarningRef.current = false;
    setShowWarning(false);
    setTimeRemaining(Math.ceil(WARNING_TIME / 1000));
    clearAllTimers();
    resetInactivityTimer();
  };

  // Track user activity
  useEffect(() => {
    if (!isAuthenticated()) {
      clearAllTimers();
      setShowWarning(false);
      return;
    }

    const ACTIVITY_EVENTS = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = (event) => {
      // Don't reset if warning is showing (user needs to click Continue Session)
      if (showWarningRef.current) return;

      if (event.type === "mousemove") {
        if (activityDebounceRef.current) {
          clearTimeout(activityDebounceRef.current);
        }
        activityDebounceRef.current = setTimeout(() => {
          resetInactivityTimer();
        }, 1000);
      } else {
        resetInactivityTimer();
      }
    };

    // Add event listeners
    ACTIVITY_EVENTS.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    // Initialize timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      ACTIVITY_EVENTS.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormModal
      isOpen={showWarning}
      onClose={() => {}} // Prevent closing
      title="Session Logout"
      hideCloseButton={true}
      className="bg-white dark:bg-gray-800 w-[96%] sm:w-full sm:max-w-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col"
      footer={
        <Button
          variant="primary"
          onClick={handleContinueSession}
          className="min-w-[160px]"
        >
          Continue Session
        </Button>
      }
    >
      <div className="text-center">
        {/* Icon and Timer Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Animated pulse ring */}
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping"></div>

            {/* Main circle with gradient */}
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-xl bg-gradient-to-br from-red-500 via-red-600 to-red-700">
              {/* Inner glow effect */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-400/30 to-transparent"></div>

              {/* Timer display */}
              <div className="relative text-center z-10">
                <div className="text-6xl font-bold text-white leading-none mb-1 drop-shadow-lg">
                  {timeRemaining}
                </div>
                <div className="text-xs font-medium text-white/90 uppercase tracking-wider">
                  seconds
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Session Expiring Soon
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
          Your session will expire due to inactivity
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Click{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            'Continue Session'
          </span>{" "}
          to stay logged in
        </p>
      </div>
    </FormModal>
  );
};

export default SessionTimeout;
