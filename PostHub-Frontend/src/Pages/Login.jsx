import { useState } from "react";

import {
  ArrowForward,
  LockOutlined,
  Mail,
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

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");

  const { login, loading, error } = useAuth();

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    setValidation("");

    if (!email.trim() || !password) {
      setValidation(
        "Email and password are required."
      );
      return;
    }

    const success = await login(
      email.trim(),
      password
    );

    if (success) {
      navigate("/posts");
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: {
          xs: 4,
          md: 9,
        },
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2.5,
              md: 5,
            },
          }}
        >
          {/* Header */}
          <Stack
            alignItems="center"
            textAlign="center"
            sx={{ mb: 3 }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 52,
                height: 52,
                mb: 1.5,
              }}
            >
              <LockOutlined />
            </Avatar>

            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: 30,
                  md: 38,
                },
              }}
            >
              Welcome back
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Sign in to continue to PostHub.
            </Typography>
          </Stack>

          {/* Error */}
          {(error || validation) && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {validation || error}
            </Alert>
          )}

          {/* Form */}
          <Box
            component="form"
            onSubmit={submit}
          >
            <Stack spacing={2}>
              {/* Email */}
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password */}
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Login button */}
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                endIcon={<ArrowForward />}
                disabled={loading}
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}
              </Button>
            </Stack>
          </Box>

          {/* Register */}
          <Typography
            textAlign="center"
            sx={{ mt: 3 }}
            color="text.secondary"
          >
            Don't have an account?

            <Button
              component={Link}
              to="/register"
              size="small"
            >
              Create one
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}