import {Card, CardContent, Typography} from "@mui/material";
import {Info} from "@mui/icons-material";

export const SummaryCard = ({header={icon:<Info />, title:undefined},children, caption, ...rest}) => {

    return (
        <Card sx={{maxWidth: "240px", flex: 1}} variant={"filled"} {...rest}>
            <CardContent>
                {header.title && <Typography variant={"h3"} sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    alignItems: "center",
                    display: "flex",
                    gap: "8px",
                }}>
                    {header.icon}
                    {header.title}
                </Typography>}

                {children}

                <Typography variant="caption" color={"text.secondary"}>
                    {caption}
                </Typography>
            </CardContent>
        </Card>
    )
}