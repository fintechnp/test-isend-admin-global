import Box from "@mui/material/Box";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import Header from "./components/Header";
import Filter from "./components/Filter";
import actions from "./../../Transactions/store/actions";
import { TablePagination } from "./../../../../App/components/Table";
import StatusBadge from "./data/StatusBadge";
import { CurrencyName, FormatNumber } from "./../../../../App/helpers";
import isEmpty from "App/helpers/isEmpty";

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

function Transactions(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: TransactionData, loading: l_loading } = useSelector(
        (state) => state.get_transactions_by_customer,
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_transactions_by_customer(id, filterSchema));
        }
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Transaction ID",
                accessorKey: "tid",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            {row?.original?.tid ? row?.original?.tid : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Name",
                cell: ({ row }) => (
                    <Column sx={{ wordBreak: "break-all" }}>
                        <Typography variant="body1">{row?.original?.customer_name}</Typography>
                        <Typography variant="body2">{row?.original?.beneficiary_name}</Typography>
                    </Column>
                ),
            },

            {
                header: "Partner",
                cell: ({ row }) => (
                    <Column sx={{ wordBreak: "break-all" }}>
                        <Typography variant="body1">{row?.original?.agent_name}</Typography>
                        <Typography variant="body2">{row?.original?.payout_agent_name}</Typography>
                    </Column>
                ),
            },

            {
                header: "Currency",
                cell: ({ row }) => (
                    <Column sx={{ wordBreak: "break-all" }}>
                        <Typography variant="body1">
                            {row?.original?.collected_currency
                                ? CurrencyName(row?.original?.collected_currency)
                                : "N/A"}
                        </Typography>
                        <Typography variant="body1">
                            {row?.original?.payout_currency ? CurrencyName(row?.original?.payout_currency) : "N/A"}
                        </Typography>
                    </Column>
                ),
            },
            {
                header: "Rate",
                cell: ({ row }) => (
                    <>{row.original.payout_cost_rate ? FormatNumber(row?.original?.payout_cost_rate) : "N/A"}</>
                ),
            },
            {
                header: "Transaction Status",
                accessorKey: "transaction_status_code",
                cell: ({ row }) => (
                    <StatusBadge
                        status={
                            isEmpty(row.original.status) ? row.original.transaction_status_code : row.original.status
                        }
                    />
                ),
            },
            {
                header: "Send Status",
                accessorKey: "send_status",
                cell: ({ row }) => <StatusBadge status={row.original.send_status_code} />,
            },
            {
                header: "Date",
                cell: ({ row }) => (
                    <>
                        {row?.original?.payout_cost_rate
                            ? dateUtils.getFormattedDate(row?.original?.created_ts)
                            : "N/A"}
                    </>
                ),
            },
            {
                header: "Amount",
                cell: ({ row }) => (
                    <Column sx={{ wordBreak: "break-all" }}>
                        <Typography variant="body1">
                            {row?.original?.transfer_amount ? FormatNumber(row?.original?.transfer_amount) : "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            {row?.original?.payout_amount ? FormatNumber(row?.original?.payout_amount) : "N/A"}
                        </Typography>
                    </Column>
                ),
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
                                        onClick={() =>
                                            navigate(
                                                `/transactions/details/${row.original.tid}/${row.original.customer_id}`,
                                            )
                                        }
                                    >
                                        View Transaction
                                    </ListItemButton>
                                </>
                            )}
                        </PopoverButton>
                    );
                },
            },
        ],
        [],
    );

    const handleSearch = useCallback(
        (e) => {
            const searchValue = e.target.value;
            const updatedFilterSchema = {
                ...filterSchema,
                search: searchValue,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema],
    );

    const handleSort = (e) => {
        const type = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: type,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleOrder = (e) => {
        const order = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            order_by: order,
        };
        setFilterSchema(updatedFilterSchema);
    };

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
            page_number: 1,
            page_size: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <PageContent>
            <Helmet>
                <title>
                    {import.meta.env.REACT_APP_NAME} | {props.title}
                </title>
            </Helmet>

            <Column>
                <PageContentContainer>
                    <Header />
                    <Filter handleSearch={handleSearch} handleSort={handleSort} handleOrder={handleOrder} />

                    <TanstackReactTable columns={columns} data={TransactionData?.data || []} loading={l_loading} />
                </PageContentContainer>
            </Column>

            <TablePagination
                paginationData={TransactionData?.pagination}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </PageContent>
    );
}

export default Transactions;
