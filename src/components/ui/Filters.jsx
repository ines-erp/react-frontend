import {
    Box,
    Button,
    Drawer,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {FilterListOff, FilterList, Close} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 *
 * @param filterOptions
 * @param filters {{field: value}}
 * @param onChangeFilters {(field:string, value) => void}
 * @param onClearFilters {()=>void}
 * @returns {Element}
 * @constructor
 */
export const Filters = ({filterOptions, filters, onChangeFilters, onClearFilters}) => {
    const [isOpen, setIsOpen] = useState(false);
    const drawerWidth = "20%";

    const RenderFilterOptions = (filter) => {
        const {type, field, label, options} = filter
        const clearButton = <Button aria-label="delete" color="warning"
                                    onClick={() => onChangeFilters(field, undefined)} startIcon={<DeleteIcon/>}>
            Clear
        </Button>

        switch (type) {
            case "buttons":
                return (
                    <Stack direction="column" spacing={1}>
                        {label &&
                            <Typography variant="caption" component="div" sx={
                                {
                                    textTransform: "capitalize",
                                    justifyContent: "space-between"
                                }
                            }>
                                {label}
                            </Typography>}
                        <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                            {options.map(
                                option => {
                                    return (
                                        <Button
                                            key={crypto.randomUUID()}
                                            value={option.value}
                                            variant={filters[field] === option.value ? "contained" : "outlined"}
                                            onClick={() => filters[field] = option.value}>
                                            {option.label}
                                        </Button>
                                    )
                                }
                            )}
                            {clearButton}
                        </Box>

                    </Stack>
                );
            case "textField":
                return (
                    <TextField
                        label={option.label}
                        variant="outlined"
                        value={option.value}
                        onChange={(e) => onChangeFilters(field, e.target.value)}
                    />
                )
        }
    }

    return (
        <>
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
                        <Typography variant="h3" sx={{marginBottom: 2}}>Filters</Typography>
                        <Button onClick={() => setIsOpen(false)} size="small" color="grey"
                                startIcon={<Close/>}>Close</Button>
                    </Box>

                    {filterOptions.map(filter => RenderFilterOptions(filter))}

                    <Button onClick={onClearFilters} variant="outlined" color="warning"
                            startIcon={<FilterListOff/>}>Clear
                        all</Button>
                </Box>
            </Drawer>
        </>
    )
}