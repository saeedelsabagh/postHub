import { useState } from "react";
import { ChatBubble, ImageNotSupported, OpenInNew } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../API/api";

function getImageUrl(img) {
  if (!img) return "";

  if (img.startsWith("http")) {
    return img;
  }

  return `${api.defaults.baseURL}${img.startsWith("/") ? "" : "/"}${img}`;
}

export default function PostCard({ post }) {
  const [imageError, setImageError] = useState(false);

  const image = getImageUrl(post.img);

  const comments = post.commentsCount ?? post.comments_count ?? 0;

  const userId = post.userId ?? post.user_id;

  return (
    <Card
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform .2s ease, box-shadow .2s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 40px rgba(15,23,42,.11)",
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          height: 210,
          position: "relative",
          overflow: "hidden",
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
              display: "block",
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
            {image ? (
              <ImageNotSupported fontSize="large" />
            ) : (
              <Typography variant="caption">No image</Typography>
            )}
          </Stack>
        )}

        <Chip
          label={`#${post.id}`}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "rgba(255,255,255,.9)",
            fontWeight: 700,
          }}
        />
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            lineHeight: 1.25,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title || "Untitled post"}
        </Typography>

        {/* Body */}
        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 78,
          }}
        >
          {post.body || "No description available."}
        </Typography>

        {/* User + Comments */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            mt: 2,
            color: "text.secondary",
          }}
        >
          <Chip
            size="small"
            variant="outlined"
            label={`User ${userId ?? "—"}`}
          />

          <Stack direction="row" spacing={0.5} alignItems="center">
            <ChatBubble
              sx={{
                fontSize: 17,
              }}
            />

            <Typography variant="caption">{comments}</Typography>
          </Stack>
        </Stack>

        {/* View Post */}
        <Button
          component={Link}
          to={`/posts/${post.id}`}
          variant="contained"
          endIcon={<OpenInNew />}
          sx={{
            mt: 2.5,
            alignSelf: "flex-start",
          }}
        >
          View post
        </Button>
      </CardContent>
    </Card>
  );
}
