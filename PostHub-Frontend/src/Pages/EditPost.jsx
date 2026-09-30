import { useEffect, useState } from "react";
import { ArrowBack, Save } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../Context/PostContext";
import { useFeedback } from "../Context/FeedbackContext";
import Loading from "../Components/Loading";

export default function EditPost() {
  const { id } = useParams();
  const { getPostById, updatePost } = usePosts();
  const { showFeedback } = useFeedback();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPostById(id).then(setForm).catch((e) => setError(e.response?.data?.message || "Could not load post."));
  }, [id]);

  if (!form && !error) return <Loading label="Loading post..." />;

  async function submit(e) {
    e.preventDefault();
    if (!form.title?.trim() || !form.body?.trim()) { setError("Title and body are required."); return; }
    setSaving(true); setError("");
    try {
      await updatePost(id, { title: form.title.trim(), body: form.body.trim(), img: form.img || "", commentsCount: Number(form.commentsCount || 0) });
      showFeedback("Post updated successfully.");
      navigate(`/posts/${id}`);
    } catch (e) { setError(e.response?.data?.message || "You cannot update this post."); }
    finally { setSaving(false); }
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Button component={Link} to={`/posts/${id}`} startIcon={<ArrowBack />} sx={{ mb: 2 }}>Back to post</Button>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography variant="h4" sx={{ mb: 1 }}>Edit post</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>Keep the information clear and useful.</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {form && <Box component="form" onSubmit={submit}><Stack spacing={2.2}>
            <TextField required label="Title" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <TextField required label="Body" multiline minRows={7} value={form.body || ""} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            <TextField label="Image URL" value={form.img || ""} onChange={(e) => setForm({ ...form, img: e.target.value })} />
            <Button type="submit" variant="contained" size="large" startIcon={<Save />} disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
          </Stack></Box>}
        </CardContent>
      </Card>
    </Container>
  );
}
