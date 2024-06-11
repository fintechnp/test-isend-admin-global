import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import actions from "../../../store/actions";
import RefundRowForm from "../RefundRowForm";
import Modal from "App/components/Modal/Modal";
import { webhookLogStatus } from "Private/data/webhookLogStatus";
import TablePagination from "App/components/Table/TablePagination";
import TableBodySkeleton from "App/components/Table/TableBodySkeleton";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ViewPaymentLogs({ isOpen, customerId, onClose }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [filterSchema, setFilterSchema] = React.useState({
        PageSize: 10,
        PageNumber: 1,
    });

    const { response: logData, loading } = useSelector((state) => state.get_zai_logs);

    React.useEffect(() => {
        if (customerId && isOpen) {
            dispatch(
                actions.get_zai_logs({
                    CustomerId: customerId,
                    Status: webhookLogStatus.PENDING,
                }),
            );
        }
    }, [customerId, isOpen]);

    React.useEffect(() => {
        if (logData && logData.customerId === customerId) {
        }
    }, [logData, customerId]);

    React.useEffect(() => {
        dispatch(actions.get_zai_logs(filterSchema));
    }, [dispatch, filterSchema]);

    const onRefundSuccessful = () => {
        dispatch(
            actions.get_zai_logs({
                CustomerId: customerId,
                Status: webhookLogStatus.PENDING,
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
        <div>
            <Modal
                onClose={onClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                title="Refund Details"
            >
                {logData?.data?.length > 0 && (
                    <Grid padding={2} container item xs={12}>
                        <Grid item xs={12} sm={6}>
                            Customer Name: {logData?.data[0]?.customer_name}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            Customer ID: {logData?.data[0]?.customer_id}
                        </Grid>
                    </Grid>
                )}

                <TableContainer component={Paper}>
                    <Table aria-label="log data table">
                        <TableHead>
                            <TableRow>
                                <TableCell>SN</TableCell>
                                <TableCell>Webhook ID</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Amount to refund</TableCell>
                                <TableCell>Remarks</TableCell>

                                <TableCell>Actions</TableCell>
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
                                    <RefundRowForm row={row} onRefundSuccessful={onRefundSuccessful} />
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
            </Modal>
        </div>
    );
}

export default React.memo(ViewPaymentLogs);
