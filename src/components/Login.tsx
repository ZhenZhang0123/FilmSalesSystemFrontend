import { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Link, Snackbar, Alert, AlertColor, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });

      if (response && response.token) {
        authContext?.login(response.token, response.username, response.roles);
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
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
      handleLogin();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Container maxWidth="sm">
        <Box boxShadow={3} p={4} borderRadius={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyPress} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyPress} />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>

          <Typography align="center" style={{ marginTop: "16px" }}>
            Don't have an account?{" "}
            <Link component="button" onClick={() => navigate("/register")}
              style={{ textDecoration: "none", cursor: "pointer" }}>
              Sign Up
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



