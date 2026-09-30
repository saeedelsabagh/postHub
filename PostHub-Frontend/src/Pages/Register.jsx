import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  ArrowForward,
  Lock,
  Mail,
  Person,
} from "@mui/icons-material";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import api from "../API/api";
import { useFeedback } from "../Context/FeedbackContext";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { showFeedback } = useFeedback();

  const update = (name) => (e) =>
    setForm((v) => ({ ...v, [name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.age
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await api.post("/users", {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        age: Number(form.age),
      });

      showFeedback("Account created. You can sign in now.");
      navigate("/login");
    } catch (e) {
      setError(e.response?.data?.message || "Could not create account.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 7 } }}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 5 } }}>
          <Stack alignItems="center" textAlign="center" sx={{ mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 52,
                height: 52,
                mb: 1.5,
              }}
            >
              <Person />
            </Avatar>

            <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 38 } }}>
              Create account
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Join the PostHub community.
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={submit}>
            <Stack spacing={2}>
              <TextField
                required
                name="name"
                label="Full name"
                value={form.name}
                onChange={update("name")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                name="age"
                label="Age"
                type="number"
                inputProps={{ min: 1 }}
                value={form.age}
                onChange={update("age")}
              />

              <TextField
                required
                name="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                name="password"
                label="Password"
                type="password"
                helperText="At least 6 characters"
                value={form.password}
                onChange={update("password")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                endIcon={<ArrowForward />}
                disabled={saving}
              >
                {saving ? "Creating..." : "Create account"}
              </Button>
            </Stack>
          </Box>

          <Typography textAlign="center" sx={{ mt: 3 }} color="text.secondary">
            Already have an account?{" "}
            <Button component={Link} to="/login" size="small">
              Sign in
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
