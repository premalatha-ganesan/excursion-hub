import { Add } from "@mui/icons-material";
import { Avatar, Card, CardContent, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

export default function WishlistSelector({user, handleAdd, wishlist}) {

    return(
        <Card>
            <CardContent>
                <Typography color="primary" variant="h6">My Wishlist Attractions</Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 400, overflowY: 'auto'}}>
                {
                    wishlist.map((w, idx) => (
                        <ListItem key={idx}>
                            <ListItemAvatar>
                                <Avatar src={w.attraction.imageUrl || "/icon.png"}/>
                            </ListItemAvatar>
                            <ListItemText primary={w.attraction.attractionName} />
                            <IconButton onClick={() => handleAdd(w.attraction)}>
                                <Add/>
                            </IconButton>
                        </ListItem>
                    ))
                }
                </List>
            </CardContent>
        </Card>
    )

}