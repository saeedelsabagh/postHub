import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Alert, Button, Grid, Stack, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { usePosts } from "../Context/PostContext";
import PostCard from "../Components/PostCard";
import PostSkeleton from "../Components/PostSkeleton";
import EmptyState from "../Components/EmptyState";
import PageContainer from "../Components/PageContainer";

export default function MyPosts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getPostsByUser } = usePosts();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true); setError("");
    getPostsByUser(user.id).then(setPosts).catch((e) => setError(e.response?.data?.message || "Could not load your posts.")).finally(() => setLoading(false));
  }, [user?.id]);

  return (
    <PageContainer>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} gap={2} sx={{ mb: 4 }}>
        <Box><Typography variant="h3">My posts</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Manage the posts you have published.</Typography></Box>
        <Button component={Link} to="/create-post" variant="contained" startIcon={<Add />}>Create post</Button>
      </Stack>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {loading ? <Grid container spacing={3}>{Array.from({ length: 3 }).map((_, i) => <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}><PostSkeleton /></Grid>)}</Grid> : posts.length ? <Grid container spacing={3}>{posts.map((p) => <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}><PostCard post={p} /></Grid>)}</Grid> : <EmptyState title="You have no posts yet" description="Create your first post and it will appear here." action={() => navigate("/create-post")} actionLabel="Create a post" />}
    </PageContainer>
  );
}
