import {Box, Stack, Typography} from "@mui/material";
import {Breadcrumbs} from "@/components/base/Breadcrumbs.jsx";

export const PageHeader = ({title, actionButton, ...rest}) => {
    return (
        <Box sx={{marginBottom: 6}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant={"h1"} sx={{textTransform: "capitalize"}}>{title}</Typography>
                {actionButton}
            </Stack>
            <Breadcrumbs previousLinks={[{path: "/", label: "home"}]} current="transactions"/>
        </Box>
    )
}