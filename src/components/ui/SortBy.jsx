import {Button, Divider, Menu, MenuItem, styled} from "@mui/material";
import {Sort} from "@mui/icons-material";
import React, {useState} from "react";
import {blueGrey, lightBlue} from "@mui/material/colors";


export const SortBy = ({sortOptions, currentQueryParams,setCurrentQueryParams}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const newQuery = new URLSearchParams(currentQueryParams);

    const isOpen = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleChange = (field, value) => {
        newQuery.set(field, value);
        setCurrentQueryParams(newQuery);
        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <div>
            <Button
                onClick={handleClick}
                variant="outlined"
                startIcon={<Sort/>}
            >
                Sort
            </Button>
            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} sx={{padding:4}}>
                {sortOptions.map(opt => (
                    <MenuSelectItem key={opt.value} value={opt.value} selected={currentQueryParams.get("sort") === opt.value.toLowerCase()}
                              onClick={()=>handleChange("sort", opt.value)}
                              sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        {opt.label}

                    </MenuSelectItem>
                ))}

                <Divider/>

                <MenuSelectItem
                    selected={currentQueryParams.get("order") !== "desc" }
                    onClick={() => {
                        handleChange("order", "asc")
                    }}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%"
                    }}
                >
                    Ascending
                </MenuSelectItem>

                <MenuSelectItem
                    selected={currentQueryParams.get("order") === "desc" }
                    onClick={() => {
                        handleChange("order", "desc")
                    }}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%"
                    }}
                >
                    Descending
                </MenuSelectItem>
            </Menu>
        </div>
    )
}

const MenuSelectItem = styled(MenuItem)(
    ({theme}) => ({
        '&.Mui-selected': {
            'background-color': lightBlue[50],
            "fontWeight":"500",
            '&:hover': {
                'background-color': lightBlue[100],
            },
        },
        color: blueGrey[900],
    }));