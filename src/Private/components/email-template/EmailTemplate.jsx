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
            },
            {
                header: "Created By",
                accessorKey: "created_by",
            },

            {
                header: "Created At",
                cell: ({ row }) => {
                    return <Typography>{dateUtils.getFormattedDate(row.original.created_ts)}</Typography>;
                },
            },
            {
                header: "Updated At",
                cell: ({ row }) => {
                    if (row?.original?.updated_ts) {
                        return <Typography>{dateUtils.getFormattedDate(row.original.updated_ts)}</Typography>;
                    } else {
                        return <Typography>N/A</Typography>;
                    }
                },
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
        <PageContent>
            <EmailTemplateFilterForm onSubmit={handleSearch} onReset={handleReset} loading={isLoading} />

            <TanstackReactTable
                columns={columns}
                title="Email Template"
                data={response?.data ?? []}
                loading={isLoading}
                renderPagination={() => (
                    <TablePagination
                        paginationData={response?.data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
};

export default EmailTemplate;
