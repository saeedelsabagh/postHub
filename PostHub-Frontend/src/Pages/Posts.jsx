import { useEffect } from "react";
import { Add, Clear, Search } from "@mui/icons-material";
import { Alert, Button, Grid, InputAdornment, Pagination, Stack, TextField, Typography, Box, Paper, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { usePosts } from "../Context/PostContext";
import PostCard from "../Components/PostCard";
import PostSkeleton from "../Components/PostSkeleton";
import EmptyState from "../Components/EmptyState";
import ErrorState from "../Components/ErrorState";
import PageContainer from "../Components/PageContainer";

export default function Posts() {
  const { posts, totalPages, loading, error, search, page, dispatch, getPosts } = usePosts();

  useEffect(() => { getPosts(); }, [page, search]);

  return (
    <PageContainer>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", md: "flex-end" }} gap={3} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h3">Discover posts</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Explore what the PostHub community is sharing.</Typography>
        </Box>
        <Button component={Link} to="/create-post" variant="contained" startIcon={<Add />} sx={{ alignSelf: { xs: "stretch", md: "auto" } }}>
          Create post
        </Button>
      </Stack>

      <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 4, borderRadius: 3 }}>
        <TextField
          fullWidth
          label="Search by title"
          placeholder="Try: modern apartment"
          value={search}
          onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>, endAdornment: search ? <InputAdornment position="end"><Button size="small" startIcon={<Clear />} onClick={() => dispatch({ type: "SET_SEARCH", payload: "" })}>Clear</Button></InputAdornment> : null }}
        />
        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
          <Chip size="small" label={search ? `Searching: ${search}` : "All posts"} />
          <Chip size="small" variant="outlined" label={`${posts.length} on this page`} />
        </Stack>
      </Paper>

      {error && <Box sx={{ mb: 3 }}><ErrorState message={error} onRetry={getPosts} /></Box>}

      {loading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}><PostSkeleton /></Grid>)}
        </Grid>
      ) : posts.length ? (
        <Grid container spacing={3}>
          {posts.map((post) => <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}><PostCard post={post} /></Grid>)}
        </Grid>
      ) : (
        <EmptyState title="No posts found" description={search ? "Try another title or clear the search." : "There are no posts to display yet."} action={search ? () => dispatch({ type: "SET_SEARCH", payload: "" }) : undefined} actionLabel="Clear search" />
      )}

      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 5 }}>
          <Pagination count={totalPages} page={page} onChange={(_, value) => dispatch({ type: "SET_PAGE", payload: value })} color="primary" shape="rounded" />
        </Stack>
      )}
    </PageContainer>
  );
}
