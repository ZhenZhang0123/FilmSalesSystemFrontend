import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, Pagination } from "@mui/material";
import { getOrderList, OrderListResponse } from "../api/order";

interface OrderListProps {
    username: string;
    token: string;
}

const OrderList: React.FC<OrderListProps> = ({ username, token }) => {
    const [orders, setOrders] = useState<OrderListResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5; // Number of orders per page

    const fetchOrders = async (pageNumber: number) => {
        setLoading(true);
        try {
            const response = await getOrderList(token, username, pageNumber - 1, pageSize); // Page index starts from 0
            setOrders(response.content);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError("Failed to fetch orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(page);
    }, [page, token]);

    if (loading) {
        return <Typography>Loading orders...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (orders.length === 0) {
        return <Typography>No orders found.</Typography>;
    }

    return (
        <>
            <List>
                {orders.map((order) => (
                    <ListItem key={order.orderId} divider>
                        <ListItemText
                            primary={`Order ID: ${order.orderId} | Film: ${order.filmName}`}
                            secondary={`Show Time: ${new Date(order.showTime).toLocaleString()} | Bought Tickets: ${order.boughtTicketCount} | Total Price: $${order.fullOrderPrice.toFixed(2)} | Purchase Time: ${new Date(order.boughtTicketTime).toLocaleString()}`}
                        />
                    </ListItem>
                ))}
            </List>

            {/* Pagination Component */}
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_event, value) => setPage(value)}
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            />
        </>
    );
};

export default OrderList;
