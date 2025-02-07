import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { getOrderList, OrderListResponse } from "../api/order";

interface OrderListProps {
    username: string;
    token: string;
}

const OrderList: React.FC<OrderListProps> = ({ username, token }) => {
    const [orders, setOrders] = useState<OrderListResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ Fetch Orders When Component Mounts
    const fetchOrders = async () => {
        try {
            const ordersData = await getOrderList(token, username);
            setOrders(ordersData);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch orders.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);

    if (loading) {
        return <Typography>Loading orders...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
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
    );
};

export default OrderList;
