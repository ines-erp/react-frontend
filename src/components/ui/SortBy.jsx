import {Button, Divider, Menu, MenuItem, styled} from "@mui/material";
import {Sort} from "@mui/icons-material";
import React, {useState} from "react";
import {blueGrey, lightBlue} from "@mui/material/colors";
import {useSearchParams} from "react-router-dom";


export const SortBy = ({sortOptions, currentQueryParams, setCurrentQueryParams}) => {
    const newQuery = new URLSearchParams(currentQueryParams);

    const sortBy = currentQueryParams.get('sort') || 'createdAt';
    const orderBy = currentQueryParams.get('order') || 'asc';

    const [anchorEl, setAnchorEl] = useState(null);

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
                    <MenuSelectItem key={opt.value} value={opt.value} selected={sortBy === opt.value}
                              onClick={()=>handleChange("sort", opt.value)}
                              sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        {opt.label}

                    </MenuSelectItem>
                ))}

                <Divider/>

                <MenuSelectItem
                    selected={orderBy === "asc"}
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
                    selected={orderBy === "desc"}
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