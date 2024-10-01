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
import MakePaymentRowForm from "./MakePaymentRowForm";
import { webhookLogStatus } from "Private/data/webhookLogStatus";

const StyledTableCell = styled(TableHead)(({ theme }) => ({
    "& .MuiTableCell-root": {
        backgroundColor: theme.palette.background.light,
        color: theme.palette.text.primary,
    },
}));
function ListMakePaymentWebhookLog({ customerId, transactionId }) {
    const dispatch = useDispatch();

    const defaultParams = {
        CustomerId: customerId,
        Status: webhookLogStatus.PENDING,
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

    const onMakePaymentSuccess = () => {
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
                <Table borderAxis="bothBetween" variant="plain">
                    <StyledTableCell>
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    borderLeft: 1,
                                    borderColor: (theme) => theme.palette.background.light,
                                },
                            }}
                        >
                            <TableCell>SN</TableCell>
                            <TableCell
                                sx={{
                                    minWidth: "15rem",
                                }}
                            >
                                Debtor Information
                            </TableCell>
                            <TableCell>Webhook ID</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Transaction Amount </TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Amount to pay</TableCell>
                            <TableCell>Remarks</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </StyledTableCell>
                    <TableBody>
                        {loading ? (
                            <TableBodySkeleton rowCount={9} columnCount={9} />
                        ) : logData.data?.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No data found
                                </TableCell>
                            </TableRow>
                        ) : (
                            logData.data?.map((row) => (
                                <MakePaymentRowForm
                                    key={row.id}
                                    row={row}
                                    transactionId={transactionId}
                                    onMakePaymentSuccess={onMakePaymentSuccess}
                                />
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

export default ListMakePaymentWebhookLog;
