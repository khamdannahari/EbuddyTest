import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error && (
        <Typography
          color="error"
          align="center"
          sx={{
            mt: 2,
            mb: 2,
            p: 1,
            borderRadius: 1,
            backgroundColor: "rgba(255, 0, 0, 0.1)",
          }}
        >
          {error}
        </Typography>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2196F3",
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: { xs: "0.9rem", sm: "1rem" },
          },
          "& .MuiOutlinedInput-input": {
            fontSize: { xs: "0.9rem", sm: "1rem" },
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2196F3",
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: { xs: "0.9rem", sm: "1rem" },
          },
          "& .MuiOutlinedInput-input": {
            fontSize: { xs: "0.9rem", sm: "1rem" },
          },
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          py: { xs: 1.2, sm: 1.5 },
          fontSize: { xs: "0.9rem", sm: "1rem" },
          borderRadius: 2,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          transition: "all 0.3s ease",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
          "&:hover": {
            transform: { xs: "none", sm: "translateY(-2px)" },
            boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .3)",
          },
        }}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </Box>
  );
};

export default LoginForm;
