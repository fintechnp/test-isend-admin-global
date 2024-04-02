import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";

import { CurrencyName, CountryName, FormatNumber, ReferenceName } from "./../../../../App/helpers";
import MessageBox from "./../Search/components/MessageBox";
import SuspiciosModal from "./SuspiciosModal";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import routePaths from "Private/config/routePaths";
import buildRoute from "App/helpers/buildRoute";

import CommentForm from "../../Comments/AddComment/Form";
import AddComment from "Private/pages/Comments/AddComment";
import GetAttachment from "Private/pages/Attachments/GetAttachment";
import { set } from "date-fns";

const Header = styled(Box)(({ theme }) => ({
    paddingBottom: "4px",
    fontSize: "17px",
    fontWeight: 500,
    color: theme.palette.primary.main,
}));

const InfoWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
}));

const LabelWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.9,
    minWidth: "30%",
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.dark,
}));

const ValueWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.8,
    paddingLeft: "8px",
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.main,
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    paddingTop: "16px",
    justifyContent: "flex-start",
}));

const BottomButton = styled(Button)(({ theme }) => ({
    minWidth: "120px",
    padding: "4px 10px",
    textTransform: "capitalize",
}));

const PinWrapper = styled(Typography)(({ theme }) => ({
    opacitLy: 0.8,
    paddingLeft: "8px",
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.main,
}));

function Details({ data, isAML = false }) {
    const { id, tid } = useParams();

    const transactionId = tid ?? id;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openSuspiciosModal, setOpenSuspiciosModal] = useState(false);
    const [count, setCount] = useState(0);

    const [openCommentDrawer, setOpenCommentDrawer] = useState(false);
    const [openAttachmentDrawer, setOpenAttachmentDrawer] = useState(false);

    const sanctionDetails = useSelector((state) => state.get_sanction_details);

    const sanctionMessage = sanctionDetails?.response?.data
        ? JSON.parse(sanctionDetails?.response?.data?.sanction_message)
        : {
              msg: "No Sanction Found",
          };

    useEffect(() => {
        dispatch(actions.get_sanction_details(transactionId));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => (count === 2 ? setCount(0) : null), 5000);
        return () => clearTimeout(timer);
    }, [count]);

    const handleCopy = async (e, text) => {
        if (e.detail === 2) {
            setCount(2);
            if ("clipboard" in navigator) {
                await navigator.clipboard.writeText(text);
            } else {
                document.execCommand("copy", true, text);
            }
        }
    };

    const handleCloseSuspiciosModal = () => {
        setOpenSuspiciosModal(false);
    };

    if (data === undefined || data.length == 0) {
        return <MessageBox text="Invalid Transaction Id" />;
    }

    // Drawer added

    const toggleCommentDrawer = () => {
        setOpenCommentDrawer(!openCommentDrawer);
    };

    const toggleAttachmentDrawer = () => {
        setOpenAttachmentDrawer(!openAttachmentDrawer);
    };

    return (
        <>
            <Grid
                container
                rowSpacing={1}
                sx={{
                    padding: "6px 16px",
                    margin: 0,
                    backgroundColor: "background.main",
                }}
            >
                <Grid item xs={12}>
                    <Box>
                        <Header>Partner Information</Header>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container columnSpacing={2} rowSpacing={1} sx={{ paddingBottom: "8px" }}>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Sending Partner Id:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.agent_id ? data?.agent_id : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Payout Partner Id:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payout_agent_id ? data?.payout_agent_id : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Sending Partner:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.agent_name ? data?.agent_name : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Payout Partner:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payout_agent_name ? data?.payout_agent_name : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Sending Branch:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.agent_branch_name ? data?.agent_branch_name : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Header>Customer Information</Header>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container columnSpacing={2} rowSpacing={1} sx={{ paddingBottom: "8px" }}>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Customer Id:</LabelWrapper>
                                <ValueWrapper sx={{ opacity: 0.8 }}>
                                    <Link
                                        to={`/customer/details/${data?.customer_id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {data?.customer_id ? data?.customer_id : "N/A"}
                                    </Link>
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Customer Name:</LabelWrapper>
                                <ValueWrapper
                                    sx={{
                                        wordBreak: "break-all",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {data?.customer_name ? data?.customer_name : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Country:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.send_country ? CountryName(data?.send_country) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Source of Income:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.customer_source_of_income ? data?.customer_source_of_income : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Deposit Type:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.deposit_type ? data?.deposit_type : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Relation:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.beneficiary_relation ? data?.beneficiary_relation : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Header>Beneficiary Information</Header>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container columnSpacing={2} rowSpacing={1} sx={{ paddingBottom: "8px" }}>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Beneficiary Id:</LabelWrapper>
                                <ValueWrapper sx={{ opacity: 0.8 }}>
                                    <Link
                                        to={
                                            data?.is_b2b
                                                ? buildRoute(routePaths.agent.viewB2bBeneficiary, data?.beneficiary_id)
                                                : `/customer/beneficiary/details/${data?.customer_id}/${data?.beneficiary_id}`
                                        }
                                        style={{ textDecoration: "none" }}
                                    >
                                        {data?.beneficiary_id ? data?.beneficiary_id : "N/A"}
                                    </Link>
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Beneficiary Name:</LabelWrapper>
                                <ValueWrapper
                                    sx={{
                                        wordBreak: "break-all",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {data?.beneficiary_name ? data?.beneficiary_name : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Country:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payout_country ? CountryName(data?.payout_country) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Currency:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payout_currency ? CurrencyName(data?.payout_currency) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Reason:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.reason_for_remittance ? data?.reason_for_remittance : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Payment Type:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payment_type ? ReferenceName(1, data?.payment_type) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Location Name:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payout_location_name ? data?.payout_location_name : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Location Branch:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payout_location_branch ? data?.payout_location_branch : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Header>Transaction Information</Header>
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container columnSpacing={2} rowSpacing={1} sx={{ paddingBottom: "8px" }}>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Transaction Id:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.transaction_id ? data?.transaction_id : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Pin Number:</LabelWrapper>
                                <Tooltip title={count === 0 ? "Double Click to Copy." : "Copied to Clipboard."}>
                                    <PinWrapper
                                        sx={{ wordBreak: "break-all" }}
                                        onClick={(e) => handleCopy(e, data?.pin_number)}
                                    >
                                        {data?.pin_number ? data?.pin_number : "N/A"}
                                    </PinWrapper>
                                </Tooltip>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Customer Rate:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payout_currency && data?.payout_currency}{" "}
                                    {data?.customer_rate ? FormatNumber(data?.customer_rate) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Transfer Amount:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.collected_currency && data?.collected_currency}{" "}
                                    {data?.transfer_amount ? FormatNumber(data?.transfer_amount) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Service Charge:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.collected_currency && data?.collected_currency}{" "}
                                    {data?.service_charge ? FormatNumber(data?.service_charge) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Discount:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.collected_currency && data?.collected_currency}{" "}
                                    {data?.discount ? FormatNumber(data?.discount) : "0.00"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Collected Amount:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.collected_currency && data?.collected_currency}{" "}
                                    {data?.collected_amount ? FormatNumber(data?.collected_amount) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoWrapper>
                                <LabelWrapper>Payout Amount:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.payout_currency && data?.payout_currency}{" "}
                                    {data?.payout_amount ? FormatNumber(data?.payout_amount) : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                {data?.compliance_msg && (
                    <>
                        <Grid item xs={12}>
                            <Box>
                                <Header>Compliance Message</Header>
                                <Divider />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <InfoWrapper>
                                <LabelWrapper>Message:</LabelWrapper>
                                <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                    {data?.compliance_msg ? data?.compliance_msg : "N/A"}
                                </ValueWrapper>
                            </InfoWrapper>
                        </Grid>
                    </>
                )}
                <Grid item xs={12} gap={"10px"} display={"flex"}>
                    <BottomButton
                        size="small"
                        variant="outlined"
                        disableElevation
                        disableRipple
                        onClick={() => navigate(`/transaction/remarks/${transactionId}`)}
                    >
                        Remarks
                    </BottomButton>
                    <BottomButton
                        size="small"
                        variant="outlined"
                        disableElevation
                        disableRipple
                        onClick={() => navigate(`/transaction/documents/${transactionId}`)}
                    >
                        Documents
                    </BottomButton>
                    {/* <BottomButton
                        size="small"
                        variant="outlined"
                        disableElevation
                        disableRipple
                        onClick={() => setOpen(false)}
                    >
                        Add Comments
                    </BottomButton> */}

                    <Button variant="outlined" color="primary" onClick={() => setOpenCommentDrawer(true)}>
                        Show Comments
                    </Button>

                    <Button variant="outlined" color="primary" onClick={() => setOpenAttachmentDrawer(true)}>
                        Show Attachments
                    </Button>

                    {isAML && (
                        <>
                            <BottomButton
                                size="small"
                                variant="outlined"
                                disableElevation
                                disableRipple
                                onClick={() => {
                                    setOpenSuspiciosModal(true);
                                }}
                            >
                                View Sanction
                            </BottomButton>
                        </>
                    )}
                    <Drawer anchor="right" open={openCommentDrawer} onClose={toggleCommentDrawer}>
                        <Box sx={{ width: 650, padding: "1rem" }}>
                            <AddComment
                                referenceId={transactionId}
                                referenceType="Transaction"
                                handleClose={() => {
                                    setOpenCommentDrawer(false);
                                }}
                            />
                        </Box>
                    </Drawer>

                    <Drawer anchor="right" open={openAttachmentDrawer} onClose={toggleAttachmentDrawer}>
                        <Box sx={{ width: 650, padding: "1rem" }}>
                            <GetAttachment
                                attachmentType="Transaction"
                                attachmentId={transactionId}
                                onClose={setOpenAttachmentDrawer}
                            />
                        </Box>
                    </Drawer>
                </Grid>
            </Grid>
            <SuspiciosModal open={openSuspiciosModal} data={sanctionMessage} handleClose={handleCloseSuspiciosModal} />
        </>
    );
}

export default React.memo(Details);
