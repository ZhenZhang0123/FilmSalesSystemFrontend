import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export interface ShowResponse {
    id: number;
    filmName: string;
    showTime: string; // Date in ISO 8601 format
    ticketPrice: number;
    remainingTickets: number;
}

export interface ShowSalesStatusResponse {
    showId: number;
    filmName: string;
    showTime: string; // Date in ISO 8601 format
    soldTickets: number;
    totalRevenue: number;
}

// Function to fetch available future shows
export const fetchAvailableFutureShows = async (token: string, page: number, size: number) => {
    const response = await axios.get(`${API_BASE_URL}/user/availableFutureShows`, {
        params: { page, size },
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Function to fetch show sales status
export const fetchShowSalesStatus = async (token: string, page: number, size: number) => {
    const response = await axios.get(`${API_BASE_URL}/admin/showSalesStatus`, {
        params: { page, size },
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
