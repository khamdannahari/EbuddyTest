import React from "react";
import { Button } from "@mui/material";

interface SignOutButtonProps {
  handleSignOut: () => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ handleSignOut }) => {
  return (
    <Button
      sx={{
        borderRadius: 16,
      }}
      variant="contained"
      color="secondary"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
