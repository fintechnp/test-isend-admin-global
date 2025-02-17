import PageContent from "App/components/Container/PageContent";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
// import actions from "./store/actions";
import { useSelector } from "react-redux";
import ReportTable from "Private/components/reports/ReportTable";
import apiEndpoints from "Private/config/apiEndpoints";
import { Box, Tooltip, Typography, Grid, TablePagination } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Delete, Loading } from "App/components";
import AddLanguageCountry from "./Components/AddLanguageCountry";
import actions from "./store/actions";
import Pagination from "@mui/material/Pagination";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";
import useAuthUser from "Private/hooks/useAuthUser";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";
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

    const { can } = useAuthUser();

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
                header: "Id",
                accessorKey: "language_country_id",
            },
            {
                header: "Language Code",
                accessorKey: "language_code",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {row?.original?.language_code ? row?.original?.language_code : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Language Name",
                accessorKey: "language_name",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {row?.original?.language_name ? row?.original?.language_name : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Country",
                accessorKey: "country",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {row?.original?.country ? row?.original?.country : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {row?.original?.is_active ? "active" : "inactive"}
                        </StyledName>
                    </Box>
                ),
            },
            ...(can([permissions.EDIT_LANGUAGE_COUNTRY, permissions.DELETE_LANGUAGE_COUNTRY])
                ? [
                      {
                          header: () => (
                              <Box textAlign="center">
                                  <Typography>Actions</Typography>
                              </Box>
                          ),
                          accessorKey: "show",
                          cell: ({ row }) => (
                              <Box
                                  sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      //   justifyContent: "center",
                                  }}
                              >
                                  {/* <AddLanguageOption update={true} update_data={row?.original} /> */}
                                  <HasPermission permission={permissions.EDIT_LANGUAGE_COUNTRY}>
                                      <AddLanguageCountry update={true} update_data={row?.original} />
                                  </HasPermission>
                                  <HasPermission permission={permissions.DELETE_LANGUAGE_COUNTRY}>
                                      <Delete
                                          id={row.original.language_country_id}
                                          handleDelete={handleDelete}
                                          loading={languageDataLoading}
                                          tooltext="Delete Delivery Option"
                                      />
                                  </HasPermission>
                              </Box>
                          ),
                      },
                  ]
                : []),
        ],
        [],
    );
    return (
        <PageContent
            documentTitle="Language Setup"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Language Country",
                },
            ]}
        >
            <PageContentContainer title="Language Country">
                <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "1rem" }}
                >
                    <HasPermission permission={[permissions.CREATE_LANGUAGE_COUNTRY]}>
                        <AddLanguageCountry update={false} />
                    </HasPermission>
                </div>
                <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                    <Grid item xs={12}>
                        <Loading loading={languageDataLoading} />
                    </Grid>

                    {!languageDataLoading && !languageData && (
                        <Grid item xs={12}>
                            <NoResults text="No Record Found" />
                        </Grid>
                    )}
                    {!languageDataLoading && languageData?.data?.length > 0 && (
                        <Grid item xs={12}>
                            <TanstackReactTable
                                columns={columns}
                                data={languageData?.data || []}
                                loading={languageDataLoading}
                            />
                        </Grid>
                    )}
                </Grid>
            </PageContentContainer>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_LANGUAGE_COUNTRY] })(LanguageCountry);
