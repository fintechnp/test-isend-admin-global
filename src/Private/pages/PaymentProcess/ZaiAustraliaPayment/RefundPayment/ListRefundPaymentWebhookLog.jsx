import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "App/components/Table/TablePagination";
import TableBodySkeleton from "App/components/Table/TableBodySkeleton";

import actions from "../../store/actions";
import RefundRowForm from "./RefundRowForm";
import { webhookLogStatus } from "Private/data/webhookLogStatus";

const StyledTableCell = styled(TableHead)(({ theme }) => ({
    "& .MuiTableCell-root": {
        backgroundColor: "#F1F7FE",
        color: "#000",
    },
}));

function ListRefundPaymentWebhookLog({ customerId }) {
    const dispatch = useDispatch();

    const defaultParams = {
        CustomerId: customerId,
        Status: webhookLogStatus.REFUNDABLE,
    };

    const [filterSchema, setFilterSchema] = React.useState({
        PageSize: 10,
        PageNumber: 1,
        ...defaultParams,
    });

    const { response: logData, loading } = useSelector((state) => state.get_zai_logs);

    useEffect(() => {
        dispatch(
            actions.get_zai_logs({
                ...filterSchema,
                ...defaultParams,
            }),
        );
    }, [dispatch, filterSchema, customerId]);

    const onRefundSuccess = () => {
        console.log("refunded");
        dispatch(
            actions.get_zai_logs({
                ...filterSchema,
                ...defaultParams,
            }),
        );
    };

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            PageNumber: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const updatedFilterSchema = {
            ...filterSchema,
            PageSize: e.target.value,
        };

        setFilterSchema(updatedFilterSchema);
    };

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <StyledTableCell>
                        <TableRow
                            sx={{ "&:last-child td, &:last-child th": { borderLeft: 1, borderColor: "#EAEBF0" } }}
                        >
                            <TableCell>SN</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell align="right">Transaction Amount </TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Amount to refund</TableCell>
                            <TableCell>Remarks</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </StyledTableCell>
                    <TableBody>
                        {loading ? (
                            <TableBodySkeleton rowCount={10} columnCount={7} />
                        ) : logData.data?.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No data found
                                </TableCell>
                            </TableRow>
                        ) : (
                            logData.data?.map((row) => (
                                <RefundRowForm key={row.id} row={row} onRefundSuccess={onRefundSuccess} />
                            ))
                        )}
                    </TableBody>
                </Table>

                <TablePagination
                    paginationData={logData?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
}

export default ListRefundPaymentWebhookLog;
