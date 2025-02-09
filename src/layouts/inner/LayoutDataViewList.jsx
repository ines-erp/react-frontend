import {Box, Container, Pagination, Paper, Skeleton, Stack, Typography} from "@mui/material";
import {PageHeader} from "@/components/ui/PageHeader.jsx";
import {Badge} from "@/components/base/Badge.jsx";
import {EmptyState} from "@/components/ui/EmptyState.jsx";
import {useSearchParams} from "react-router-dom";

// TODO Would be nice if we check for each node that could be a React element and if we pass a react element as props we do prefer to render the passed element instead of the default element

/**
 * A reusable layout component for displaying data in a list format, with optional header, middle section, filters, and pagination.
 *
 * @param {object} header - Configuration for the header section.
 * @param {string} header.title - The title displayed in the header.
 * @param {object} header.breadcrumbs - The list of the previous paths, and the string current page to be rendered in the breadcrumbs.
 * @param {React.ReactNode} [header.actionButton] - An optional action button to display in the header.
 * @param {object} [middleSection] - Configuration for the optional middle section.
 * @param {boolean} [middleSection.isVisible] - Whether to display the middle section.
 * @param {string} [middleSection.title] - The title displayed in the middle section.
 * @param {React.ReactNode} [middleSection.content] - The content of the middle section.
 * @param {React.ReactNode} [middleSection.filters] - Additional filter elements for the middle section.
 * @param {number} [middleSection.limit] - Number of skeleton elements to display during loading.
 * @param {object} dataList - Configuration for the data list section.
 * @param {string} dataList.title - The title displayed above the data list.
 * @param {Array<React.ReactNode>} dataList.items - The data items to display in the list.
 * @param {React.ReactNode} [dataList.actions] - Optional action buttons for the data list.
 * @param {number} [dataList.totalPages] - The total number of pages for pagination.
 * @param {number} [dataList.limit] - Number of skeleton elements to display during loading.
 * @param {object} [badgeFilters] - Configuration for the data list filter section.
 * @param {boolean} [badgeFilters.isVisible] - Whether to display the filter section.
 * @param {Array<{label: string, value: any}>} [badgeFilters.options] - Array of filter options.
 * @param {string} [badgeFilters.field] - The currently selected filter value.
 * @param {function} [badgeFilters.onClick] - Callback function when a filter option is clicked.
 * @param {number} [badgeFilters.limit] - Number of skeleton elements to display during loading.
 */
export const LayoutDataViewList = ({
                                       header,
                                       middleSection = {isVisible: false},
                                       dataList,
                                       badgeFilters = {isVisible: false, options: []},
                                   }) => {
    const isLoading = !dataList.items;

    const [currentQueryParams, setCurrentQueryParams] = useSearchParams();

    const query = new URLSearchParams(currentQueryParams);
    const page = parseInt(query.get('page') || '1', 10);

    const handleChangePage = (event, value) => {
        query.set('page', value);
        setCurrentQueryParams(query);
    };


    const renderBadgeFilters = () => {
        if (isLoading) {
            return (<Box sx={{display: "flex", gap: 2, marginBottom: 2}}>
                {Array.from(Array(badgeFilters.limit ?? 3)).map((_, index) => (
                    <Skeleton key={index} sx={{borderRadius: 20}} height="32px" width="10%" variant="rounded"/>))}
            </Box>);
        }

        return (<Box sx={{display: "flex", gap: 1, alignItems: "center", marginBottom: 2}}>
            {badgeFilters.options && badgeFilters.options.map((opt) => (
                <Badge key={opt.label}
                       label={opt.label}
                       isSelected={badgeFilters.field === opt.value}
                       value={opt.value}
                       onClick={() => badgeFilters.onClick(opt.value)}/>
            ))}
        </Box>);
    };

    const renderMiddleSection = () => {
        if (isLoading) {
            return (<Box sx={{marginTop: 2}}>
                {middleSection.title && <Skeleton width={"15%"} height="32px" variant="rounded"/>}
                <Box sx={{display: "flex", gap: 2, marginTop: 1}}>
                    {Array.from(Array(middleSection.limit ?? 1)).map((_, index) => (
                        <Skeleton key={index} height="180px" width="25%" variant="rounded"/>))}
                </Box>
            </Box>);
        }

        return (<Box id="data-summary" sx={{marginTop: 2}}>
            {middleSection.filters && middleSection.filters}
            {middleSection.title && <Typography
                variant="h2" fontSize="1.5rem"
                sx={{marginBottom: 2}}>
                {middleSection.title}
            </Typography>}
            <Box sx={{display: "flex", gap: 2}}>
                {middleSection.content}
            </Box>
        </Box>);
    };

    const renderDataListHeader = () => {
        if (isLoading) {
            return (<>
                <Skeleton width="75%" height="3.5rem"/>
                {dataList.actions && <Skeleton width="15%" height="3.5rem"/>}
            </>);
        }
        return (<>
            <Typography
                variant={"h2"}
                fontSize={"1.5rem"}
                sx={{textTransform: "capitalize"}}>
                {dataList.title}
            </Typography>
            {dataList.actions}
        </>);
    };

    const renderDataListBody = () => {
        if (isLoading) {
            return (
                <Stack spacing={1} sx={{flexGrow: 1}}>
                    {Array.from(Array(dataList.limit ?? 1)).map((_, index) =>
                        <Skeleton key={index} variant="rounded"
                                  width="100%" height={100}
                                  sx={{padding: 0, margin: 0}}
                        />)}
                </Stack>
            );
        }

        if (!dataList.items) return null;

        if (dataList.items.length === 0) return <EmptyState showFilterMessage={true}/>;

        return <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", gap: 2}}>{dataList.items}</Box>;
    };

    const renderDataListFooter = () => {
        if (isLoading) {
            return (
                <Skeleton width="30%" height="2.5rem"/>);
        }
        return (
            dataList.totalPages && <Pagination
                count={dataList.totalPages}
                shape="rounded" color="primary"
                page={page}
                onChange={handleChangePage}
            />);
    };

    return (
        <Container>
            <PageHeader title={header.title} actionButton={header.actionButton} isLoading={isLoading} breadcrumbs={header.breadcrumbs}/>

            <Box id="optional-section" sx={{marginY: 8}}>
                {badgeFilters.isVisible && renderBadgeFilters()}

                {middleSection.isVisible && renderMiddleSection()}
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
};