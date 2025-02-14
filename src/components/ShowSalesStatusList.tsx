import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, Pagination } from "@mui/material";
import { fetchShowSalesStatus, ShowSalesStatusResponse } from "../api/show";

interface ShowSalesStatusListProps {
    token: string;
}

const ShowSalesStatusList: React.FC<ShowSalesStatusListProps> = ({ token }) => {
    const [showSalesStatus, setShowSalesStatus] = useState<ShowSalesStatusResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 5; // Number of orders per page

    const fetchSalesStatus = async (page: number) => {
        try {
            const response = await fetchShowSalesStatus(token, page - 1, PAGE_SIZE);
            setShowSalesStatus(response.content);
            setTotalPages(response.totalPages);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch show sales status.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesStatus(page);
    }, [token, page]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (loading) return <Typography>Loading show sales status...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <List>
                {showSalesStatus.map((status) => (
                    <ListItem key={status.showId} divider>
                        <ListItemText
                            primary={`Show ID: ${status.showId} | Film: ${status.filmName} | Time: ${new Date(status.showTime).toLocaleString()}`}
                            secondary={`Sold Tickets: ${status.soldTickets} | Revenue: $${status.totalRevenue.toFixed(2)}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} style={{ marginTop: "16px", display: "flex", justifyContent: "center" }} />
        </>
    );
};

export default ShowSalesStatusList;

