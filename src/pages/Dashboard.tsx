// src/pages/Dashboard.tsx
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography, Container, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchAvailableFutureShows, ShowResponse } from "../api/show"; 
import ShowList from "../components/ShowList";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [shows, setShows] = useState<ShowResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    authContext?.logout();
    navigate("/login");
  };

  const isAdmin = authContext?.roles.includes("ROLE_ADMIN");

  useEffect(() => {
    if (!authContext?.token) return; // Ensure the user is logged in

    const fetchShows = async () => {
      try {
        const showsData = await fetchAvailableFutureShows(authContext.token as string);
        setShows(showsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch shows.");
        setLoading(false);
      }
    };

    fetchShows();
  }, [authContext?.token]);

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome, {authContext?.username}!</Typography>

      <Tabs value={tab} onChange={(_e, newValue) => setTab(newValue)}>
        <Tab label="Dashboard Overview" />
        <Tab label="Available Shows" />
        {isAdmin && <Tab label="User Management" />}
        {isAdmin && <Tab label="System Settings" />}
      </Tabs>

      {tab === 1 && <ShowList shows={shows} loading={loading} error={error} />}

      <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
    </Container>
  );
}



