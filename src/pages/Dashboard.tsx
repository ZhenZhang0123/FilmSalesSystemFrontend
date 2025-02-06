import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography, Container, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const handleLogout = () => {
    authContext?.logout();
    navigate("/login");
  };

  const isAdmin = authContext?.roles.includes("ROLE_ADMIN");

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome, {authContext?.username}!</Typography>

      {/* Tabs for both users and admins */}
      <Tabs value={tab} onChange={(_e, newValue) => setTab(newValue)}>
        <Tab label="Dashboard Overview" />
        {isAdmin && <Tab label="User Management" />} {/* Only for admins */}
        {isAdmin && <Tab label="System Settings" />} {/* Only for admins */}
      </Tabs>

      {/* Tab Content */}
      {tab === 0 && <Typography>Overview of your account.</Typography>}
      {tab === 1 && isAdmin && <Typography>User Management Section</Typography>}
      {tab === 2 && isAdmin && <Typography>System Settings</Typography>}

      <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
    </Container>
  );
}

