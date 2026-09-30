import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#111827" },
    secondary: { main: "#4f46e5" },
    background: { default: "#f6f7fb", paper: "#ffffff" },
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.04em" },
    h2: { fontWeight: 800, letterSpacing: "-0.035em" },
    h3: { fontWeight: 800, letterSpacing: "-0.03em" },
    h4: { fontWeight: 800, letterSpacing: "-0.025em" },
    h5: { fontWeight: 750 },
    h6: { fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, textTransform: "none", fontWeight: 700, paddingInline: 18 },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiCard: {
      styleOverrides: {
        root: { border: "1px solid rgba(15,23,42,0.07)", boxShadow: "0 10px 30px rgba(15,23,42,0.06)" },
      },
    },
  },
});

export default theme;
