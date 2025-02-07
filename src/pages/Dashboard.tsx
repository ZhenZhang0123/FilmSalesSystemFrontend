import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography, Container, Tabs, Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShowList from "../components/ShowList";
import OrderList from "../components/OrderList";

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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>Welcome, {authContext?.username}!</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Tabs value={tab} onChange={(_e, newValue) => setTab(newValue)}>
        <Tab label="My orders" />
        <Tab label="Available Shows" />
        {isAdmin && <Tab label="User Management" />}
        {isAdmin && <Tab label="System Settings" />}
      </Tabs>

      {tab === 0 && (
        <OrderList
          username={authContext?.username!}
          token={authContext?.token!}
        />
      )}

      {tab === 1 && (
        <ShowList
          username={authContext?.username!}
          token={authContext?.token!}
        />
      )}
    </Container>
  );
}

