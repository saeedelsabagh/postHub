import { useEffect, useRef, useState } from "react";

import {
  ArrowBack,
  ImageOutlined,
  Send,
  Close,
} from "@mui/icons-material";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { usePosts } from "../Context/PostContext";
import { useFeedback } from "../Context/FeedbackContext";

export default function CreatePost() {
  const { createPost } = usePosts();
  const { showFeedback } = useFeedback();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (name) => (e) => {
    setForm((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  // Create image preview
  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const objectUrl =
      URL.createObjectURL(image);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  function chooseImage(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError(
        "Please select an image file."
      );

      e.target.value = "";
      return;
    }

    // 5 MB maximum
    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image size must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    setImage(file);
  }

  function removeImage() {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function submit(e) {
    e.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!form.body.trim()) {
      setError("Body is required.");
      return;
    }

    if (!image) {
      setError("Please select an image.");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "body",
        form.body.trim()
      );

      formData.append(
        "commentsCount",
        "0"
      );

      formData.append(
        "image",
        image
      );

      await createPost(formData);

      showFeedback(
        "Post created successfully."
      );

      navigate("/posts");
    } catch (e) {
      setError(
        e.response?.data?.message ||
          e.response?.data?.error ||
          "Could not create post."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      {/* Back */}
      <Button
        component={Link}
        to="/posts"
        startIcon={<ArrowBack />}
        sx={{ mb: 2 }}
      >
        Back to posts
      </Button>

      <Card
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          {/* Header */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <ImageOutlined color="primary" />

            <Typography variant="h4">
              Create a post
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Share something useful with the
            PostHub community.
          </Typography>

          {/* Error */}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={submit}
          >
            <Stack spacing={2.2}>
              {/* Title */}
              <TextField
                required
                fullWidth
                label="Title"
                value={form.title}
                onChange={update("title")}
                inputProps={{
                  maxLength: 120,
                }}
              />

              {/* Body */}
              <TextField
                required
                fullWidth
                label="Body"
                multiline
                minRows={7}
                value={form.body}
                onChange={update("body")}
              />

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={chooseImage}
              />

              {/* Choose image */}
              <Button
                variant="outlined"
                size="large"
                startIcon={<ImageOutlined />}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={saving}
              >
                Choose Image
              </Button>

              {/* Preview */}
              {preview && (
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor:
                      "divider",
                  }}
                >
                  <Box
                    component="img"
                    src={preview}
                    alt="Selected"
                    sx={{
                      width: "100%",
                      maxHeight: 350,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    startIcon={<Close />}
                    onClick={removeImage}
                    disabled={saving}
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              )}

              {/* File name */}
              {image && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Selected: {image.name}
                </Typography>
              )}

              {/* Publish */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Send />}
                disabled={saving}
              >
                {saving
                  ? "Publishing..."
                  : "Publish post"}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}