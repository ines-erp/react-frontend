import {Link} from "react-router-dom";
import {Typography, Breadcrumbs as MuiBreadcrumbs} from "@mui/material";
import {grey} from "@mui/material/colors";

/**
 *
 * @param current {string}
 * @param previousLinks {{label:string, path:string}[]}
 * @returns {JSX.Element}
 * @constructor
 */

export const Breadcrumbs = ({current, previousLinks=[]}) => {
    return (
        <MuiBreadcrumbs>
            {previousLinks.length > 0 && previousLinks.map((link) => (
            <Link to={link.path} key={link.path} style={{textDecoration: 'none', color: 'inherit'}}>
                <Typography variant="h5" color={grey[500]} sx={{textTransform: "capitalize", '&:hover': {color:grey[900]}}}>
                    {link.label}
                </Typography>
            </Link>
            ))}
            <Typography variant="h5" color={grey[500]} sx={{textTransform: "capitalize"}}>
                {current}
            </Typography>
        </MuiBreadcrumbs>
    )
}