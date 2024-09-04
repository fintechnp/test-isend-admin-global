import * as React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";

import actions from "../../store/actions";
import ZaiBalanceStatusBadge from "../components/ZaiBalanceStatusBadge";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CircleWrapper = styled(Box)(({ theme }) => ({
    height: "200px",
    width: "200px",
    borderRadius: "50%",
    background: "linear-gradient(90deg, #658DF5 0%, #1153FC 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#fff",
    paddingLeft: "10px",
    alignItems: "center",
    textAlign: "center",
}));

function ViewBalance({ isOpen, customerId, onClose }) {
    const dispatch = useDispatch();

    const { response: BalanceData, loading: get_loading } = useSelector((state) => state.get_balance_details);

    React.useEffect(() => {
        if (customerId && isOpen) {
            dispatch(actions.get_balance_details(customerId));
        }
    }, [customerId, isOpen]);

    React.useEffect(() => {
        if (BalanceData && BalanceData.customerId === customerId) {
        }
    }, [BalanceData, customerId]);

    const columns = useSourceDetail([
        {
            title: "",
            items: [
                {
                    label: "Customer Name",
                    accessorKey: "customerName",
                },
                {
                    label: "BSB",
                    accessorKey: "routingNumber",
                },
                {
                    label: "Account Number",
                    accessorKey: "accountNumber",
                },
                {
                    label: "PayID",
                    accessorKey: "payId",
                },
                {
                    label: "Wallet ID",
                    accessorKey: "walletId",
                },

                {
                    label: "Status",
                    accessorKey: "status",
                    cell: (data) => <ZaiBalanceStatusBadge status={data?.status} />,
                },
            ],
        },
    ]);

    return (
        <div>
            <Modal
                onClose={onClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                title={<Typography fontWeight={600}>BALANCE CHECK</Typography>}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Grid
                    maxWidth="800px"
                    minWidth={{
                        xs: "580px",
                        md: "700px",
                        lg: "800px",
                    }}
                    container
                >
                    <Grid item xs={6} rowSpacing={2}>
                        {get_loading ? (
                            <Grid container spacing={2}>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Skeleton variant="rectangular" />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <SourceDetails
                                definition={columns}
                                data={BalanceData?.data || []}
                                isLoading={get_loading}
                                viewMode="column"
                                rowMode="row"
                            />
                        )}
                    </Grid>

                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                        item
                        xs={6}
                    >
                        {get_loading ? (
                            <Skeleton variant="circular" height={200} width={200} />
                        ) : (
                            <CircleWrapper>
                                <Typography fontSize="16px">Balance</Typography>
                                <Typography fontSize="18px" fontWeight={700}>
                                    {BalanceData?.data?.currency}
                                    &nbsp;
                                    {BalanceData?.data?.balance}
                                </Typography>
                            </CircleWrapper>
                        )}
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default React.memo(ViewBalance);
