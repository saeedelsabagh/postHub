import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ label = "Loading..." }) {
  return (
    <Box sx={{ minHeight: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
      <CircularProgress size={30} />
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );
}
