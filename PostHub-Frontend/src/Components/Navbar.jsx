import { useState } from "react";
import { AccountCircle, Close, Menu, Logout, Person, PostAdd, People, Shield } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Posts", to: "/posts", icon: <PostAdd /> },
    { label: "My Posts", to: "/my-posts", icon: <Person /> },
    { label: "Users", to: "/users", icon: <People /> },
    ...(user?.role === "ADMIN" ? [{ label: "Admin", to: "/admin", icon: <Shield /> }] : []),
  ];

  const doLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(255,255,255,.92)", color: "text.primary", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(15,23,42,.07)" }}>
      <Toolbar sx={{ minHeight: 68 }}>
        <Button component={Link} to={isAuthenticated ? "/posts" : "/login"} color="inherit" sx={{ p: 0, minWidth: 0, mr: 3 }}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 15, fontWeight: 800 }}>P</Avatar>
            <Typography fontWeight={900} letterSpacing="-.04em" fontSize={20}>PostHub</Typography>
          </Stack>
        </Button>

        {isAuthenticated && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {links.map((link) => (
              <Button key={link.to} component={Link} to={link.to} color="inherit" sx={{ px: 1.5, bgcolor: location.pathname === link.to ? "rgba(17,24,39,.07)" : "transparent" }}>
                {link.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {isAuthenticated ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title={user?.email || "Account"}>
              <IconButton component={Link} to={user?.id ? `/users/${user.id}` : "/posts"} sx={{ display: { xs: "none", sm: "inline-flex" } }}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Button onClick={doLogout} startIcon={<Logout />} color="inherit" sx={{ display: { xs: "none", md: "inline-flex" } }}>Logout</Button>
            <IconButton onClick={() => setOpen(true)} sx={{ display: { xs: "inline-flex", md: "none" } }}>
              <Menu />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/register" variant="contained">Register</Button>
          </Stack>
        )}
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography fontWeight={800}>Navigation</Typography>
            <IconButton onClick={() => setOpen(false)}><Close /></IconButton>
          </Stack>
          <List>
            {links.map((link) => (
              <ListItemButton key={link.to} component={Link} to={link.to} selected={location.pathname === link.to} onClick={() => setOpen(false)}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
            <ListItemButton onClick={doLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
