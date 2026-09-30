import { useEffect, useState } from "react";
import { Delete, People } from "@mui/icons-material";
import { Alert, Avatar, Button, Card, CardContent, Container, Dialog, DialogActions, Box, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import api from "../API/api";
import { useFeedback } from "../Context/FeedbackContext";
import Loading from "../Components/Loading";
import EmptyState from "../Components/EmptyState";

export default function Admin() {
  const [users, setUsers] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(""), [selected, setSelected] = useState(null), [deleting, setDeleting] = useState(false);
  const { showFeedback } = useFeedback();
  const load = () => { setLoading(true); setError(""); api.get("/userss").then((r) => setUsers(r.data)).catch((e) => setError(e.response?.data?.message || "Could not load admin data.")).finally(() => setLoading(false)); };
  useEffect(load, []);
  async function del() { if (!selected) return; setDeleting(true); try { await api.delete(`/userss/${selected.id}`); setUsers((v) => v.filter((x) => x.id !== selected.id)); showFeedback("User deleted successfully."); setSelected(null); } catch (e) { setError(e.response?.data?.message || e.response?.data?.error || "You do not have permission."); } finally { setDeleting(false); } }

  return <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}><People color="primary" /><Typography variant="h3">Admin dashboard</Typography></Stack>
    <Typography color="text.secondary" sx={{ mb: 4 }}>Manage the users available to the application.</Typography>
    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
    {loading ? <Loading label="Loading users..." /> : users.length ? <Stack spacing={1.5}>{users.map((x) => <Card key={x.id}><CardContent sx={{ p: 2 }}><Stack direction="row" spacing={2} alignItems="center"><Avatar sx={{ bgcolor: "primary.main" }}>{(x.name || "U").charAt(0).toUpperCase()}</Avatar><Box><Typography fontWeight={800}>{x.name}</Typography><Typography variant="body2" color="text.secondary">{x.email}</Typography></Box><Stack sx={{ ml: "auto" }}><Button color="error" variant="outlined" startIcon={<Delete />} onClick={() => setSelected(x)}>Delete</Button></Stack></Stack></CardContent></Card>)}</Stack> : <EmptyState title="No users" description="There are no users to manage." />}
    <Dialog open={!!selected} onClose={() => !deleting && setSelected(null)}><DialogTitle>Delete user?</DialogTitle><DialogContent><DialogContentText>This will remove {selected?.name || "this user"}. Continue only if you are sure.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setSelected(null)} disabled={deleting}>Cancel</Button><Button color="error" variant="contained" onClick={del} disabled={deleting}>{deleting ? "Deleting..." : "Delete"}</Button></DialogActions></Dialog>
  </Container>;
}
