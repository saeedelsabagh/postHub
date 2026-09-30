import { Container } from "@mui/material";

export default function PageContainer({ children, maxWidth = "lg", sx = {} }) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: { xs: 3, md: 5 }, ...sx }}>
      {children}
    </Container>
  );
}
