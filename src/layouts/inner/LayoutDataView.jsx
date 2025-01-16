import {
    Box,
    Container,
    Pagination,
    PaginationItem,
    Paper,
    Typography
} from "@mui/material";
import {PageHeader} from "@/components/base/PageHeader.jsx";
import {Badge} from "@/components/base/Badge.jsx";
import {EmptyState} from "@/components/ui/EmptyState.jsx";
import {Link, useLocation} from "react-router-dom";

/**
 *
 * @param header {{title:string, actionButton:ReactNode}}
 * @param cardsResume
 * @param filterView
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
export const LayoutDataView = (
    {
        header,
        dataResume = {isVisible: false},
        filterView = {isVisible: false, filters: []},
        data,
    }) => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    return (
        <Container>
            <PageHeader title={header.title} actionButton={header.actionButton}/>

            {filterView.isVisible && filterView.filters.length > 0 && (
                <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                    {filterView.filters.map((filter) => {
                        return (
                            <Badge key={filter.label}
                                   label={filter.label}
                                   isSelected={filter.isSelected}
                                   value={filter.value}
                                   onClick={(value) => filterView.onClick(value)
                                   }/>
                        )
                    })}
                </Box>
            )}

            {dataResume.isVisible === true && dataResume.children && (
                <Box sx={{marginY: 8}}>
                    {dataResume.filters && dataResume.filters}
                    {dataResume.title &&
                        <Typography variant={"h2"} fontSize={"1.5rem"}>{dataResume.title}</Typography>
                    }
                    <Box sx={{display: "flex", gap: 2}}>
                        {dataResume.children}
                    </Box>
                </Box>)
            }


            <Paper variant="outlined">
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant={"h2"} fontSize={"1.5rem"}
                                sx={{textTransform: "capitalize"}}>{data.title}</Typography>
                    {data.actionButtons}
                    {/*<ButtonGroup>*/}
                    {/*button to sort and filter*/}
                    {/*</ButtonGroup>*/}
                </Box>
                {(!data.children || data.children.length === 0) && <EmptyState/>}
                {data.children && data.children.length > 0 && data.children}

                {data.totalPages &&
                    <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 4}}>
                        <Pagination
                            count={data.totalPages}
                            shape="rounded" color="primary"
                            page={page}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`${location.pathname}?page=${item.page}`}
                                    {...item}
                                />
                            )}/>
                    </Box>}
            </Paper>


        </Container>
    );
}

