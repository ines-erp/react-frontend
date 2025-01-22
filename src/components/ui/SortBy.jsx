import {Button, Divider, Menu, MenuItem, styled} from "@mui/material";
import {Sort} from "@mui/icons-material";
import React, {useState} from "react";
import {blueGrey, lightBlue} from "@mui/material/colors";
import {useSearchParams} from "react-router-dom";


export const SortBy = ({sortOptions}) => {
    const [currentQueryParams, setCurrentQueryParams] = useSearchParams();
    const newQuery = new URLSearchParams();

    const sortBy = currentQueryParams.get('sortBy') || 'createdAt';
    const isAscending = currentQueryParams.get('isAscending') || 'true';

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
                              onClick={()=>handleChange("sortBy", opt.value)}
                              sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        {opt.label}

                    </MenuSelectItem>
                ))}

                <Divider/>

                <MenuSelectItem
                    selected={isAscending === "true"}
                    onClick={() => {
                        handleChange("isAscending", "true")
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
                    selected={isAscending === "false"}
                    onClick={() => {
                        handleChange("isAscending", "false")
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