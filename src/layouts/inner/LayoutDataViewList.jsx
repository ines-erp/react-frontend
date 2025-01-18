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
 * @param dataSummary [foo]
 * @param filterView [foo]
 * @param dataList
 * @returns {JSX.Element}
 * @constructor
 */
export const LayoutDataViewList = (
    {
        header,
        dataSummary = {isVisible: false},
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

            <Box id="optional-section" sx={{marginY:8}}>
            {filterView.isVisible &&
                (isLoading ?
                        <Box sx={{display: "flex", gap: 2}}>
                            {Array.from(Array(filterView.limit ?? 3)).map(
                                (index) => (
                                    <Skeleton height="32px" width="10%" variant="rounded" key={index}/>
                                )
                            )}
                        </Box>
                        : filterView.options && filterView.options.length > 0 && (
                        <Box sx={{display: "flex", gap: 1, alignItems: "center", marginBottom:2}}>
                            {filterView.options.map((opt) => {
                                return (
                                    <Badge key={opt.label}
                                           label={opt.label}
                                           isSelected={filterView.field === opt.value}
                                           value={opt.value}
                                           onClick={() => filterView.onClick(opt.value)
                                           }/>
                                )
                            })}
                        </Box>
                    )
                )
            }


            {
                dataSummary.isVisible === true &&
                (isLoading
                    ?
                    <Box sx={{display: "flex", gap: 2, }}>
                        {/*TODO: Extract to a function an reuse it*/}
                        {Array.from(Array(dataSummary.limit ?? 1)).map(
                            (index) => (
                                <Skeleton height="180px" width="25%" variant="rounded" key={index}/>
                            )
                        )}
                    </Box>
                    :
                    <Box id="data-summary" sx={{marginTop:2}}>
                        {dataSummary.filters && dataSummary.filters}
                        {dataSummary.title &&
                            <Typography
                                variant="h2" fontSize="1.5rem"
                                sx={{marginBottom: 2}}>
                                {dataSummary.title}
                            </Typography>
                        }
                        <Box sx={{display: "flex", gap: 2}}>
                            {dataSummary.children}
                        </Box>
                    </Box>)
            }
            </Box>

            <Paper id="main" variant="outlined" sx={{minHeight: "450px", justifyContent: "space-between"}}>
                <Box id="main-header"
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
                        {Array.from(Array(dataList.limit ?? 1)).map((index) =>
                            <Skeleton key={index} variant="rounded" width="100%" height={100}
                                      sx={{padding: 0, margin: 0}}/>
                        )
                        }
                    </Stack>
                }

                {!isLoading && dataList.children.length === 0 && <EmptyState showFilterMessage={true}/>}

                {!isLoading && dataList.children.length > 0 && dataList.children}

                <Box id="main-footer"
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

