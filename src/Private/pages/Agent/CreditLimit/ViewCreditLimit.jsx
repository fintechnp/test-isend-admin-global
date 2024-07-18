import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "App/components";
import Modal from "App/components/Modal/Modal";
import buildRoute from "App/helpers/buildRoute";
import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import { creditLimitStatusEnum } from "./constants/creditLimitStatus";
import UpdateStatusForm from "Private/components/CreditLimit/UpdateStatusForm";
import { RenderField, Title, TitleWrapper } from "App/components/Container";

import { creditLimitActions } from "./store";

const slicedDate = (date) => {
    return date ? date.split("T")[0] : "N/A";
};

export default function ViewCreditLimit({ title }) {
    const dispatch = useDispatch();
    const { creditLimitId } = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { response, loading } = useSelector((state) => state.get_credit_limit_details);
    const { success, loading: deleting } = useSelector((state) => state.delete_credit_limit);

    useEffect(() => {
        if (success) {
            navigate(buildRoute(routePaths.agent.creditLimit));
        }
    }, [success]);

    useEffect(() => {
        dispatch(creditLimitActions.get_credit_limit_details(creditLimitId));
    }, [creditLimitId]);

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
                title={title || "Credit Limit Details"}
                topRightEndContent={
                    response?.data?.status !== creditLimitStatusEnum.APPROVED && (
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    navigate(buildRoute(routePaths.agent.editCreditLimit, creditLimitId));
                                }}
                            >
                                Update
                            </Button>
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                Update Status
                            </Button>
                            <Button
                                onClick={() => {
                                    dispatch(creditLimitActions.delete_credit_limit(creditLimitId));
                                }}
                                sx={{
                                    border: "1px solid #F44336",
                                    color: "#F44336",
                                }}
                                disabled={deleting}
                                loading={deleting}
                            >
                                {deleting ? "Deleting" : "Delete"}
                            </Button>
                        </Box>
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
                            <RenderField label="Type" value={response?.data?.relatedTo} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Name" value={response?.data?.name} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Credit Limit" value={response?.data?.creditLimit} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Remarks" value={response?.data?.remarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Currency" value={response?.data?.currency} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Status" value={response?.data?.statusName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Created By" value={response?.data?.createdBy} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Checked By" value={response?.data?.checkedBy} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Updated By" value={response?.data?.updatedBy} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Checker Remarks" value={response?.data?.checkerRemarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Created At" value={slicedDate(response?.data?.createdAt)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Checked At" value={slicedDate(response?.data?.checkedAt)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Updated At" value={slicedDate(response?.data?.updatedAt)} />
                        </Grid>
                    </Grid>
                )}
            </PageContent>
            <Modal title="Update Credit Limit status" open={open} onClose={handleClose}>
                <UpdateStatusForm setOpen={setOpen} />
            </Modal>
        </>
    );
}
