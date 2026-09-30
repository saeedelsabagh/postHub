import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Posts from "./Pages/Posts";
import CreatePost from "./Pages/CreatePost";
import PostDetails from "./Pages/PostDetails";
import EditPost from "./Pages/EditPost";
import MyPosts from "./Pages/MyPosts";
import Users from "./Pages/Users";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Posts />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
