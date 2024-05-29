import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "App/components/Table/TablePagination";
import TableBodySkeleton from "App/components/Table/TableBodySkeleton";

import actions from "../../store/actions";

function ListRefundPaymentLog({ customerId }) {
    const dispatch = useDispatch();

    const defaultParams = {
        CustomerId: customerId,
    };

    const [filterSchema, setFilterSchema] = React.useState({
        PageSize: 10,
        PageNumber: 1,
        ...defaultParams,
    });

    const { response: logData, loading } = useSelector((state) => state.get_zai_refund_logs);

    useEffect(() => {
        dispatch(
            actions.get_zai_refund_logs({
                ...filterSchema,
                ...defaultParams,
            }),
        );
    }, [dispatch, filterSchema, customerId]);

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
                    <TableHead>
                        <TableRow>
                            <TableCell>SN</TableCell>
                            <TableCell>Webhook ID</TableCell>
                            <TableCell>
                                <Typography align="right">Transaction Amount</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography align="right">Refund Amount</Typography>
                            </TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Remarks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableBodySkeleton rowCount={10} columnCount={6} />
                        ) : logData.data?.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No data found
                                </TableCell>
                            </TableRow>
                        ) : (
                            logData.data?.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.f_serial_no}</TableCell>
                                    <TableCell>{row.webhook_id}</TableCell>
                                    <TableCell align="right">{row.transaction_amount.toLocaleString()}</TableCell>
                                    <TableCell align="right">{row.refund_amount.toLocaleString()}</TableCell>
                                    <TableCell>{row.transaction_currency}</TableCell>
                                    <TableCell>{row.remarks}</TableCell>
                                </TableRow>
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

export default ListRefundPaymentLog;
