import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import Modal from "App/components/Modal/Modal";
import Button from "App/components/Button/Button";
import { convertDate } from "App/utils/convertDate";
import PageContent from "App/components/Container/PageContent";
import { RenderField, Title, TitleWrapper } from "../Customers/CustomerDetails/CustomerDetails";
import UpdateBalanceRequestStatusForm from "Private/components/BalanceRequest/UpdateStatusForm";

import { BalanceRequestActions } from "./store";

export default function ViewBalanceRequest({ title }) {
    const dispatch = useDispatch();
    const { balanceRequestId } = useParams();

    const [open, setOpen] = useState(false);

    const { response, loading } = useSelector((state) => state.get_balance_request_details);

    useEffect(() => {
        dispatch(BalanceRequestActions.get_balance_request_details(balanceRequestId));
    }, [balanceRequestId]);

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return (
            <Grid item xs={12}>
                <Loading loading={loading} />
            </Grid>
        );
    }
    return (
        <>
            <PageContent
                title={title || "View Balance Request"}
                topRightEndContent={
                    response?.data?.status !== 2 && (
                        <Button
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Update Status
                        </Button>
                    )
                }
            >
                {loading ? (
                    <Grid item xs={12}>
                        <Loading loading={loading} />
                    </Grid>
                ) : (
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Detail</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Id" value={response?.data?.id} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Created By" value={response?.data?.createdByName} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <RenderField label="Name" value={response?.data?.name} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Deposited Amount" value={response?.data?.depositedAmount} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Depositor Name" value={response?.data?.depositorName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="depositDate" value={convertDate(response?.data?.depositDate)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Depository Method Name" value={response?.data?.depositoryMethodName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Document Id" value={response?.data?.documentId} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Related To" value={response?.data?.relatedTo} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Remarks" value={response?.data?.remarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Status" value={response?.data?.status} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Checked By" value={response?.data?.checkedByName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Checker Remarks" value={response?.data?.checkerRemarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Updated By" value={response?.data?.updatedByName} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <RenderField label="Updated At" value={convertDate(response?.data?.updatedTs)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Created At" value={convertDate(response?.data?.createdAt)} />
                        </Grid>

                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Documents</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>

                        <Grid xs={12} md={6} mt={2}>
                            <a
                                href={response?.data?.documents?.documentLink}
                                target="_blank"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                {response?.data?.documents?.fileType?.includes("image") ? (
                                    <>
                                        <img
                                            src={response?.data?.documents?.documentLink}
                                            alt="voucher"
                                            style={{
                                                width: "100%",
                                                height: "200px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </>
                                ) : (
                                    <Box
                                        sx={{
                                            bgcolor: "white",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                            padding: "15px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography>Balance Request Voucher</Typography>
                                    </Box>
                                )}
                            </a>
                        </Grid>
                    </Grid>
                )}
            </PageContent>
            <Modal title="Update Balance Request status" open={open} onClose={handleClose}>
                <UpdateBalanceRequestStatusForm setOpen={setOpen} />
            </Modal>
        </>
    );
}
