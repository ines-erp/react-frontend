import {
    Box, Button, Drawer, Stack, TextField, Typography
} from "@mui/material";
import React, {useState} from "react";
import {FilterListOff, FilterList, Close} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 *
 * @param filterOptions
 * @returns {Element}
 * @constructor
 */
export const Filters = ({filterOptions, currentQueryParams, setCurrentQueryParams}) => {
    const newQuery = new URLSearchParams(currentQueryParams);

    const [isOpen, setIsOpen] = useState(false);

    const drawerWidth = "240px";

    /**
     * Handles changes to filter values.
     *
     * @param {string} field - The name of the field being filtered.
     *                        If undefined, all filters matching filterOptions will be cleared.
     * @param {string} value - The new value for the filter.
     *                        If an empty string, the filter will be cleared.
     *
     * This function updates the `newQuery` object with the new filter value
     * and resets the page number to 1. If `value` is an empty string,
     * it clears the specified filter or all filters matching `filterOptions`
     * if `field` is undefined. Finally, it updates the `currentQueryParams`
     * state with the modified `newQuery`.
     */
    const handleChangeFilter = (field = undefined, value) => {
        // Set the new filter value if both field and value exist
        if (value && field) {
            newQuery.set(field, value);
        }

        // Handle clearing filters
        if (value.length === 0) {
            if (field) {
                // Remove specific filter if field is provided
                newQuery.delete(field);
            } else {
                // Remove all filters matching filterOptions fields
                for (const option of filterOptions) {
                    newQuery.delete(option.field);
                }
            }
        }

        // Reset page number to 1 on any filter change
        newQuery.set("page", "1");

        // Update current query params
        setCurrentQueryParams(newQuery);
    };

    const RenderFilterOptions = (filter) => {
        const {type, field, label, options} = filter
        const clearButton = (<Button
            aria-label="delete"
            color="warning"
            onClick={() => {
                handleChangeFilter(field, "")
            }} startIcon={<DeleteIcon/>}
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
            open={isOpen}
            sx={{
                width: drawerWidth,
            }}
            anchor="right"
        >
            <Box sx={{height: '86px'}}/>
            <Box
                sx={{
                    padding: "0px 16px", display: "flex", flexDirection: "column", gap: 4, height: "100%"
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

                <Box sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <Button variant="outlined" onClick={() => setIsOpen(false)}>Close</Button>
                    <Button
                        onClick={() => handleChangeFilter(undefined, "")}
                        variant="outlined"
                        color="warning"
                        startIcon={<FilterListOff/>}
                    >
                        Clear all
                    </Button>
                </Box>
            </Box>
        </Drawer>
    </>)
}