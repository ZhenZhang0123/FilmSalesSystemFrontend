import axios from "axios";

const API_BASE_URL = "http://localhost:8080/user";

export interface OrderResponse {
    orderId: number;
    showId: number;
    ticketCount: number;
}

export interface OrderListResponse {
    orderId: number;
    filmName: string;
    showTime: string;
    boughtTicketTime: string;
    boughtTicketCount: number;
    fullOrderPrice: number;
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

// Function to get the order list
export const getOrderList = async (token: string, userName: string) => {
    const response = await axios.get<OrderListResponse[]>(`${API_BASE_URL}/myOrders`, {
        params: { userName },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};



