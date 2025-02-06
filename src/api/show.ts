import axios from "axios";

const API_BASE_URL = "http://localhost:8080/user";

export interface ShowResponse {
  id: number;
  filmName: string;
  showTime: string; // Date in ISO 8601 format
  ticketPrice: number;
  remainingTickets: number;
}

// Function to fetch available future shows
export const fetchAvailableFutureShows = async (token: string): Promise<ShowResponse[]> => {
  const response = await axios.get<ShowResponse[]>(`${API_BASE_URL}/availableFutureShows`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
