import PageContent from "App/components/Container/PageContent";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
// import actions from "./store/actions";
import { useSelector } from "react-redux";
import ReportTable from "Private/components/reports/ReportTable";
import apiEndpoints from "Private/config/apiEndpoints";
import { Box, Tooltip, Typography, Grid } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Delete, Loading } from "App/components";
import AddLanguageCountry from "./Components/AddLanguageCountry";
import actions from "./store/actions";
import Pagination from "@mui/material/Pagination";
// import AddDeliveryOption from "../DeliveryOption/components/AddDeliveryOption";
// import AddLanguageOption from "./Components/AddLanguageOption";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: "border.main",
}));

function LanguageCountry() {
    const dispatch = useDispatch();

    const [filterSchema, setFilterSchema] = useState({
        page_size: 10,
        page_number: 1,
    });

    const { success: addLanguageCountrySuccess, loading: addLanguageCountryLoading } = useSelector(
        (state) => state.add_language_country,
    );
    const { success: deleteLanguageCountrySuccess, loading: deleteLanguageCountryLoading } = useSelector(
        (state) => state.update_language_country,
    );
    const { success: updateLanguageCountrySuccess, loading: updateLanguageCountryLoading } = useSelector(
        (state) => state.update_language_country,
    );

    // useEffect(() => {
    //     dispatch(actions.get_all_language_country());
    // }, []);
    useEffect(() => {
        dispatch(actions.get_all_language_country(filterSchema));
        dispatch({ type: "DELETE_LANGUAGE_COUNTRY_RESET" });
    }, [deleteLanguageCountrySuccess, updateLanguageCountrySuccess, addLanguageCountrySuccess, dispatch, filterSchema]);

    const { response: languageData, loading: languageDataLoading } = useSelector(
        (state) => state.get_all_language_country,
    );
    console.log("🚀 ~ file: LanguageCountry.jsx:54 ~ LanguageCountry ~ languageData:", languageData);
    const noOfPage = languageData?.pagination?.totalPage || 1;

    const handleDelete = (id) => {
        dispatch(actions.delete_language_country(id));
    };

    const handlePageChange = (value) => {
        const updatedSchema = { ...filterSchema, page_number: value };
        setFilterSchema(updatedSchema);
    };

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "language_country_id",
                maxWidth: 80,
            },
            {
                Header: "Language Code",
                accessor: "language_code",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {data.value ? data.value : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Language Name",
                accessor: "language_name",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {data.value ? data.value : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {data.value ? data.value : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Status",
                accessor: "is_active",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {data.value ? "active" : "inactive"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessor: "show",
                Cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        {/* <AddLanguageOption update={true} update_data={row?.original} /> */}
                        <AddLanguageCountry update={true} update_data={row?.original} />
                        <Delete
                            id={row.original.language_country_id}
                            handleDelete={handleDelete}
                            loading={languageDataLoading}
                            tooltext="Delete Delivery Option"
                        />
                    </Box>
                ),
            },
        ],
        [],
    );
    return (
        <PageContent
            documentTitle="Language Setup"
            title={
                <>
                    <ContentPasteSearchIcon />
                    <Typography>Language Country</Typography>
                </>
            }
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <AddLanguageCountry update={false} />
            </div>
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                {/* {lang_loading && ( */}
                <Grid item xs={12}>
                    <Loading loading={languageDataLoading} />
                </Grid>
                {/* )} */}

                {!languageDataLoading && !languageData && (
                    <Grid item xs={12}>
                        <NoResults text="No Record Found" />
                    </Grid>
                )}
                {!languageDataLoading && languageData?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <ReportTable
                            columns={columns}
                            data={languageData?.data || []}
                            loading={languageDataLoading}
                            apiEndpoint={apiEndpoints.languageCountry.get}
                            filterQuery={filterSchema}
                            filename="Language Country Options"
                        />
                    </Grid>
                )}
            </Grid>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "1rem" }}>
                <Pagination
                    count={noOfPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => handlePageChange(value)}
                />
            </div>
        </PageContent>
    );
}

export default LanguageCountry;
