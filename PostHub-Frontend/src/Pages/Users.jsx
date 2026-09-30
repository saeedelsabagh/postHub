import { useEffect, useState } from "react";
import {
  ArrowForward,
  Person,
  Search,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../API/api";
import Loading from "../Components/Loading";
import EmptyState from "../Components/EmptyState";
import PageContainer from "../Components/PageContainer";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/userss")
      .then((r) => setUsers(r.data))
      .catch((e) =>
        setError(
          e.response?.data?.message ||
            "Could not load users."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    `${u.name || ""} ${u.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <PageContainer>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="space-between"
        gap={2}
        sx={{ mb: 4 }}
      >
        <div>
          <Typography variant="h3">
            Community
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Find people and explore their profiles.
          </Typography>
        </div>

        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: {
              md: 300,
            },
          }}
        />
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Loading label="Loading community..." />
      ) : filtered.length ? (
        <Grid container spacing={3}>
          {filtered.map((x) => (
            <Grid
              key={x.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  transition: "transform .2s",

                  "&:hover": {
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                      }}
                    >
                      {(x.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </Avatar>

                    <div>
                      <Typography variant="h6">
                        {x.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {x.email}
                      </Typography>
                    </div>
                  </Stack>

                  <Button
                    component={Link}
                    to={`/users/${x.id}`}
                    endIcon={<ArrowForward />}
                    sx={{ mt: 3 }}
                  >
                    View profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title="No users found"
          description="Try another search term."
        />
      )}
    </PageContainer>
  );
}