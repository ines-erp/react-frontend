import {
    Box, Button, Drawer, Stack, TextField, Typography
} from "@mui/material";
import React, {useState} from "react";
import {FilterListOff, FilterList, Close} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSearchParams} from "react-router-dom";

/**
 *
 * @param filterOptions
 * @returns {Element}
 * @constructor
 */
export const Filters = ({filterOptions, currentQueryParams, setCurrentQueryParams}) => {
    const newQuery = new URLSearchParams(currentQueryParams);

    const [isOpen, setIsOpen] = useState(false);

    const drawerWidth = "20%";

    const handleChangeFilter = (field, value) => {
        newQuery.set(field, value);

        if(value.length === 0){
            newQuery.delete(field)
        }

        setCurrentQueryParams(newQuery);
    }

    const handleClearFilters = () => {
        //remove all filters from url that matches filterOptions fields.
        const fields = filterOptions.map((option) => option.field)
        for (const field of fields) {
            newQuery.delete(field);
        }
        setCurrentQueryParams(newQuery);
        setIsOpen(false);
    }

    const RenderFilterOptions = (filter) => {
        const {type, field, label, options} = filter
        const clearButton = (
            <Button
                aria-label="delete"
                color="warning"
                onClick={() => {newQuery.delete(field); setCurrentQueryParams(newQuery)}} startIcon={<DeleteIcon/>}
            >
                Clear
            </Button>)

        switch (type) {
            case "buttons":
                return (<Stack key={filter.label} direction="column" spacing={1}>
                    {label && <Typography variant="caption" component="div" sx={{
                        textTransform: "capitalize", justifyContent: "space-between"
                    }}>
                        {label}
                    </Typography>}
                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                        {options && options.map((option, index) => {
                            const isSelected = newQuery.get(field) ? newQuery.get(field).toLowerCase() === option.value.toLowerCase() : false
                            return (<Button
                                key={index}
                                value={option.value}
                                variant={isSelected ? "contained" : "outlined"}
                                onClick={() => handleChangeFilter(field, option.value)}
                            >
                                {option.label}
                            </Button>)
                        })}
                        {clearButton}
                    </Box>

                </Stack>);
            case "textField":
                return (<TextField
                    key={field}
                    label={label}
                    defaultValue={newQuery.get(field)}
                    variant="outlined"
                    onChange={(e) => handleChangeFilter(field, e.target.value)}
                    fullWidth={true}
                    size="small"
                />)
        }
    }

    return (<>
        <Button
            startIcon={<FilterList/>}
            variant="outlined"
            onClick={() => setIsOpen(!isOpen)}
        >
            Filter
        </Button>
        <Drawer
            variant={isOpen ? "permanent" : "temporary"}
            open={isOpen}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
            anchor="right"
        >
            <Box sx={{height: '86px'}}/>
            <Box
                sx={{
                    padding: "0px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    height: "100%"
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography variant="h3" sx={{marginBottom: 2}}>
                        Filters
                    </Typography>
                    <Button
                        onClick={() => setIsOpen(false)}
                        size="small"
                        color="grey"
                        startIcon={<Close/>}
                    >
                        Close
                    </Button>
                </Box>

                {filterOptions.map(filter => RenderFilterOptions(filter))}

                <Button
                    onClick={handleClearFilters}
                    variant="outlined"
                    color="warning"
                    startIcon={<FilterListOff/>}
                >
                    Clear all
                </Button>
            </Box>
        </Drawer>
    </>)
}