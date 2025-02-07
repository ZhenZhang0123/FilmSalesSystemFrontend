import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, TextField, Button } from "@mui/material";
import { fetchAvailableFutureShows, orderTickets, ShowResponse } from "../api/show";

interface ShowListProps {
    username: string;
    token: string;
}

const ShowList: React.FC<ShowListProps> = ({ username, token }) => {
    const [shows, setShows] = useState<ShowResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ticketCounts, setTicketCounts] = useState<{ [key: number]: number }>({});

    // ✅ Fetch Shows When Component Mounts
    const fetchShows = async () => {
        try {
            const showsData = await fetchAvailableFutureShows(token);
            setShows(showsData);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch shows.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShows();
    }, [token]);

    const handleInputChange = (showId: number, value: number) => {
        setTicketCounts((prev) => ({ ...prev, [showId]: value }));
    };

    const handleOrder = async (showId: number) => {
        const ticketCount = ticketCounts[showId] || 0;
        if (ticketCount <= 0) {
            alert("Please enter a valid ticket count.");
            return;
        }

        try {
            const response = await orderTickets(token, username, showId, ticketCount);
            alert(`Order Successful! Order ID: ${response.orderId}`);
            // Re-fetch shows after a successful order
            fetchShows();
        } catch (error) {
            alert("Failed to place the order.");
        }
    };

    if (loading) {
        return <Typography>Loading shows...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <List>
            {shows.map((show) => (
                <ListItem key={show.id} divider>
                    <ListItemText
                        primary={show.filmName}
                        secondary={`Show Time: ${new Date(show.showTime).toLocaleString()} | Ticket Price: $${show.ticketPrice} | Remaining Tickets: ${show.remainingTickets}`}
                    />
                    <TextField
                        type="number"
                        label="Tickets"
                        value={ticketCounts[show.id] || ""}
                        onChange={(e) => handleInputChange(show.id, Math.max(0, Number(e.target.value)))}
                        style={{ marginRight: "8px", width: "120px" }}
                        slotProps={{
                            htmlInput: {
                                min: 0, // Prevent negative numbers
                                inputMode: 'numeric',
                                pattern: '[0-9]*', // Allow only digits
                            },
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleOrder(show.id)}>
                        Buy Tickets
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};

export default ShowList;


