import {
    Box,
    Container,
    Pagination,
    PaginationItem,
    Paper, Skeleton, Stack,
    Typography
} from "@mui/material";
import {PageHeader} from "@/components/ui/PageHeader.jsx";
import {Badge} from "@/components/base/Badge.jsx";
import {EmptyState} from "@/components/ui/EmptyState.jsx";
import {Link, useLocation} from "react-router-dom";

/**
 *
 * @param header {{title:string, actionButton:ReactNode}}
 * @param cardsResume [foo]
 * @param filterView
 * @param dataList
 * @returns {JSX.Element}
 * @constructor
 */
export const LayoutDataViewList = (
    {
        header,
        dataResume = {isVisible: false},
        filterView = {isVisible: false, filters: []},
        dataList,
    }) => {
    const isLoading = !dataList.children;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    return (
        <Container>
            <PageHeader title={header.title} actionButton={header.actionButton} isLoading={isLoading}/>

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

            {
                dataResume.isVisible === true &&
                (isLoading
                ?
                <Box sx={{display: "flex", gap: 2, marginY:8}}>
                    {/*TODO: Extract to a function an reuse it*/}
                    {Array.from(Array(dataResume.limit ??  1)).map(
                        (index) => (
                        <Skeleton height="180px" width="25%" variant="rounded" key={index}/>
                        )
                    )}
                </Box>
                :
                <Box sx={{marginY: 8}}>
                    {dataResume.filters && dataResume.filters}
                    {dataResume.title &&
                        <Typography
                            variant="h2" fontSize="1.5rem"
                            sx={{marginBottom: 2}}>
                            {dataResume.title}
                        </Typography>
                    }
                    <Box sx={{display: "flex", gap: 2}}>
                        {dataResume.children}
                    </Box>
                </Box>)
            }


            <Paper variant="outlined" sx={{minHeight: "450px", justifyContent: "space-between"}}>
                <Box id="paper-header"
                     sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2}}>
                    {isLoading ? <Skeleton width="75%" height="3.5rem"/> :
                        <Typography
                            variant={"h2"}
                            fontSize={"1.5rem"}
                            sx={{textTransform: "capitalize"}}>
                            {dataList.title}
                        </Typography>}
                    {isLoading ? <Skeleton width="15%" height="3.5rem"/> : dataList.actionButtons}
                </Box>

                {isLoading &&
                    <Stack spacing={1}>
                        {Array.from(Array(dataList.limit ??  1)).map((index) =>
                                <Skeleton key={index} variant="rounded" width="100%" height={100} sx={{padding: 0, margin: 0}}/>
                            )
                        }
                    </Stack>
                }

                {!isLoading && dataList.children.length === 0 && <EmptyState showFilterMessage={true}/>}

                {!isLoading && dataList.children.length > 0 && dataList.children}

                <Box id="paper-footer"
                     sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 4}}>
                    {isLoading ?
                        <Skeleton width="30%" height="2.5rem"/>
                        :
                        dataList.totalPages &&
                        <Pagination
                            count={dataList.totalPages}
                            shape="rounded" color="primary"
                            page={page}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`${location.pathname}?page=${item.page}`}
                                    {...item}
                                />
                            )}/>
                    }
                </Box>
            </Paper>


        </Container>
    );
}

