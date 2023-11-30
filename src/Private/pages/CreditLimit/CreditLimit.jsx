import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import buildRoute from "App/helpers/buildRoute";
import Spacer from "App/components/Spacer/Spacer";
import { TablePagination } from "App/components/Table";
import NoResults from "../Transactions/components/NoResults";
import FilterForm from "Private/components/CreditLimit/FilterForm";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { creditLimitActions } from "./store";
import { creditLimitStatusEnum } from "./constants/creditLimitStatus";

const initialState = {
    Page: 1,
    PageSize: 10,
};

const sortByOptions = [
    {
        label: "Business Name",
        value: "business_name",
    },
    {
        label: "Currency",
        value: "currency",
    },
    {
        label: "Status",
        value: "status",
    },
];

export default function CreditLimit({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: creditLimitData, loading: creditLimitLoading } = useSelector(
        (state) => state.get_all_credit_limit,
    );

    // const sortByOptions =
    //     creditLimitData?.data?.length > 0 &&
    //     Object.keys(creditLimitData?.data[0])
    //         ?.map((item) => {
    //             return { value: item, label: item };
    //         })
    //         .filter((item) => item.label !== "f_serial_no");

    useEffect(() => {
        dispatch(creditLimitActions.get_all_credit_limit(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Business/Agent Name",
                accessorKey: "name",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },
            {
                header: "Credit Amount",
                accessorKey: "creditLimit",
            },
            {
                header: "Currency",
                accessorKey: "currency",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },

            {
                header: "Remarks",
                accessorKey: "remarks",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },

            {
                header: "Status",
                accessorKey: "statusName",
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.viewCreditLimit, row?.original?.id));
                            }}
                        >
                            <RemoveRedEyeOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        </IconButton>
                        {row?.original?.status !== creditLimitStatusEnum.APPROVED && (
                            <IconButton
                                onClick={() => {
                                    navigate(buildRoute(routePaths.agent.editCreditLimit, row?.original?.id));
                                }}
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
                        )}
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            Page: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            PageSize: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <PageContent
            title={title}
            documentTitle="Credit Limit"
            topRightEndContent={
                <Button
                    onClick={() => {
                        navigate(routePaths.agent.addCreditLimit);
                    }}
                >
                    Add Credit Limit
                </Button>
            }
        >
            <FilterForm sortByOptions={sortByOptions} setFilterSchema={setFilterSchema} />
            {creditLimitLoading && (
                <Grid item xs={12}>
                    <Loading loading={creditLimitLoading} />
                </Grid>
            )}
            {!creditLimitLoading && creditLimitData?.data && creditLimitData?.data?.length === 0 ? (
                <Grid item xs={12}>
                    <NoResults text="No Credit Limit Found" />
                </Grid>
            ) : (
                <>
                    <Spacer />
                    <TanstackReactTable
                        columns={columns}
                        title="Credit Limit"
                        data={creditLimitData?.data ?? []}
                        loading={creditLimitLoading}
                        renderPagination={() => (
                            <TablePagination
                                paginationData={creditLimitData?.pagination}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        )}
                    />
                </>
            )}
        </PageContent>
    );
}
