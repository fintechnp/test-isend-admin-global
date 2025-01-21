import Box from "@mui/material/Box";
import { useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";

import { Delete } from "App/components";
import Filter from "../../Reports/Shared/Filter";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import AddLanguageOption from "./Components/AddLanguageOption";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";
import CustomerStatusBadge from "Private/pages/Customers/Search/components/CustomerStatusBadge";

import actions from "./store/actions";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import downloadActions from "../../Reports/store/actions";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";

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

const initialState = {
    page_number: 1,
    page_size: 10,
};

const headers = [
    { label: "Id", key: "language_id" },
    { label: "Language Code", key: "language_code" },
    { label: "Language Name", key: "language_name" },
    { label: "Status", key: "is_active" },
    { label: "Created At", key: "created_ts" },
    { label: "updated At", key: "updated_ts" },
];

function LanguageSetup() {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const { response: languageData, loading: lang_loading } = useSelector((state) => state.get_all_language_option);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_language_option);
    const { success: add_success, loading: add_loading } = useSelector((state) => state.add_language_option);
    const { success: update_success, loading: update_loading } = useSelector((state) => state.update_language_option);

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    const {
        isFilterOpen,
        onPageChange,
        onRowsPerPageChange,
        filterSchema,
        reset,
        closeFilter,
        openFilter,
        onDeleteFilterParams,
        onFilterSubmit,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch(actions.get_all_language_option(filterSchema));
    }, [d_success, add_success, update_success]);

    const handleDelete = (id) => {
        dispatch(actions.delete_language_option(id));
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: languageData?.pagination?.totalCount,
        };
        dispatch(downloadActions.download_report(updatedFilterSchema, "language"));
    };

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "language_id",
            },
            {
                header: "Language Code",
                accessorKey: "language_code",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {getValue() ? getValue() : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Language Name",
                accessorKey: "language_name",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {getValue() ? getValue() : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <CustomerStatusBadge status={getValue() ? "active" : "inActive"} />
                    </Box>
                ),
            },
            ...(can([permissions.EDIT_LANGUAGE_SETUP, permissions.DELETE_LANGUAGE_SETUP])
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

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "language_code",
            label: "Language Code",
        },
    ];

    const csvReport = {
        title: "Report on Language Options",
        start: filterSchema?.from_date,
        end: filterSchema?.to_date,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    return (
        <PageContent
            documentTitle="Language Setup"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Language Setup",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Language Setup"
                    open={isFilterOpen}
                    fields={filterFields}
                    onClose={closeFilter}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                    onReset={reset}
                    onSubmit={onFilterSubmit}
                />
                <PageContentContainer
                    title="Language Setup"
                    topRightContent={
                        <>
                            <HasPermission permission={permissions.CREATE_LANGUAGE_SETUP}>
                                <AddLanguageOption update={false} />
                            </HasPermission>
                            <Filter
                                fileName="Language Options"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                state={filterSchema}
                                downloadData={downloadData}
                            />
                        </>
                    }
                >
                    {/* <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
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
                                    filename="Language Options"
                                />
                            </Grid>
                        )}
                    </Grid> */}

                    <TanstackReactTable columns={columns} data={languageData?.data || []} loading={lang_loading} />
                </PageContentContainer>
            </Column>

            <TablePagination
                paginationData={languageData?.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_LANGUAGE_SETUP] })(LanguageSetup);
