import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useCallback, useEffect, useMemo } from "react";

import isEmpty from "App/helpers/isEmpty";
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

const ListZaiWebhookLogs = () => {
    const methods = useListFilterStore({ initialState, pageNumberKeyName: "PageNumber", pageSizeKeyName: "PageSize" });

    const dispatch = useDispatch();

    const {
        isFilterOpen,
        onFilterSubmit,
        closeFilter,
        openFilter,
        onDeleteFilterParams,
        reset,
        filterSchema,
        onPageChange,
        onRowsPerPageChange,
    } = methods;

    const { response, loading: l_loading } = useSelector((state) => state.get_zai_logs);

    const {
        is_modal_open: isOpen,
        loading: isLoading,
        success: isSuccess,
        initial_form_data,
    } = useSelector((state) => state.get_zai_payment_logs);

    useEffect(() => {
        dispatch(
            actions.get_zai_logs({
                ...filterSchema,
                ShowAll: false,
            }),
        );
    }, [dispatch, filterSchema]);

    const logData = response.data;

    const handleModalClose = useCallback(() => {
        dispatch(actions.close_zai_payment_modal());
    });

    const handlePaymentSuccess = (data) => {
        dispatch(actions.refund_payment(data));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.close_zai_payment_modal());
        }
    });

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
            header: "Customer ID",
            accessorKey: "customer_id",
        },

        {
            header: "Transaction ID",
            accessorKey: "transaction_id",
        },
        {
            header: "User ID",
            accessorKey: "user_id",
        },
        {
            header: "Payment Amount",
            accessorKey: "payment_amount",
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
            header: "Debtor Name",
            accessorKey: "debtor_name",
            cell: ({ getValue }) => (!isEmpty(getValue()) ? getValue() : "N/A"),
        },
        {
            header: "Created Date",
            accessorKey: "created_ts",
            cell: ({ getValue }) => (
                <>
                    <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                    <Typography variant="body2">
                        {dateUtils.getLocalTimeFromUTC(getValue() ? getValue() : getValue())}
                    </Typography>
                </>
            ),
        },
        {
            header: "Updated Date",
            accessorKey: "updated_ts",
            cell: ({ getValue }) => (
                <>
                    <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                    <Typography variant="body2">
                        {dateUtils.getLocalTimeFromUTC(getValue() ? getValue() : getValue())}
                    </Typography>
                </>
            ),
        },

        {
            header: "Status",
            accessorKey: "status_description",
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
            label: "User ID",
            name: "UserId",
        },
    ];

    const sortData = {};

    return (
        <PageContent
            documentTitle="Zai Webhook Logs"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Zai Webhook Logs"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer title="Zai Webhook Logs List">
                    <TanstackReactTable columns={columns} data={logData || []} loading={l_loading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>

            <ViewZaiLogsModal
                title="View Zai Webhook Details"
                isOpen={isOpen}
                handleClose={handleModalClose}
                isLoading={isLoading}
                initial_values={initial_form_data}
                logType={ZaiLogsType.ZAI_WEBHOOK_LOGS}
            />
        </PageContent>
    );
};

export default ListZaiWebhookLogs;
