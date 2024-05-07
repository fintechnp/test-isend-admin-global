import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import buildRoute from "App/helpers/buildRoute";
import Spacer from "App/components/Spacer/Spacer";
import StatusBadge from "./components/StatusBadge";
import routePaths from "Private/config/routePaths";
import TableFilter from "./components/TableFilter";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import CustomerDeleteFilterForm from "Private/components/customers/CustomerDeleteFilterForm";

import dateUtils from "App/utils/dateUtils";
import { customerDeleteActions as actions } from "./store";
import { DeleteAccountStatus } from "./data/DeleteAccountStatus";

const initialState = {
    pageNumber: 1,
    pageSize: 10,
};
export default function CustomerDeleteList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { loading, response } = useSelector((state) => state.get_all_customer_delete_list);

    useEffect(() => {
        dispatch(actions.get_all_customer_delete_list(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Full Name",
                accessorKey: "full_name",
            },
            {
                header: "Customer ID",
                accessorKey: "customer_id",
            },
            {
                header: "Email",
                accessorKey: "email",
                cell: ({ getValue }) => <Typography>{getValue() || "N/A"}</Typography>,
            },
            {
                header: "Phone Number",
                accessorKey: "mobile_number",
                cell: ({ getValue }) => <Typography>{getValue() || "N/A"}</Typography>,
            },
            {
                header: "Deletion Reason",
                accessorKey: "deletion_reason",
                cell: ({ getValue }) => <Typography>{getValue() || "N/A"}</Typography>,
            },
            {
                header: "Remarks",
                accessorKey: "remarks",
                cell: ({ getValue }) => <Typography>{getValue() || "N/A"}</Typography>,
            },

            {
                header: "Status",
                accessorKey: "status",
                cell: ({ getValue }) => <StatusBadge status={getValue() ?? DeleteAccountStatus.PENDING} />,
            },
            {
                header: "Requested Date",
                accessorKey: "created_ts",
                cell: ({ getValue }) => <Typography>{dateUtils.getFormattedDate(getValue())}</Typography>,
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(
                                    buildRoute(routePaths.customer.deleteRequestDetails, row?.original?.delete_id),
                                );
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
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    const handleFilterSubmit = (data) => {
        setFilterSchema({ ...filterSchema, ...data });
    };

    const handleFilterReset = () => {
        setFilterSchema({
            ...handleTableFilter,
            sortBy: filterSchema.sortBy,
            orderBy: filterSchema.orderBy
        });
    };

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            pageNumber: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleTableFilter = (data) => {
        setFilterSchema({
            ...filterSchema,
            ...data,
        });
    };

    return (
        <PageContent title="Account Delete Request">
            <CustomerDeleteFilterForm
                isProcessing={loading}
                onSubmit={handleFilterSubmit}
                onReset={handleFilterReset}
            />
            <Spacer />
            <TableFilter onSubmit={handleTableFilter} />
            <TanstackReactTable
                columns={columns}
                title="Delete List"
                data={response?.data ?? []}
                loading={loading}
                renderPagination={() => (
                    <TablePagination
                        paginationData={response?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
}
