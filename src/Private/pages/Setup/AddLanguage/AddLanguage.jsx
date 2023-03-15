import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Pagination } from "@mui/material";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import actions from "./store/actions";
import { Delete, Loading } from "App/components";
import apiEndpoints from "Private/config/apiEndpoints";
import FilterLanguage from "./Components/FilterLanguage";
import PageContent from "App/components/Container/PageContent";
import ReportTable from "Private/components/reports/ReportTable";
import LanguageValueModal from "./Components/AddLanguageValueModal";
import NoResults from "Private/pages/Transactions/components/NoResults";

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: "border.main",
}));

const AddLanguage = () => {
    const dispatch = useDispatch();

    const [filterSchema, setFilterSchema] = useState({
        page_size: 10,
        page_number: 1,
    });

    const { loading: getLanguageValueLoading, response: allLanguageValue } = useSelector(
        (state) => state.get_all_language_value,
    );

    const { success: addLanguageValueSuccess, loading: addLanguageValueLoading } = useSelector(
        (state) => state.add_language_value,
    );
    const { success: updateLanguageValueSuccess, loading: updateLanguageValueLoading } = useSelector(
        (state) => state.update_language_value,
    );
    const { success: deleteLanguageValueSuccess, loading: deleteLanguageValueLoading } = useSelector(
        (state) => state.delete_language_value,
    );

    useEffect(() => {
        dispatch(actions.get_all_language_value(filterSchema));
        dispatch({ type: "DELETE_LANGUAGE_VALUE_RESET" });
        dispatch({ type: "UPDATE_LANGUAGE_VALUE_RESET" });
        dispatch({ type: "ADD_LANGUAGE_VALUE_RESET" });
    }, [filterSchema, dispatch, addLanguageValueSuccess, updateLanguageValueSuccess, deleteLanguageValueSuccess]);

    const sortByOptions =
        allLanguageValue?.data?.length > 0 &&
        Object.keys(allLanguageValue?.data[0])?.map((item) => {
            return { value: item, label: item };
        });

    const noOfPage = allLanguageValue?.pagination?.totalPage || 1;

    const handlePageChange = (value) => {
        const updatedSchema = { ...filterSchema, page_number: value };
        setFilterSchema(updatedSchema);
    };

    const handleDelete = (id) => {
        dispatch(actions.delete_language_value(id));
    };

    const columns = useMemo(
        () => [
            {
                Header: "Localization Id",
                accessor: "localization_id",
                maxWidth: 80,
            },
            {
                Header: "Language Key",
                accessor: "localization_key",
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
                Header: "Language Value",
                accessor: "localization_value",
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
                Header: "Translation Type",
                accessor: "translation_type",
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
                        <LanguageValueModal update={true} update_data={row?.original} />
                        <Delete
                            id={row?.original?.localization_id}
                            handleDelete={handleDelete}
                            loading={getLanguageValueLoading}
                            tooltext="Delete Language Value"
                        />
                    </Box>
                ),
            },
        ],
        [],
    );
    return (
        <PageContent
            documentTitle="Add Language"
            title={
                <>
                    <ContentPasteSearchIcon />
                    <Typography>Add Language</Typography>
                </>
            }
        >
            <FilterLanguage sortByOptions={sortByOptions} />
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <LanguageValueModal update={false} />
            </div>
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                {/* {lang_loading && ( */}
                <Grid item xs={12}>
                    <Loading loading={getLanguageValueLoading} />
                </Grid>
                {/* )} */}

                {!getLanguageValueLoading && !allLanguageValue?.data > 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Record Found" />
                    </Grid>
                )}
                {!getLanguageValueLoading && allLanguageValue?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <ReportTable
                            columns={columns}
                            data={allLanguageValue?.data || []}
                            loading={getLanguageValueLoading}
                            apiEndpoint={apiEndpoints.languageValue.get}
                            filterQuery={filterSchema}
                            showExport={false}
                            filename="Language Value Options"
                        />
                    </Grid>
                )}
            </Grid>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                    gap: "1rem",
                }}
            >
                <PageLimitSelect onChange={(e) => setFilterSchema({ ...filterSchema, page_size: e.target.value })} />
                <Pagination
                    count={noOfPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => handlePageChange(value)}
                />
            </div>
        </PageContent>
    );
};

export default AddLanguage;

export const PageLimitSelect = ({ onChange }) => {
    return (
        <select onChange={onChange} style={{ padding: "0.5rem", outline: "none" }}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
        </select>
    );
};
