import { createRef, forwardRef } from "react";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { X } from "lucide-react";
import { router } from "./router";
import { AppProvider } from "./hooks/useAppContext";
import { LanguageProvider } from "./hooks/useLanguage";
import ThemeProvider from "./theme/ThemeProvider";

// Defined OUTSIDE App so it never gets recreated on re-render
const notistackRef = createRef();

const NotistackProviderWithRef = forwardRef((props, ref) => (
  <SnackbarProvider ref={ref} {...props} />
));
NotistackProviderWithRef.displayName = "NotistackProviderWithRef";

const onClickDismiss = (key) => () => {
  if (notistackRef.current) {
    notistackRef.current.closeSnackbar(key);
  }
};

function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <ThemeProvider>
          <NotistackProviderWithRef
            ref={notistackRef}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            maxSnack={3}
            autoHideDuration={4000}
            preventDuplicate
            style={{ zIndex: 9999 }}
            action={(key) => (
              <div onClick={onClickDismiss(key)} className="cursor-pointer">
                <X className="w-5 h-5" />
              </div>
            )}
          >
            <RouterProvider router={router} />
          </NotistackProviderWithRef>
        </ThemeProvider>
      </LanguageProvider>
    </AppProvider>
  );
}

export default App;
