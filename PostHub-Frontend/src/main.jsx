import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import theme from "./theme";
import { AuthProvider } from "./Context/AuthContext";
import { PostProvider } from "./Context/PostContext";
import { FeedbackProvider } from "./Context/FeedbackContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <FeedbackProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </FeedbackProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
