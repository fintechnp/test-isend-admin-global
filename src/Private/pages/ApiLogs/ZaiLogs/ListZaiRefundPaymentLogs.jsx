import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useCallback, useEffect, useMemo } from "react";

import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterForm from "App/components/Filter/FilterForm";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "../../PaymentProcess/store/actions";
import { ZaiLogsType } from "../../PaymentProcess/ZaiAustraliaPayment/data/zaiLogsType";
import ViewZaiLogsModal from "./components/ViewZaiLogsModal";

const initialState = {
    PageNumber: 1,
    PageSize: 10,
};

const ListZaiRefundPaymentLogs = () => {
    const methods = useListFilterStore({ initialState, pageNumberKeyName: "PageNumber", pageSizeKeyName: "PageSize" });

    const dispatch = useDispatch();

    const {
        isFilterOpen,
        onFilterSubmit,
        closeFilter,
        onQuickFilter,
        openFilter,
        onDeleteFilterParams,
        reset,
        filterSchema,
        onPageChange,
        onRowsPerPageChange,
    } = methods;

    const { response, loading: l_loading } = useSelector((state) => state.get_zai_refund_logs);

    const {
        is_modal_open: isOpen,
        loading: isLoading,
        success: isSuccess,
        initial_form_data,
    } = useSelector((state) => state.get_zai_payment_logs);

    useEffect(() => {
        dispatch(actions.get_zai_refund_logs(filterSchema));
    }, [dispatch, filterSchema]);

    const handleModalClose = useCallback(() => {
        dispatch(actions.close_zai_payment_modal());
    });

    const logData = response.data;

    const columns = useMemo(() => [
        {
            header: "S.N",
            accessorKey: "f_serial_no",
        },

        {
            header: "Customer Name",
            accessorKey: "customer_name",
        },

        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Refund Amount",
            accessorKey: "refund_amount",
        },
        {
            header: "Refund Status",
            accessorKey: "refund_status",
        },
        {
            header: "Remarks",
            accessorKey: "remarks",
        },
        {
            header: "Transaction Amount",
            accessorKey: "transaction_amount",
        },

        {
            header: "Transaction Currency",
            accessorKey: "transaction_currency",
        },
        {
            header: "Updated By",
            accessorKey: "updated_by",
        },

        {
            header: "Created Date",
            accessorKey: "created_ts",
            cell: ({ getValue }) => (
                <>
                    <Typography>{getValue() ? dateUtils.getFormattedDate(getValue(), "MM/DD/YYYY") : "-"}</Typography>
                    <Typography variant="body2">
                        {getValue() ? dateUtils.getFormattedDate(getValue(), "hh:mm A") : "-"}
                    </Typography>
                </>
            ),
        },
        {
            header: "Updated Date",
            accessorKey: "updated_ts",
            cell: ({ getValue }) => (
                <>
                    <Typography>{getValue() ? dateUtils.getFormattedDate(getValue(), "MM/DD/YYYY") : "-"}</Typography>
                    <Typography variant="body2">
                        {getValue() ? dateUtils.getFormattedDate(getValue(), "hh:mm A") : "-"}
                    </Typography>
                </>
            ),
        },
        {
            header: "Webhook Status",
            accessorKey: "webhook_status_description",
        },

        {
            header: "Reference No",
            accessorKey: "reference_no",
        },
        {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => {
                return (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ListItemButton
                                    onClick={() => {
                                        dispatch(actions.open_zai_payment_modal(row?.original));
                                    }}
                                >
                                    View
                                </ListItemButton>
                            </>
                        )}
                    </PopoverButton>
                );
            },
        },
    ]);

    const filterFields = [
        {
            type: "textfield",
            label: "Customer ID",
            name: "CustomerId",
        },

        {
            type: "textfield",
            label: "Transaction ID",
            name: "TransactionId",
        },
        {
            type: "textfield",
            label: "Withdrawal ID",
            name: "WithdrawalId",
        },
        {
            type: "textfield",
            label: "User ID",
            name: "UserId",
        },
    ];

    const sortData = {};

    return (
        <PageContent
            documentTitle="Zai Refund Logs"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Zai Refund Logs"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer title="Zai Refund Logs List">
                    <TanstackReactTable columns={columns} data={logData || []} loading={l_loading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />

                <ViewZaiLogsModal
                    title="View Zai Refund Details"
                    isOpen={isOpen}
                    handleClose={handleModalClose}
                    isLoading={isLoading}
                    initial_values={initial_form_data}
                    logType={ZaiLogsType.ZAI_REFUND_LOGS}
                />
            </Column>
        </PageContent>
    );
};

export default ListZaiRefundPaymentLogs;
