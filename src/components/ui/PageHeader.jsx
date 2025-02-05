import {Box, Skeleton, Stack, Typography} from "@mui/material";
import {Breadcrumbs} from "@/components/base/Breadcrumbs.jsx";

export const PageHeader = ({title, actionButton,isLoading, breadcrumbs, ...rest}) => {
    return (
        <Box sx={{marginBottom: 6}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                {isLoading ? <Skeleton variant="rounded" width="100%" height="42px"/> : <Typography variant={"h1"} sx={{textTransform: "capitalize"}}>{title}</Typography>}
                {actionButton && (isLoading ? <Skeleton variant="rounded" width="12%" height="42px"/> : actionButton)}
            </Stack>
            {isLoading ? <Skeleton variant="rounded" width="30%" sx={{marginTop:1}}/>: (breadcrumbs && <Breadcrumbs previousLinks={breadcrumbs.previous} current={breadcrumbs.current}/>)}
        </Box>
    )
}