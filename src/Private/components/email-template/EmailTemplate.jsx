import React, { useState, useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import dateUtils from "App/utils/dateUtils";
import Table, { TablePagination } from "App/components/Table";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import PageContent from "App/components/Container/PageContent";
import EmailTemplateFilterForm from "./Filter/EmailTemplateFilterForm";
import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";
import PageContentContainer from "App/components/Container/PageContentContainer";
import HasPermission from "../shared/HasPermission";
import { Box, Button } from "@mui/material";
import Column from "App/components/Column/Column";

const initialState = {
    PageNumber: 1,
    PageSize: 10,
};

const EmailTemplate = () => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);
    const { can } = useAuthUser();

    const { response, loading: isLoading } = useSelector((state) => state.get_email_templates);

    const { success: isAddSuccess } = useSelector((state) => state.add_email_template);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_email_template);

    useEffect(() => {
        dispatch(emailTemplateActions.get_email_templates(filterSchema));
    }, [dispatch, filterSchema, isAddSuccess, isUpdateSuccess]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Template Type",
                accessorKey: "template_type",
            },
            {
                header: "Template For",
                accessorKey: "template_for",
            },
            {
                header: "Email Subject",
                accessorKey: "email_subject",
            },
            {
                header: "Is Active ?",
                accessorKey: "is_active",
                cell: ({ getValue }) => <Box>{getValue() ? "Yes" : "No"}</Box>,
            },
            {
                header: "Created Status",
                accessorKey: "created_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                        <Typography>By: {row.original.created_by}</Typography>
                    </Column>
                ),
            },
            {
                header: "Updated Status",
                accessorKey: "updated_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                        {row.original.updated_by && <Typography>By: {row.original.updated_by}</Typography>}
                    </Column>
                ),
            },
            ...(can(permissions.EDIT_EMAIL_TEMPLATE)
                ? [
                      {
                          header: "Actions",
                          accessorKey: "show",
                          cell: ({ row }) => (
                              <TableRowActionContainer>
                                  <IconButton
                                      onClick={() =>
                                          dispatch({
                                              type: "OPEN_UPDATE_EMAIL_TEMPLATE_MODAL",
                                              payload: row.original,
                                          })
                                      }
                                  >
                                      <EditOutlinedIcon
                                          sx={{
                                              fontSize: "20px",
                                              "&:hover": {
                                                  background: "transparent",
                                              },
                                          }}
                                      />
                                  </IconButton>
                              </TableRowActionContainer>
                          ),
                      },
                  ]
                : []),
        ],
        [],
    );

    const handleReset = () => {
        dispatch(emailTemplateActions.get_email_templates(initialState));
    };

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            PageNumber: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            PageNumber: 1,
            PageSize: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleSearch = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            ...data,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <>
            <EmailTemplateFilterForm onSubmit={handleSearch} onReset={handleReset} loading={isLoading} />
            <PageContentContainer
                title="Email Templates"
                topRightContent={
                    <HasPermission permission={permissions.CREATE_EMAIL_TEMPLATE}>
                        <Button
                            variant="contained"
                            onClick={() =>
                                dispatch({
                                    type: "OPEN_ADD_EMAIL_TEMPLATE_MODAL",
                                })
                            }
                        >
                            Create Email Template
                        </Button>
                    </HasPermission>
                }
            >
                <TanstackReactTable
                    columns={columns}
                    title="Email Template"
                    data={response?.data ?? []}
                    loading={isLoading}
                />
            </PageContentContainer>
            <TablePagination
                paginationData={response?.pagination}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
};

export default EmailTemplate;
