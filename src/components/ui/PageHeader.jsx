import {Box, Skeleton, Stack, Typography} from "@mui/material";
import {Breadcrumbs} from "@/components/base/Breadcrumbs.jsx";

export const PageHeader = ({title, actionButton,isLoading, ...rest}) => {
    return (
        <Box sx={{marginBottom: 6}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                {isLoading ? <Skeleton width="100%" sx={{fontSize:"4rem"}}/> : <Typography variant={"h1"} sx={{textTransform: "capitalize"}}>{title}</Typography>}
                {actionButton && (isLoading ? <Skeleton width="15%" sx={{fontSize:"4rem"}}/> : actionButton)}
            </Stack>
            {isLoading ? <Skeleton width="30%"/>: <Breadcrumbs previousLinks={[{path: "/", label: "home"}]} current="transactions"/>}
        </Box>
    )
}