import {Button, Divider, Menu, MenuItem, styled} from "@mui/material";
import {Sort} from "@mui/icons-material";
import React, {useState} from "react";
import {blueGrey, lightBlue} from "@mui/material/colors";


export const SortBy = ({sortOptions, onChange, sortState={value:undefined, isAscending:true}}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const isOpen = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleChange = (field, value) => {
        onChange(field, value);
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
                    <MenuSelectItem key={opt.value} value={opt.value} selected={sortState.value === opt.value}
                              onClick={()=>handleChange("value", opt.value)}
                              sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        {opt.label}

                    </MenuSelectItem>
                ))}

                <Divider/>

                <MenuSelectItem
                    selected={sortState.isAscending}
                    onClick={() => {
                        onChange("isAscending", true)
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
                    selected={!sortState.isAscending}
                    onClick={() => {
                        onChange("isAscending", false)
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