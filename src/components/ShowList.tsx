import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, TextField, Button, Pagination } from "@mui/material";
import { fetchAvailableFutureShows, ShowResponse } from "../api/show";
import { orderTickets } from "../api/order";

interface ShowListProps {
    username: string;
    token: string;
}

const ShowList: React.FC<ShowListProps> = ({ username, token }) => {
    const [shows, setShows] = useState<ShowResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ticketCounts, setTicketCounts] = useState<{ [key: number]: number }>({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 5; // Number of orders per page

    const fetchShows = async (page: number) => {
        try {
            const response = await fetchAvailableFutureShows(token, page - 1, PAGE_SIZE);
            setShows(response.content);
            setTotalPages(response.totalPages);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch shows.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShows(page);
    }, [token, page]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (loading) return <Typography>Loading shows...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <List>
                {shows.map((show) => (
                    <ListItem key={show.id} divider>
                        <ListItemText
                            primary={show.filmName}
                            secondary={`Show Time: ${new Date(show.showTime).toLocaleString()} | Price: $${show.ticketPrice} | Remaining: ${show.remainingTickets}`}
                        />
                        <TextField
                            type="number"
                            label="Tickets"
                            value={ticketCounts[show.id] || ""}
                            onChange={(e) => setTicketCounts({ ...ticketCounts, [show.id]: Math.max(0, Number(e.target.value)) })}
                            style={{ marginRight: "8px", width: "120px" }}
                        />
                        <Button variant="contained" color="primary" onClick={() => orderTickets(token, username, show.id, ticketCounts[show.id] || 0)}>
                            Buy
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} style={{ marginTop: "16px", display: "flex", justifyContent: "center" }} />
        </>
    );
};

export default ShowList;



