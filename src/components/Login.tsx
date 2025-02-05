import { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Link } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });

      authContext?.login(response.token, response.username, response.roles);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Login</Button>

      {/* Sign Up Link */}
      <Typography align="center" style={{ marginTop: "16px" }}>
        Don't have an account?{" "}
        <Link component="button" onClick={() => navigate("/register")} style={{ textDecoration: "none", cursor: "pointer" }}>
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
}

