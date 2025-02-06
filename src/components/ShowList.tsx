import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { ShowResponse } from "../api/show";

interface ShowListProps {
  shows: ShowResponse[];
  loading: boolean;
  error: string | null;
}

const ShowList: React.FC<ShowListProps> = ({ shows, loading, error }) => {
  if (loading) {
    return <Typography>Loading shows...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <List>
      {shows.map((show) => (
        <ListItem key={show.id}>
          <ListItemText
            primary={show.filmName}
            secondary={`Show Time: ${new Date(show.showTime).toLocaleString()} | Ticket Price: $${show.ticketPrice} | Remaining Tickets: ${show.remainingTickets}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ShowList;