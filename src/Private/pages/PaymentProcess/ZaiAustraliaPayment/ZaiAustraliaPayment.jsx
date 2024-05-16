import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import PageContent from "App/components/Container/PageContent";
import TablePagination from "App/components/Table/TablePagination";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { ReferenceName, getFormattedDate, getFormattedTime } from "App/helpers";

import actions from "../store/actions";
import ViewBalance from "./ViewBalance";
import MakePayment from "./MakePayment";
import PopoverAction from "./ViewBalance/PopoverAction";
import ViewPaymentLogs from "./RefundPayment/ViewPaymentLogs";
import ZaiFilterForm from "./SearchForm";

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
    const [filterSchema, setFilterSchema] = useState(initialState);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { methods } = useForm();

    const { reset } = useForm();

    const [showBalance, setShowBalance] = useState({
        isOpen: false,
        customerId: null,
    });

    const [showPayment, setShowPayment] = useState({
        isOpen: false,
        transactionRefNo: null,
    });

    const [showRefund, setShowRefund] = useState({
        isOpen: false,
        customerId: null,
    });

    const { response: ZaiAustraliaPaymentDetails, loading: l_loading } = useSelector(
        (state) => state.get_zai_australia_payment_details,
    );

    console.log("The Zai payments", ZaiAustraliaPaymentDetails);

    useEffect(() => {
        dispatch(actions?.get_zai_australia_payment_details(filterSchema));
        dispatch({ type: "GET_ZAI_AUSTRALIA_PAYMENT" });
    }, [filterSchema]);

    const handleReset = () => {
        dispatch({ type: "GET_ZAI_AUSTRALIA_PAYMENT_RESET" });
        reset();
    };

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
                    <Typography>{getFormattedDate(row?.original?.created_ts)}</Typography>
                    <Typography>
                        <AccessTimeIcon
                            sx={{
                                alignSelf: "center",
                                justifyItems: "center",
                                marginRight: "5px",
                            }}
                            fontSize="10px"
                        />
                        {getFormattedTime(row?.original?.created_ts)}
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
                        onMakePayment={() => {
                            setShowPayment({
                                isOpen: true,
                                transactionRefNo: row?.original?.transaction_id,
                            });
                        }}
                        onRefundPayment={() => {
                            setShowRefund({
                                isOpen: true,
                                customerId: row.original.customer_id,
                            });
                        }}
                    />
                </Box>
            ),
        },
    ]);

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };

        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,

            page_size: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <PageContent title="Zai Australia Payment">
            <ZaiFilterForm loading={l_loading} setFilterSchema={setFilterSchema} handleReset={handleReset} />

            <TanstackReactTable
                columns={columns}
                title="Zai Australia Payment"
                data={ZaiAustraliaPaymentDetails?.data?.result ?? []}
                loading={l_loading}
                renderPagination={() => (
                    <TablePagination
                        paginationData={ZaiAustraliaPaymentDetails?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
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

            <MakePayment
                transactionRefNo={showPayment?.transactionRefNo}
                isOpen={showPayment?.isOpen}
                onClose={() => {
                    setShowPayment({
                        isOpen: false,
                        transactionRefNo: null,
                    });
                }}
            />

            <ViewPaymentLogs
                customerId={showRefund?.customerId}
                isOpen={showRefund?.isOpen}
                onClose={() => {
                    setShowRefund({
                        isOpen: false,
                        customerId: null,
                    });
                }}
            />
        </PageContent>
    );
};

export default ZaiAustraliaPayment;
