import { createContext, useContext, useMemo, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState({ open: false, message: "", severity: "success" });

  const value = useMemo(() => ({
    showFeedback(message, severity = "success") {
      setFeedback({ open: true, message, severity });
    },
  }), []);

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <Snackbar open={feedback.open} autoHideDuration={3500} onClose={() => setFeedback((v) => ({ ...v, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={feedback.severity} variant="filled" onClose={() => setFeedback((v) => ({ ...v, open: false }))} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  return useContext(FeedbackContext);
}
