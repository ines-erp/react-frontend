import {Container, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {SearchOff} from "@mui/icons-material";

export const EmptyState = ({children}) => {
    return (
        <Container maxWidth={false} sx={{display:"flex", flexDirection:"column", gap:2,alignItems: "center", justifyContent: "center", color:grey[500], minHeight:"50vh"}}>
            <SearchOff sx={{ fontSize: 54 }}/>
            <Typography variant='h4'>
                No results found
            </Typography>
            {children}
        </Container>
    )
}