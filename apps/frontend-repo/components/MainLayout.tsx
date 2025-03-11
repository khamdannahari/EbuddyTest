import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
import Header from "./Header";
import UserCard from "./UserCard";
import { User } from "../../../packages/shared/entities/user";

interface MainLayoutProps {
  currentUser: string;
  users: User[];
  loading: boolean;
  error: string;
  hasMore: boolean;
  loadingLoadMore: boolean;
  onSignOut: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  currentUser,
  users,
  loading,
  error,
  hasMore,
  loadingLoadMore,
  onSignOut,
}) => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pb: 4, pt: 0 }}>
      <Header currentUser={currentUser} onSignOut={onSignOut} />

      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#1a237e",
            mb: 3,
            textAlign: { xs: "center", sm: "left" },
            opacity: loading ? 0.3 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          User List
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: "#2196F3" }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                animation: "fadeIn 0.5s ease",
              }}
            >
              Loading user data...
            </Typography>
          </Box>
        ) : error ? (
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 2,
                border: "1px solid #ff1744",
                bgcolor: "rgba(255,23,68,0.05)",
                animation: "slideIn 0.3s ease",
              }}
            >
              <Typography color="error">{error}</Typography>
            </Paper>
          </Grid>
        ) : (
          <Grid
            container
            spacing={3}
            sx={{
              animation: "fadeIn 0.5s ease",
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            {users.map((user) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={user.id}
                sx={{
                  animation: "slideIn 0.3s ease",
                  "@keyframes slideIn": {
                    "0%": {
                      opacity: 0,
                      transform: "translateX(-20px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  },
                }}
              >
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && hasMore && !error && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            {loadingLoadMore ? (
              <CircularProgress
                size={40}
                thickness={4}
                sx={{ color: "#2196F3" }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Scroll down to load more
              </Typography>
            )}
          </Box>
        )}

        {!hasMore && users.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              All data has been loaded
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MainLayout;
