import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import AddEmailElementModal from "./AddEmailElementModal";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import AddEmailTemplateModal from "Private/components/email-template/AddEmailTemplateModal";
import EditEmailTemplateModal from "Private/components/email-template/EditEmailTemplateModal";

import dateUtils from "App/utils/dateUtils";
import routePaths from "Private/config/routePaths";
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
    const navigate = useNavigate();

    const { success: isAddSuccess } = useSelector((state) => state.add_email_template);
    const { success: isUpdateSuccess } = useSelector((state) => state.update_email_template);
    const { response, loading: isLoading } = useSelector((state) => state.get_email_templates);

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
                        {row.original.created_by && <Typography>By: {row.original.created_by}</Typography>}
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
                              <PopoverButton>
                                  {({ onClose }) => (
                                      <HasPermission permission={permissions.EDIT_EMAIL_TEMPLATE}>
                                          <ListItemButton
                                              onClick={() => {
                                                  onClose();
                                                  dispatch({
                                                      type: "OPEN_UPDATE_EMAIL_TEMPLATE_MODAL",
                                                      payload: row.original,
                                                  });
                                              }}
                                          >
                                              Edit
                                          </ListItemButton>
                                      </HasPermission>
                                  )}
                              </PopoverButton>
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
                            <PopoverButton>
                                {({ onClose }) => (
                                    <>
                                        <HasPermission permission={permissions.CREATE_EMAIL_TEMPLATE}>
                                            <ListItemButton
                                                onClick={() => {
                                                    onClose();
                                                    dispatch({
                                                        type: "OPEN_ADD_EMAIL_TEMPLATE_MODAL",
                                                    });
                                                }}
                                            >
                                                Create Email Template
                                            </ListItemButton>
                                        </HasPermission>
                                        {/* <HasPermission permission={permissions.CREATE_EMAIL_ELEMENT}> */}
                                        <ListItemButton
                                            onClick={() => {
                                                dispatch({
                                                    type: "OPEN_ADD_EMAIL_ELEMENT_MODAL",
                                                });
                                            }}
                                        >
                                            Create Email Element
                                        </ListItemButton>
                                        {/* </HasPermission> */}
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(routePaths.ListEmailElement);
                                            }}
                                        >
                                            List Email Element
                                        </ListItemButton>
                                    </>
                                )}
                            </PopoverButton>
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
            <AddEmailElementModal />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_EMAIL_TEMPLATE] })(ListEmailTemplate);
