import axios from "axios";

const API_BASE_URL = "http://localhost:8080/user";

export interface OrderResponse {
    orderId: number;
    showId: number;
    ticketCount: number;
}

// Function to order tickets
export const orderTickets = async (token: string, userName: string, showId: number, ticketCount: number) => {
    const response = await axios.post<OrderResponse>(`${API_BASE_URL}/orderTicket`,
        {
            userName,
            showId,
            ticketCount,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};



