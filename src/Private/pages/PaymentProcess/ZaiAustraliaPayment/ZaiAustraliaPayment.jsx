import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { ReferenceName, getFormattedDate, getFormattedTime } from "App/helpers";

import actions from "../store/actions";
import ViewBalance from "./ViewBalance";
import ZaiFilterForm from "./SearchForm";
import PopoverAction from "./ViewBalance/PopoverAction";
import RefundPaymentModal from "./RefundPayment/RefundPaymentModal";
import MakePaymentModal from "./MakePayment/MakePaymentModal";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import FilterForm from "App/components/Filter/FilterForm";
import Column from "App/components/Column/Column";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import { TablePagination } from "App/components/Table";
import referenceTypeId from "Private/config/referenceTypeId";

const initialState = {
    page_number: 1,
    page_size: 15,
    from_date: "",
    to_date: "",
    order_by: "DESC",
    sort_by: "created_ts",
};

const ZaiAustraliaPayment = () => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const reference = JSON.parse(localStorage.getItem("reference"));

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onQuickFilter,
        onRowsPerPageChange,
        onFilterSubmit,
        onPageChange,
        reset,
        onDeleteFilterParams,
    } = useListFilterStore({
        initialState,
    });

    const { reset: formReset } = useForm();

    const [showBalance, setShowBalance] = useState({
        isOpen: false,
        customerId: null,
    });

    const [showPayment, setShowPayment] = useState({
        isOpen: false,
        customerId: null,
        customerName: null,
        transactionId: null,
    });

    const [showRefund, setShowRefund] = useState({
        isOpen: false,
        customerId: null,
        customerName: null,
    });

    const { response: zaiPayments, loading: l_loading } = useSelector(
        (state) => state.get_zai_australia_payment_details,
    );

    useEffect(() => {
        dispatch(actions?.get_zai_australia_payment_details(filterSchema));
        dispatch({ type: "GET_ZAI_AUSTRALIA_PAYMENT" });
    }, [filterSchema]);

    const handleReset = () => {
        dispatch({ type: "GET_ZAI_AUSTRALIA_PAYMENT_RESET" });
        formReset();
    };

    const transactionStatusOptions =
        reference
            ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.transactionStatus)[0]
            ?.reference_data.map((ref) => ({
                label: ref.name,
                value: ref.value,
            })) ?? [];

    const columns = useMemo(() => [
        {
            header: "SN",
            accessorKey: "f_serial_no",
        },
        {
            header: "Transaction ID",
            accessorKey: "transaction_id",
        },
        {
            header: "Customer Details",
            cell: ({ row }) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography>CN: {row?.original?.customer_name}</Typography>
                    <Typography>BN: {row?.original?.beneficiary_name}</Typography>
                </Box>
            ),
        },
        {
            header: "Partner/Payout Country",
            cell: ({ row }) => (
                <Box>
                    <Typography>{row?.original?.payout_agent_name}</Typography>
                    <Typography>{row?.original?.payout_country}</Typography>
                </Box>
            ),
        },
        {
            header: "Txn Date",
            cell: ({ row }) => (
                <Box>
                    <Typography>{dayjs(row?.original?.created_ts + "Z").format("MMM DD, YYYY")}</Typography>
                    <Typography>
                        <AccessTimeIcon
                            sx={{
                                alignSelf: "center",
                                justifyItems: "center",
                                marginRight: "5px",
                            }}
                            fontSize="10px"
                        />
                        {dayjs(row?.original?.created_ts + "Z").format("hh:mm A")}
                    </Typography>
                </Box>
            ),
        },
        {
            header: "Exc Amount",
            accessorKey: "customer_rate",
        },
        {
            header: "Rec Amt",
            accessorKey: "collected_amount",
        },
        {
            header: "S/T Status",
            cell: ({ row }) => (
                <Box>
                    <Typography>
                        {row?.original?.send_status ? ReferenceName(66, row?.original?.send_status) : "N/A"}
                    </Typography>

                    <Typography>
                        {row?.original?.transaction_status
                            ? ReferenceName(66, row?.original?.transaction_status)
                            : "N/A"}
                    </Typography>
                </Box>
            ),
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <Box textAlign="center">
                    <PopoverAction
                        onCheckBalance={() => {
                            setShowBalance({
                                isOpen: true,
                                customerId: row.original.customer_id,
                            });
                        }}
                        onRefundPayment={() => {
                            setShowRefund({
                                isOpen: true,
                                customerId: row.original.customer_id,
                                customerName: row.original.customer_name,
                            });
                        }}
                        onMakePayment={() => {
                            setShowPayment({
                                isOpen: true,
                                customerId: row.original.customer_id,
                                customerName: row.original.customer_name,
                                transactionId: row.original.transaction_id,
                            });
                        }}
                    />
                </Box>
            ),
        },
    ]);

    const filterFields = [
        {
            type: "textfield",
            label: "Transaction ID",
            name: "transaction_id",
        },
        {
            type: "textfield",
            label: "Customer ID",
            name: "customer_id",
        },
        {
            type: "date",
            label: "From Date",
            name: "from_date",
        },
        {
            type: "date",
            label: "To Date",
            name: "to_date",
        },
        {
            type: "select",
            label: "Transaction Status",
            name: "send_status",
            options: transactionStatusOptions,
        },
    ];

    const sortData = [
        { key: "SN", value: "f_serial_no" },
        { key: "Transaction ID", value: "transaction_id" },
        { key: "Customer Details", value: "customer_name" },
        { key: "Partner/Payout Country", value: "payout_agent_name" },
    ];

    return (
        <PageContent
            documentTitle="Zai Australia Payment"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Zai Australia Payment"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                    onReset={reset}
                />

                <PageContentContainer
                    title="Zai Australia Payment List"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={l_loading}
                                sortByData={sortData}
                                values={filterSchema}
                            />
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        title="Zai Australia Payment"
                        data={zaiPayments?.data ?? []}
                        loading={l_loading}
                    />
                </PageContentContainer>

                <TablePagination
                    paginationData={zaiPayments?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />

                <ViewBalance
                    customerId={showBalance?.customerId}
                    isOpen={showBalance?.isOpen}
                    onClose={() =>
                        setShowBalance({
                            isOpen: false,
                            customerId: null,
                        })
                    }
                />

                <MakePaymentModal
                    customerId={showPayment?.customerId}
                    customerName={showPayment.customerName}
                    transactionId={showPayment.transactionId}
                    isOpen={showPayment?.isOpen}
                    onClose={() => {
                        setShowPayment({
                            isOpen: false,
                            customerId: null,
                            customerName: null,
                            transactionId: null,
                        });
                    }}
                />

                <RefundPaymentModal
                    customerId={showRefund?.customerId}
                    customerName={showRefund.customerName}
                    isOpen={showRefund?.isOpen}
                    onClose={() => {
                        setShowRefund({
                            isOpen: false,
                            customerId: null,
                            customerName: null,
                        });
                    }}
                />
            </Column>
        </PageContent>
    );
};

export default ZaiAustraliaPayment;
