import Box from "@mui/material/Box";
import React, { useEffect, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import AddEmailTemplateModal from "Private/components/email-template/AddEmailTemplateModal";
import EditEmailTemplateModal from "Private/components/email-template/EditEmailTemplateModal";

import dateUtils from "App/utils/dateUtils";
import useAuthUser from "Private/hooks/useAuthUser";
import HasPermission from "../shared/HasPermission";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import useListFilterStore from "App/hooks/useListFilterStore";
import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";

const initialState = {
    PageNumber: 1,
    PageSize: 10,
    OrderBy: "desc",
    SortBy: "created_ts",
};

const sortByData = [
    {
        key: "Email Subject",
        value: "email_subject",
    },
    {
        key: "Template Type",
        value: "template_type",
    },
];

function ListEmailTemplate() {
    const dispatch = useDispatch();
    const { can } = useAuthUser();

    const { response, loading: isLoading } = useSelector((state) => state.get_email_templates);
    const { success: isAddSuccess } = useSelector((state) => state.add_email_template);
    const { success: isUpdateSuccess } = useSelector((state) => state.update_email_template);

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            label: "Search",
            name: "Search",
        },
    ];

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onQuickFilter,
        onRowsPerPageChange,
        onFilterSubmit,
        onPageChange,
        onDeleteFilterParams,
        reset,
    } = useListFilterStore({
        initialState,
        pageNumberKeyName: "PageNumber",
        pageSizeKeyName: "PageSize",
    });

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

    useEffect(() => {
        dispatch(emailTemplateActions.get_email_templates(filterSchema));
    }, [dispatch, filterSchema, isAddSuccess, isUpdateSuccess]);

    return (
        <PageContent
            documentTitle="Email Templates"
            breadcrumbs={[
                {
                    label: "Email Templates",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                    title="Search Customers"
                    onReset={reset}
                />
                <PageContentContainer
                    title="Email Templates"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={isLoading}
                                sortByData={sortByData}
                                values={filterSchema}
                                orderByFieldName="OrderBy"
                                sortByFieldName="SortBy"
                                orderData={[
                                    { key: "Ascending", value: "asc" },
                                    { key: "Descending", value: "desc" },
                                ]}
                            />

                            <HasPermission permission={permissions.CREATE_EMAIL_TEMPLATE}>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        dispatch({
                                            type: "OPEN_ADD_EMAIL_TEMPLATE_MODAL",
                                        });
                                    }}
                                >
                                    Create Email Template
                                </Button>
                            </HasPermission>
                        </>
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
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
            <AddEmailTemplateModal />
            <EditEmailTemplateModal />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_EMAIL_TEMPLATE] })(ListEmailTemplate);
