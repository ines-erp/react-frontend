import {Container, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {SearchOff} from "@mui/icons-material";

export const EmptyState = ({showFilterMessage=false, children}) => {
    return (
        <Container maxWidth={false} sx={{display:"flex", flexDirection:"column", gap:2,alignItems: "center", justifyContent: "center", color:grey[500], height:"100%"}}>
            <SearchOff sx={{ fontSize: 54 }}/>
            <Typography variant='h4'>
                No results found
            </Typography>
            {showFilterMessage && <Typography variant='body1'>
                Try to clear the filters or add a new one to begin
            </Typography>}
            {children}
        </Container>
    )
}