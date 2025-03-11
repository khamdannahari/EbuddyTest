import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import LoginForm from "./LoginForm";

interface LoginLayoutProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error: string;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
        overflow: "auto",
        padding: { xs: 2, sm: 4 },
        boxSizing: "border-box",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          my: { xs: 2, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 0, sm: 2 },
          width: "100%",
          mx: "auto",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            width: "100%",
            maxWidth: { xs: "100%", sm: "450px" },
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: { xs: "none", sm: "scale(1.02)" },
            },
            mx: "auto",
            boxSizing: "border-box",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{
              mb: 3,
              fontSize: { xs: "1.75rem", sm: "2rem" },
              fontWeight: 700,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Welcome Back
          </Typography>
          <LoginForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginLayout;
