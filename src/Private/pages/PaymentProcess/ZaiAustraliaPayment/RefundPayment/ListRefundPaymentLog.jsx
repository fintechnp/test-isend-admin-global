import { styled } from "@mui/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "App/components/Table/TablePagination";
import TableBodySkeleton from "App/components/Table/TableBodySkeleton";

import actions from "../../store/actions";
import dateUtils from "App/utils/dateUtils";

const StyledTableCell = styled(TableHead)(({ theme }) => ({
    "& .MuiTableCell-root": {
        backgroundColor: theme.palette.background.light,
        color: theme.palette.text.primary,
    },
}));

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
                    <StyledTableCell>
                        <TableRow>
                            <TableCell>SN</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Transaction Amount</TableCell>
                            <TableCell>Refund Amount</TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Refund By</TableCell>
                            <TableCell>Remarks</TableCell>
                        </TableRow>
                    </StyledTableCell>
                    <TableBody>
                        {loading ? (
                            <TableBodySkeleton rowCount={10} columnCount={10} />
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
                                    <TableCell>{row.zai_transaction_id}</TableCell>
                                    <TableCell align="right">{row.transaction_amount.toLocaleString()}</TableCell>
                                    <TableCell align="right">{row.refund_amount.toLocaleString()}</TableCell>
                                    <TableCell>{row.transaction_currency}</TableCell>
                                    <TableCell>
                                        {row.created_ts ? (
                                            <>
                                                <Typography variant="body2">
                                                    {dateUtils.getFormattedDate(row.created_ts, "MM/DD/YYYY")}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {dateUtils.getFormattedDate(row.created_ts, "hh:mm A")}
                                                </Typography>
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    <TableCell>{row.created_by ? row.created_by : "N/A"}</TableCell>
                                    <TableCell>
                                        {row.updated_ts ? (
                                            <>
                                                <Typography variant="body2">
                                                    {dateUtils.getFormattedDate(row.updated_ts, "MM/DD/YYYY")}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {dateUtils.getFormattedDate(row.updated_ts, "hh:mm A")}
                                                </Typography>
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    <TableCell>{row.updated_by ? row.updated_by : "N/A"}</TableCell>

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
