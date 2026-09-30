import { useEffect, useState } from "react";
import {
  ArrowBack,
  ChatBubble,
  Delete,
  EditOutlined,
  ImageNotSupported,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../Context/PostContext";
import { useAuth } from "../Context/AuthContext";
import { useFeedback } from "../Context/FeedbackContext";
import api from "../API/api";
import Loading from "../Components/Loading";

export default function PostDetails() {
  const { id } = useParams();
  const { getPostById, deletePost } = usePosts();
  const { user } = useAuth();
  const { showFeedback } = useFeedback();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [load, setLoad] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoad(true);
    setError("");

    getPostById(id)
      .then(setPost)
      .catch((e) => setError(e.response?.data?.message || "Post not found."))
      .finally(() => setLoad(false));
  }, [id]);

  if (load) {
    return <Loading label="Loading post..." />;
  }

  if (error && !post) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const owner =
    user?.id != null &&
    Number(post?.userId ?? post?.user_id) === Number(user.id);

  const image = post?.img
    ? post.img.startsWith("http")
      ? post.img
      : `${api.defaults.baseURL}${
          post.img.startsWith("/") ? "" : "/"
        }${post.img}`
    : "";

  const comments = post?.commentsCount ?? post?.comments_count ?? 0;

  async function remove() {
    try {
      await deletePost(id);

      showFeedback("Post deleted successfully.");

      navigate("/posts");
    } catch (e) {
      setError(e.response?.data?.message || "You cannot delete this post.");
    } finally {
      setConfirm(false);
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
      {/* Back button */}
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
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        {/* Post Image */}
        <Box
          sx={{
            height: {
              xs: 230,
              md: 360,
            },
            bgcolor: "#eef1f6",
          }}
        >
          {image && !imageError ? (
            <Box
              component="img"
              src={image}
              alt={post.title || "Post image"}
              onError={() => setImageError(true)}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                color: "text.disabled",
              }}
            >
              <ImageNotSupported fontSize="large" />

              <Typography variant="caption" sx={{ mt: 1 }}>
                No image available
              </Typography>
            </Stack>
          )}
        </Box>

        <CardContent
          sx={{
            p: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          {/* User + Comments */}
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mb: 2 }}
          >
            <Chip
              label={`User ${post.userId ?? post.user_id ?? "—"}`}
              size="small"
            />

            <Chip
              icon={<ChatBubble />}
              label={`${comments} comments`}
              size="small"
              variant="outlined"
            />
          </Stack>

          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: 30,
                md: 42,
              },
            }}
          >
            {post.title}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Body */}
          <Typography
            color="text.secondary"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.9,
            }}
          >
            {post.body}
          </Typography>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          {/* Actions */}
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.5}
            sx={{ mt: 4 }}
          >
            {owner && (
              <Button
                component={Link}
                to={`/edit-post/${id}`}
                variant="contained"
                startIcon={<EditOutlined />}
              >
                Edit
              </Button>
            )}

            {owner && (
              <Button
                color="error"
                variant="outlined"
                startIcon={<Delete />}
                onClick={() => setConfirm(true)}
              >
                Delete
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={confirm} onClose={() => setConfirm(false)}>
        <DialogTitle>Delete this post?</DialogTitle>

        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirm(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={remove}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
