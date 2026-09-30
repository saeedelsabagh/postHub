import { RefreshRounded } from "@mui/icons-material";
import { Alert, Button, Stack } from "@mui/material";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <Alert severity="error" sx={{ borderRadius: 3 }} action={onRetry ? <Button color="inherit" size="small" startIcon={<RefreshRounded />} onClick={onRetry}>Retry</Button> : null}>
      {message}
    </Alert>
  );
}
