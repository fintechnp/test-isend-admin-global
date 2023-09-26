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

import { KycUserActions } from "./store";
import UpdateKycUserStatusForm from "Private/components/KycUser/UpdateKycUserStatusForm";

export default function ViewKycUser() {
    const dispatch = useDispatch();
    const { kycUserId } = useParams();

    const [open, setOpen] = useState(false);

    const { response, loading } = useSelector((state) => state.get_kyc_user_details);

    useEffect(() => {
        dispatch(KycUserActions.get_kyc_user_details(kycUserId));
    }, [kycUserId]);

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
        <PageContent
            title="View Kyc User"
            topRightEndContent={
                response?.data?.status !== 2 && (
                    <Button
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Approve / Reject
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
                    {/* <Grid item xs={12} sm={6}>
                        <RenderField label="Name" value={response?.data?.name} />
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
                        <RenderField label="Remarks" value={response?.data?.remarks} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Status" value={response?.data?.statusName} />
                    </Grid> */}

                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Address Details</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <RenderField label="Checked By" value={response?.data?.checkedByName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Remarks" value={response?.data?.checkerRemarks} />
                    </Grid> */}
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Other</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                </Grid>
            )}
            <Modal title="Approve/Reject Kyc User" open={open} onClose={handleClose}>
                <UpdateKycUserStatusForm setOpen={setOpen} />
            </Modal>
        </PageContent>
    );
}
