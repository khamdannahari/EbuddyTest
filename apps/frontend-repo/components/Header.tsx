import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Typography,
  Button,
} from "@mui/material";

interface HeaderProps {
  currentUser: string;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onSignOut }) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        zIndex: 1100,
        top: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "white",
              color: "#2196F3",
              fontWeight: "bold",
            }}
          >
            {currentUser.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Welcome, {currentUser}!
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={onSignOut}
          sx={{ borderRadius: 16 }}
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
