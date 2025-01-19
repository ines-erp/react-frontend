import {
    Box, Container, Pagination, PaginationItem, Paper, Skeleton, Stack, Typography
} from "@mui/material";
import {PageHeader} from "@/components/ui/PageHeader.jsx";
import {Badge} from "@/components/base/Badge.jsx";
import {EmptyState} from "@/components/ui/EmptyState.jsx";
import {Link, useLocation} from "react-router-dom";

/**
 *
 * @param header {{title:string, actionButton:ReactNode || foo}}
 * @param dataSummary {{isVisible:boolean }} [foo]
 * @param filterView {{}} [foo]
 * @param dataList
 * @returns {JSX.Element}
 * @constructor
 */

export const LayoutDataViewList = ({
                                       header,
                                       dataSummary = {isVisible: false},
                                       filterView = {isVisible: false, options: []},
                                       dataList,
                                   }) => {
    const isLoading = !dataList.children;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const renderFilterView = () => {
        if (isLoading) {
            return (<Box sx={{display: "flex", gap: 2, maginBottom: 2}}>
                {Array.from(Array(filterView.limit ?? 3)).map((index) => (
                    <Skeleton sx={{borderRadius: 20}} height="32px" width="10%" variant="rounded" key={index}/>))}
            </Box>)
        }

        return (<Box sx={{display: "flex", gap: 1, alignItems: "center", marginBottom: 2}}>
            {filterView.options && filterView.options.map((opt) => {
                return (<Badge key={opt.label}
                               label={opt.label}
                               isSelected={filterView.field === opt.value}
                               value={opt.value}
                               onClick={() => filterView.onClick(opt.value)}/>)
            })}
        </Box>)
    }

    const renderDataSummary = () => {
        if (isLoading) {
            return (<Box sx={{marginTop: 2}}>
                {/*TODO: Extract to a function an reuse it*/}
                {dataSummary.title && <Skeleton width={"15%"} height="32px" variant="rounded"/>}
                <Box sx={{display: "flex", gap: 2, marginTop: 1}}>
                    {Array.from(Array(dataSummary.limit ?? 1)).map((index) => (
                        <Skeleton height="180px" width="25%" variant="rounded" key={index}/>))}
                </Box>
            </Box>)
        }

        return (<Box id="data-summary" sx={{marginTop: 2}}>
            {dataSummary.filters && dataSummary.filters}
            {dataSummary.title && <Typography
                variant="h2" fontSize="1.5rem"
                sx={{marginBottom: 2}}>
                {dataSummary.title}
            </Typography>}
            <Box sx={{display: "flex", gap: 2}}>
                {dataSummary.children}
            </Box>
        </Box>)
    }

    const renderDataListHeader = () => {
        if (isLoading) {
            return (<>
                <Skeleton width="75%" height="3.5rem"/>
                {dataList.actionButtons && <Skeleton width="15%" height="3.5rem"/>}
            </>)
        }
        return (<>
            <Typography
                variant={"h2"}
                fontSize={"1.5rem"}
                sx={{textTransform: "capitalize"}}>
                {dataList.title}
            </Typography>
            {dataList.actionButtons}
        </>)
    }

    const renderDataListBody = () => {
        if (isLoading) {
            return (
                <Stack spacing={1}>
                    {Array.from(Array(dataList.limit ?? 1)).map((index) =>
                        <Skeleton key={index} variant="rounded"
                                  width="100%" height={100}
                                  sx={{padding: 0, margin: 0}}
                        />)}
                </Stack>
            )
        }

        if (!dataList.children) return null;

        if (dataList.children.length === 0) return <EmptyState showFilterMessage={true}/>

        if (dataList.children.length > 0) return dataList.children
    }

    const renderDataListFooter = () => {
        if (isLoading) {
            return (
                <Skeleton width="30%" height="2.5rem"/>)
        }
        return (
            dataList.totalPages && <Pagination
                count={dataList.totalPages}
                shape="rounded" color="primary"
                page={page}
                renderItem={(item) => (<PaginationItem
                    component={Link}
                    to={`${location.pathname}?page=${item.page}`}
                    {...item}
                />)}/>)
    }

    return (
        <Container>
            <PageHeader title={header.title} actionButton={header.actionButton} isLoading={isLoading}/>

            <Box id="optional-section" sx={{marginY: 8}}>
                {filterView.isVisible && renderFilterView()}

                {dataSummary.isVisible === true && renderDataSummary()}
            </Box>

            <Paper id="main" variant="outlined" sx={{minHeight: "450px", justifyContent: "space-between"}}>
                <Box id="main-header"
                     sx={{
                         display: "flex",
                         justifyContent: "space-between",
                         alignItems: "center",
                         gap: 2
                     }}
                >
                    {renderDataListHeader()}
                </Box>

                {renderDataListBody()}

                <Box id="main-footer"
                     sx={
                         {
                             display: "flex",
                             justifyContent: "flex-end",
                             alignItems: "center",
                             marginTop: 4
                         }
                     }>
                    {renderDataListFooter()}
                </Box>

            </Paper>
        </Container>
    );
}

