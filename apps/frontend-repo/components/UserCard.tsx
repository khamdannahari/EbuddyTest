import React from "react";
import { Paper, Box, Avatar, Typography, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { User } from "../../../packages/shared/entities/user";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          bgcolor: "rgba(33, 150, 243, 0.02)",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        backdropFilter: "blur(8px)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar sx={{ bgcolor: "#2196F3" }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {user.name}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StarIcon sx={{ color: "#ffc107" }} />
          <Typography>
            Average Rating: {user.totalAverageWeightRatings.toFixed(1)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShoppingBagIcon sx={{ color: "#4caf50" }} />
          <Typography>Total Rents: {user.numberOfRents}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon sx={{ color: "#9c27b0" }} />
          <Typography>
            Last Active:{" "}
            {new Date(user.recentlyActive * 1000).toLocaleString("id-ID")}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserCard;
