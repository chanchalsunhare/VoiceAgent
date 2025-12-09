import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Logout, Security } from "@mui/icons-material";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      dispatch(logout());
      navigate("/login");
    }, 500);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        color: "#1f2937",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            }}
          >
            <Security sx={{ color: "white", fontSize: 24 }} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            VoiceAgent
          </Typography>
        </Box>

        <Button
          variant="danger"
          size="md"
          onClick={handleLogout}
          loading={isLoggingOut}
          disabled={isLoggingOut}
        >
          <Logout sx={{ fontSize: 18 }} />
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
