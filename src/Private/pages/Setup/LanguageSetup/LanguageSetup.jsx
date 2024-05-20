import PageContent from "App/components/Container/PageContent";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import actions from "./store/actions";
import { useSelector } from "react-redux";
import ReportTable from "Private/components/reports/ReportTable";
import apiEndpoints from "Private/config/apiEndpoints";
import { Box, Tooltip, Typography, Grid } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Delete, Loading } from "App/components";
import AddDeliveryOption from "../DeliveryOption/components/AddDeliveryOption";
import AddLanguageOption from "./Components/AddLanguageOption";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";
import useAuthUser from "Private/hooks/useAuthUser";

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

function LanguageSetup() {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const { response: languageData, loading: lang_loading } = useSelector((state) => state.get_all_language_option);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_language_option);
    const { success: add_success, loading: add_loading } = useSelector((state) => state.add_language_option);
    const { success: update_success, loading: update_loading } = useSelector((state) => state.update_language_option);
    useEffect(() => {
        dispatch(actions.get_all_language_option());
    }, [d_success, add_success, update_success]);

    const handleDelete = (id) => {
        dispatch(actions.delete_language_option(id));
    };

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "language_id",
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
                            {data.value ? "Active" : "Inactive"}
                        </StyledName>
                    </Box>
                ),
            },
            ...(can([permissions.EDIT_LANGUAGE_SETUP, permissions.DELETE_LANGUAGE_SETUP])
                ? [
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
                                  <HasPermission permission={permissions.EDIT_LANGUAGE_SETUP}>
                                      <AddLanguageOption update={true} update_data={row?.original} />
                                  </HasPermission>
                                  <HasPermission permission={permissions.DELETE_LANGUAGE_SETUP}>
                                      <Delete
                                          id={row.original.language_id}
                                          handleDelete={handleDelete}
                                          loading={lang_loading}
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
            title={
                <>
                    <ContentPasteSearchIcon />
                    <Typography>Language Setup</Typography>
                </>
            }
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <HasPermission permission={permissions.CREATE_LANGUAGE_SETUP}>
                    <AddLanguageOption update={false} />
                </HasPermission>
            </div>
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                {lang_loading && (
                    <Grid item xs={12}>
                        <Loading loading={lang_loading} />
                    </Grid>
                )}

                {!lang_loading && !languageData && (
                    <Grid item xs={12}>
                        <NoResults text="No Record Found" />
                    </Grid>
                )}
                {!lang_loading && languageData?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <ReportTable
                            columns={columns}
                            data={languageData?.data || []}
                            loading={lang_loading}
                            apiEndpoint={apiEndpoints.language.get}
                            // filterQuery={filterSchema}
                            filename="Language Options"
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_LANGUAGE_SETUP] })(LanguageSetup);
