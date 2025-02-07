import { useState } from "react";
import { TextField, Button, Container, Typography, Link, Snackbar, Alert, AlertColor, Box } from "@mui/material";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username.length < 3) {
      setSnackbarMessage("Username must be at least 3 characters long.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    if (password.length < 6) {
      setSnackbarMessage("Password must be at least 6 characters long.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      await registerUser({ username, email, password });
      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      navigate("/login");
    } catch (error: any) {
      if (error.response) {
        setSnackbarMessage(error.response.data);
      } else {
        setSnackbarMessage("An error occurred. Please try again.");
      }
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Container maxWidth="sm">
        <Box boxShadow={3} p={4} borderRadius={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <TextField
            label="Username"
            required
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="Email"
            required
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <TextField
            label="Password"
            required
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            inputProps={{ minLength: 6 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>

          <Typography align="center" style={{ marginTop: "16px" }}>
            Already have an account?{" "}
            <Link component="button" onClick={() => navigate("/login")} style={{ textDecoration: "none", cursor: "pointer" }}>
              Login
            </Link>
          </Typography>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </Box>
  );
}