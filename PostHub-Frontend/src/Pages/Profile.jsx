import { useEffect, useState } from "react";
import { EditOutlined, Save } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useFeedback } from "../Context/FeedbackContext";
import api from "../API/api";
import PostCard from "../Components/PostCard";
import PostSkeleton from "../Components/PostSkeleton";
import EmptyState from "../Components/EmptyState";
import PageContainer from "../Components/PageContainer";

export default function Profile() {
  const { id } = useParams();
  const { user } = useAuth();
  const { showFeedback } = useFeedback();
  const [profile, setProfile] = useState(null), [posts, setPosts] = useState([]), [form, setForm] = useState({ name: "", age: "" }), [error, setError] = useState(""), [loading, setLoading] = useState(true), [saving, setSaving] = useState(false);
  const own = user?.id != null && Number(user.id) === Number(id);

  useEffect(() => {
    setLoading(true); setError("");
    Promise.all([api.get(`/userss/${id}`), api.get(`/users/${id}/posts`)]).then(([a, b]) => { setProfile(a.data); setForm({ name: a.data.name || "", age: a.data.age ?? "" }); setPosts(b.data); }).catch((e) => setError(e.response?.data?.message || "Could not load profile.")).finally(() => setLoading(false));
  }, [id]);

  async function update(e) {
    e.preventDefault();
    if (!form.name.trim()) { setError("Name is required."); return; }
    setSaving(true); setError("");
    try { const r = await api.put(`/userss/${id}`, { name: form.name.trim(), age: Number(form.age) }); setProfile(r.data); showFeedback("Profile updated successfully."); }
    catch (e) { setError(e.response?.data?.message || "You can only update your own profile."); }
    finally { setSaving(false); }
  }

  if (loading) return <LoadingProfile />;
  if (error && !profile) return <PageContainer maxWidth="md"><Alert severity="error">{error}</Alert></PageContainer>;

  return <PageContainer>
    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
    <Card sx={{ borderRadius: 4, mb: 4 }}><CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems={{ xs: "flex-start", sm: "center" }}>
        <Avatar sx={{ width: 76, height: 76, bgcolor: "primary.main", fontSize: 28, fontWeight: 800 }}>{(profile?.name || "U").charAt(0).toUpperCase()}</Avatar>
        <Box><Typography variant="h4">{profile?.name}</Typography><Typography color="text.secondary" sx={{ mt: .5 }}>{profile?.email}</Typography></Box>
      </Stack>
      {own && <><Divider sx={{ my: 3 }} /><Box component="form" onSubmit={update}><Stack direction={{ xs: "column", sm: "row" }} spacing={2}><TextField fullWidth label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><TextField label="Age" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /><Button type="submit" variant="contained" startIcon={<Save />} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></Stack></Box></>}
    </CardContent></Card>
    <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 2 }}><Typography variant="h4">Posts</Typography><Typography color="text.secondary">{posts.length}</Typography></Stack>
    {posts.length ? <Grid container spacing={3}>{posts.map((x) => <Grid key={x.id} size={{ xs: 12, sm: 6, md: 4 }}><PostCard post={x} /></Grid>)}</Grid> : <EmptyState title="No posts yet" description="This profile has not published any posts." />}
  </PageContainer>;
}

function LoadingProfile() { return <Container maxWidth="lg" sx={{ py: 5 }}><Stack spacing={2}><PostSkeleton /><PostSkeleton /></Stack></Container>; }
