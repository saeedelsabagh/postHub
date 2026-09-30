import { SearchOff } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export default function EmptyState({ title = "Nothing here yet", description = "There is nothing to show right now.", action, actionLabel }) {
  return (
    <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
      <SearchOff sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
      <Typography variant="h6" fontWeight={800}>{title}</Typography>
      <Typography color="text.secondary" sx={{ mt: 0.75, mb: action ? 2 : 0 }}>{description}</Typography>
      {action && actionLabel && <Button onClick={action} variant="outlined">{actionLabel}</Button>}
    </Box>
  );
}
