import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useConfirm } from "App/core/mui-confirm";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import withPermission from "Private/HOC/withPermission";
import UpdatePrivacyPolicy from "./UpdatePrivacyPolicy";
import useListFilterStore from "App/hooks/useListFilterStore";
import PopoverButton from "App/components/Button/PopoverButton";
import DocumentFileTable from "../components/DocumentFileTable";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";
import { ListContentBox, TitleContentBox } from "../components/DocumentContentBox";
import AddPrivacyPolicyContent from "./PrivacyPolicyContents/AddPrivacyPolicyContent";
import ViewPrivacyPolicyContent from "./PrivacyPolicyContents/ViewPrivacyPolicyContent";
import UpdatePrivacyPolicyContent from "./PrivacyPolicyContents/UpdatePrivacyPolicyContent";

import isEmpty from "App/helpers/isEmpty";
import { DocumentFileActions } from "../store";
import AddPrivacyPolicy from "./AddPrivacyPolicy";
import { permissions } from "Private/data/permissions";
import documentFileType from "../data/documentFilteType";

const initialState = {
    page: 1,
    pageSize: 10,
};

const ListPrivacyPolicy = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();

    const methods = useListFilterStore({ initialState, pageNumberKeyName: "page", pageSizeKeyName: "pageSize" });

    const { onPageChange, filterSchema, onRowsPerPageChange } = methods;

    const {
        response: ppDocumentList,
        loading: isLoading,
        error: isError,
    } = useSelector((state) => state.get_document_file_list);

    const { success: l_success } = useSelector((state) => state.add_document_file);

    const { success: u_success } = useSelector((state) => state.update_document_file);

    const { success: f_success } = useSelector((state) => state.delete_document_file);

    const { success: a_success, loading: l_loading } = useSelector((state) => state.add_document_file_content);

    const { success: ul_success } = useSelector((state) => state.update_document_file_content);

    const { success: d_success } = useSelector((state) => state.delete_document_file_content);

    const PpDocumentData = ppDocumentList?.data ?? {};

    const PpDocumentSubData = ppDocumentList?.data?.contents ?? [];

    const fetchPrivacyPolicyDocuments = () => {
        dispatch(
            DocumentFileActions.get_document_file({
                type: documentFileType.PrivacyPolicy,
                ...filterSchema,
            }),
        );
    };

    useEffect(() => {
        fetchPrivacyPolicyDocuments();
    }, [dispatch, filterSchema]);

    useEffect(() => {
        if (u_success || a_success || d_success || ul_success || f_success || l_success) {
            fetchPrivacyPolicyDocuments();
        }
    }, [u_success, a_success, ul_success, d_success, f_success, l_success, dispatch, filterSchema]);

    useEffect(() => {
        if (ul_success) {
            dispatch({
                type: "DELETE_DOCUMENT_FILE_CONTENT_BY_TYPE_RESET",
            });
        }
    }, [ul_success]);

    useEffect(() => {
        if (f_success) {
            dispatch({ type: "DELETE_DOCUMENT_FILE_RESET" });
        }
    }, [f_success]);

    const handleDeleteTitle = () => {
        confirm({
            title: "Delete Privacy Policy?",
            description: "Are you sure you want to delete this Privacy Policy Title?",
            confirmText: "Delete",
        }).then(() => {
            dispatch(
                DocumentFileActions.delete_document_file({
                    type: documentFileType.PrivacyPolicy,
                    id: PpDocumentData?.id,
                }),
            );
        });
    };

    const handleDeleteContent = (id) => {
        confirm({
            title: "Delete Privacy Policy Content?",
            description: "Are you sure you want to delete this Privacy Policy content?",
            confirmText: "Delete",
        }).then(() => {
            dispatch(DocumentFileActions.delete_document_file_content(id));
        });
    };

    const handleUpdateContent = (data) => {
        dispatch(DocumentFileActions.update_document_file_content_by_id(data));
    };

    const handleViewContent = (data) => {
        dispatch(DocumentFileActions.open_view_document_file_content_modal(data));
    };

    const handleOpenAddModal = () => {
        dispatch({ type: "OPEN_ADD_CREATE_FILE_MODAL" });
    };

    const handleOpenUpdateModal = () => {
        dispatch({ type: "OPEN_UPDATE_DOCUMENT_FILE_MODAL" });
    };

    const columns = useMemo(
        () => [
            {
                header: "Order",
                accessorKey: "contentOrder",
            },
            {
                header: "Content Title",
                accessorKey: "content_title",
                cell: ({ row }) => {
                    return <TitleContentBox content={row?.original?.content_title ?? "N/A"} />;
                },
            },

            {
                header: "Content Description",
                accessorKey: "contents",
                cell: ({ row }) => {
                    return <ListContentBox content={row?.original?.contents} />;
                },
            },

            {
                header: "Action",
                accessorKey: "action",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    <HasPermission permission={permissions.READ_DOCUMENT_SETUP}>
                                        <ListItemButton
                                            onClick={() => {
                                                handleViewContent(row?.original);
                                                onClose();
                                            }}
                                        >
                                            View
                                        </ListItemButton>
                                    </HasPermission>

                                    <HasPermission permission={permissions.EDIT_DOCUMENT_SETUP}>
                                        <ListItemButton
                                            onClick={() => {
                                                handleUpdateContent(row?.original);
                                                onClose();
                                            }}
                                        >
                                            Update
                                        </ListItemButton>
                                    </HasPermission>

                                    <HasPermission permission={permissions.DELETE_DOCUMENT_SETUP}>
                                        <ListItemButton
                                            onClick={() => {
                                                handleDeleteContent(row?.original?.contentId);
                                                onClose();
                                            }}
                                        >
                                            Delete
                                        </ListItemButton>
                                    </HasPermission>
                                </>
                            )}
                        </PopoverButton>
                    );
                },
            },
        ],
        [],
    );

    const PPColumn = [{ label: "Title", value: PpDocumentData.title ? PpDocumentData.title : "-" }];

    const HeaderDocumentTitle =
        PpDocumentData &&
        Object.keys(PpDocumentData).length > 0 &&
        PpDocumentData.title != null &&
        PpDocumentData.title !== ""
            ? PpDocumentData.title
            : "-";

    const IsEmptyData = isEmpty(PpDocumentData) && Object.keys(PpDocumentData).length === 0;

    return (
        <PageContentContainer
            title={
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 4,
                    }}
                >
                    <Typography marginLef variant="h5">
                        {HeaderDocumentTitle}
                    </Typography>

                    {IsEmptyData ? (
                        <HasPermission permission={permissions.CREATE_DOCUMENT_SETUP}>
                            <Button fullWidth variant="outlined" color="primary" onClick={handleOpenAddModal}>
                                Add
                            </Button>
                        </HasPermission>
                    ) : (
                        <HasPermission permission={permissions.EDIT_DOCUMENT_SETUP}>
                            <Button variant="outlined" onClick={handleOpenUpdateModal}>
                                Update
                            </Button>
                        </HasPermission>
                    )}
                </Box>
            }
            topRightContent={
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 4,
                    }}
                >
                    <HasPermission permission={permissions.CREATE_DOCUMENT_SETUP}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    dispatch({
                                        type: "OPEN_ADD_CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE",
                                    })
                                }
                            >
                                Add New List
                            </Button>
                        </Grid>
                    </HasPermission>

                    <HasPermission permission={permissions.DELETE_DOCUMENT_SETUP}>
                        <Button fullWidth variant="outlined" color="error" onClick={handleDeleteTitle}>
                            Delete
                        </Button>
                    </HasPermission>
                </Box>
            }
        >
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {isLoading ? (
                        <>
                            <Skeleton variant="rectangular" width="100%" height={80} />
                        </>
                    ) : isError ? (
                        <Typography>No Document file</Typography>
                    ) : (
                        <DocumentFileTable rows={PPColumn} />
                    )}
                </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid item xs>
                        <Typography variant="h6" fontWeight="medium">
                            Privacy Policy List
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                    {isError ? (
                        <Typography>No Data</Typography>
                    ) : (
                        <TanstackReactTable columns={columns} data={PpDocumentSubData} loading={isLoading} />
                    )}
                </Grid>
            </Box>

            <Column>
                <TablePagination
                    paginationData={ppDocumentList?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>

            <AddPrivacyPolicy />
            <UpdatePrivacyPolicy />
            <AddPrivacyPolicyContent />
            <UpdatePrivacyPolicyContent />
            <ViewPrivacyPolicyContent />
        </PageContentContainer>
    );
};

export default withPermission({ permission: [permissions.READ_DOCUMENT_SETUP] })(ListPrivacyPolicy);
