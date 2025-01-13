import {Chip} from "@mui/material";

/**
 *
 * @param label
 * @param isSelected
 * @param onClickBadge
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
export const Badge = ({label, isSelected, onClickBadge, ...rest}) => {
    return (
        <Chip label={label} sx={{fontWeight: "bold"}} size={"medium"} color="primary"
              variant={isSelected ? "filled" : "outlined"}
              onClick={onClickBadge}
              {...rest}
        />
    )
}