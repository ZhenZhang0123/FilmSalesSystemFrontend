import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { fetchShowSalesStatus, ShowSalesStatusResponse } from "../api/show";

interface ShowSalesStatusListProps {
    token: string;
}

const ShowSalesStatusList: React.FC<ShowSalesStatusListProps> = ({ token }) => {
    const [showSalesStatus, setShowSalesStatus] = useState<ShowSalesStatusResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ Fetch Show Sales Status When Component Mounts
    const fetchSalesStatus = async () => {
        try {
            const salesData = await fetchShowSalesStatus(token);
            setShowSalesStatus(salesData);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch show sales status.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesStatus();
    }, [token]);

    if (loading) {
        return <Typography>Loading show sales status...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <List>
            {showSalesStatus.map((status) => (
                <ListItem key={status.showId} divider>
                    <ListItemText
                        primary={`Show ID: ${status.showId} | Film: ${status.filmName} | Show Time: ${new Date(status.showTime).toLocaleString()}`}
                        secondary={`Sold Tickets: ${status.soldTickets} | Total Revenue: $${status.totalRevenue.toFixed(2)}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ShowSalesStatusList;
