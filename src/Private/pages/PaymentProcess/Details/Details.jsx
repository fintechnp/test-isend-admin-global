import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Drawer from "@mui/material//Drawer";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import actions from "../store/actions";
import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import { ReferenceName } from "App/helpers";
import PageContent from "App/components/Container/PageContent";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import SendMail from "./SendMailModal";
import SuspiciosModal from "./SuspiciosModal";
import PaymentType from "../data/PaymentType";
import Modal from "App/components/Modal/Modal";
import useCountries from "App/hooks/useCountries";
import Clipboard from "App/components/Clipboard/Clipboard";
import AddComment from "Private/pages/Transactions/Comments/AddComment";
import documentActions from "Private/pages/Customers/Documents/store/actions";
import GetAttachment from "Private/pages/Transactions/Attachments/GetAttachment";

const StyledStatusStepper = styled(Stack)(({ theme }) => ({
    direction: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
    position: "relative",
    "&::after": {
        content: '""',
        position: "absolute",
        left: "11px",
        top: "20px",
        bottom: "-40px",
        borderLeft: `3px solid ${theme.palette.primary.main}`,
    },
}));

const ResponsiveBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
    },
}));

const StyledIconBox = styled(Stack)(({ theme }) => ({
    padding: 0.5,
    borderRadius: "50%",
    zIndex: 1,
}));

const Wrapper = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.stroke.base}`,
    padding: theme.spacing(2),
    height: "100%",
    borderRadius: "8px",
}));

const StyleImageWrapper = styled(Grid)(({ theme }) => ({
    maxHeight: "100%",
    overflowY: "auto",
    textAlign: "left",
    [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
    },
}));

export default function Details({ data, isAML = false }) {
    const [openCommentDrawer, setOpenCommentDrawer] = useState(false);
    const [openSuspiciosModal, setOpenSuspiciosModal] = useState(false);
    const [openAttachmentDrawer, setOpenAttachmentDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { tid } = useParams();

    const transactionId = tid;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const sanctionDetails = useSelector((state) => state.get_sanction_details);

    const customerId = data?.customer_id;

    const { loading: downloadPdfLoading } = useSelector((state) => state.download_transaction_pdf);

    const { response: Documents, loading } = useSelector((state) => state.get_documents);

    useEffect(() => {
        if (customerId) {
            dispatch(
                documentActions.get_documents(customerId, {
                    status: "active",
                }),
            );
        }
    }, [dispatch, customerId]);

    const DocumentsUrl = Array.isArray(Documents?.data)
        ? Documents.data.map((doc) => doc?.document).filter((url) => url)
        : [];

    const sanctionMessage = sanctionDetails?.response?.data
        ? JSON.parse(sanctionDetails?.response?.data?.sanction_message)
        : {
              msg: "No Sanction Found",
          };

    const toggleCommentDrawer = () => {
        setOpenCommentDrawer(!openCommentDrawer);
    };

    const toggleAttachmentDrawer = () => {
        setOpenAttachmentDrawer(!openAttachmentDrawer);
    };

    const handleDownloadPDF = () => {
        dispatch(
            actions.download_transaction_pdf({
                transactionId: transactionId,
            }),
        );
    };

    const handleSendMail = () => {
        setOpenModal(true);
    };

    const { getCountryNameByIso3 } = useCountries();

    const transactionDefinition = useSourceDetail([
        {
            title: data?.agent_name,
            items: [
                {
                    label: "Transaction ID",
                    accessorKey: "transaction_id",
                    cell: (data) => (
                        <>
                            <Clipboard
                                label={<Typography fontWeight={600}>{data.transaction_id}</Typography>}
                                content={data?.transaction_id}
                            />
                        </>
                    ),
                },
                {
                    label: "IPAY PIN",
                    accessorKey: "pin_number",
                    cell: (data) => (
                        <>
                            <Clipboard
                                label={<Typography fontWeight={600}>{data.pin_number}</Typography>}
                                content={data?.pin_number}
                            />
                        </>
                    ),
                },
                {
                    label: "Transaction Data/Time",
                    cell: (data) => (data.created_ts ? dateUtils.getLocalDateTimeFromUTC(data.created_ts) : "-"),
                },
            ],
        },
    ]);

    const CustomerDefinition = useSourceDetail([
        {
            title: "Customer Details",
            items: [
                {
                    label: "Customer ID",
                    accessorKey: "customer_id",
                    cell: (data) => (
                        <>
                            <Clipboard
                                label={<Typography fontWeight={600}>{data.customer_id}</Typography>}
                                content={data?.customer_id}
                            />
                        </>
                    ),
                },
                {
                    label: "Customer Name",
                    accessorKey: "customer_name",
                },
                {
                    label: "Customer Email",
                    accessorKey: "customer_email",
                },
                {
                    label: "Customer Phone Number",
                    accessorKey: "customer_phone",
                },
                {
                    label: "Customer ID Type",
                    accessorKey: "customer_id_type",
                },
                {
                    label: "Source of Income",
                    accessorKey: "customer_source_of_income",
                },

                {
                    label: "Country",
                    cell: (data) => getCountryNameByIso3(data?.send_country),
                },
                {
                    label: "Deposit Type",
                    accessorKey: "deposit_type",
                },
            ],
        },
    ]);

    const BeneficiaryDefinition = useSourceDetail([
        {
            title: "Beneficiary Details",
            items: [
                {
                    label: "Beneficiary ID",
                    accessorKey: "beneficiary_id",
                    cell: (data) => (
                        <>
                            <Clipboard
                                label={<Typography fontWeight={600}>{data.beneficiary_id}</Typography>}
                                content={data.beneficiary_id}
                            />
                        </>
                    ),
                },
                {
                    label: "Beneficiary Name",
                    accessorKey: "beneficiary_name",
                },
                {
                    label: "Relation",
                    accessorKey: "beneficiary_relation",
                },
                {
                    label: "Reason",
                    accessorKey: "reason_for_remittance",
                },
                {
                    label: "Country",
                    accessorKey: "payout_country_data",
                },

                ...(PaymentType.wallet === data.payment_type
                    ? [
                          {
                              label: "Location Name",
                              accessorKey: "payout_location_name",
                          },
                      ]
                    : []),

                ...(PaymentType.cashPickup === data.payment_type
                    ? [
                          {
                              label: "Wallet Name",
                              accessorKey: "payout_location_name",
                          },
                      ]
                    : []),
                ...(PaymentType.bankTransfer === data.payment_type
                    ? [
                          {
                              label: "Bank Account Number",
                              accessorKey: "bank_account_number",
                          },
                          {
                              label: "Bank Name",
                              accessorKey: "payout_location_name",
                          },
                      ]
                    : []),
            ],
        },
    ]);

    const documents = [
        {
            label: "Receipt",
            urls: [data?.ref3].filter((v) => !isEmpty(v)),
        },
        {
            label: "KYC Documents",
            urls: DocumentsUrl,
        },
    ];

    const transactionStatus = [
        {
            label: `${data?.transaction_status}`,
            date: `${dateUtils.getLocalDateTimeFromUTC(data?.created_ts)}`,
        },
    ];

    const transactionStatusDefinition = transactionStatus.map((item, index) => (
        <Box key={index} sx={{ display: "flex", mb: 3 }}>
            <StyledStatusStepper
                sx={{
                    position: "relative",
                    "&::after": {
                        display: index === transactionStatus.length - 1 ? "none" : "block",
                    },
                }}
            >
                <StyledIconBox>
                    <CircleIcon color="primary" sx={{ fontSize: 25 }} />
                </StyledIconBox>
            </StyledStatusStepper>

            <Stack direction="column" spacing={0.5}>
                <Typography variant="body1"> {item?.label}</Typography>
                <Typography variant="caption"> {item?.date}</Typography>
            </Stack>
        </Box>
    ));

    const documentStatusDefinition = documents
        .filter((item) => item.urls && item.urls.length > 0)
        .map((item, i) => (
            <Grid
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
                mb={2}
                mt={2}
                item
                key={i}
            >
                <Typography variant="body1">{item?.label}</Typography>
                {item.urls.map((url, index) => (
                    <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={url}
                            alt={`${item?.label} ${index + 1}`}
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                margin: "auto",
                                marginBottom: "10px",
                            }}
                        />
                    </a>
                ))}
            </Grid>
        ));

    const amountData = [
        {
            transfer_amount: `${data?.collected_currency} ${Number(data?.transfer_amount ?? 0).toLocaleString()}`,
            customer_rate: `${data?.payout_currency} ${Number(data?.customer_rate ?? 0).toLocaleString()}`,
            service_charge: `${data?.collected_currency} ${Number(data?.service_charge ?? 0).toLocaleString()}`,
            discount_amount: `${data?.collected_currency} ${Number(data?.discount_amount ?? 0).toLocaleString() ?? 0}`,
            collected_amount: `${data?.collected_currency} ${Number(data?.collected_amount ?? 0).toLocaleString()}`,
            payout_amount: `${data?.payout_currency} ${Number(data?.payout_amount ?? 0).toLocaleString()}`,
        },
    ];

    const columns = useMemo(() => [
        {
            header: "Transfer Amount",
            cell: ({ row }) => {
                return <>{row.original.transfer_amount}</>;
            },
        },

        {
            header: "Exchange Rate",
            cell: ({ row }) => {
                return <>{row.original.customer_rate}</>;
            },
        },
        {
            header: "Service Charge",
            accessorKey: "service_charge",
        },
        {
            header: "Discount Amount",
            accessorKey: "discount_amount",
        },
        {
            header: "Collected Amount",
            accessorKey: "collected_amount",
        },
        {
            header: "Payout Amount",
            accessorKey: "payout_amount",
        },
    ]);

    const handleCloseSuspiciosModal = () => {
        setOpenSuspiciosModal(false);
    };

    return (
        <PageContent
            breadcrumbs={[
                {
                    label: "Transactions",
                },
                {
                    label: "Details",
                },
            ]}
        >
            <PageContentContainer title="Transaction Details">
                <ResponsiveBox
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Grid container spacing={3}>
                        {/* Header */}

                        {/* Left Column */}
                        <Grid item xs={12} md={6}>
                            <Wrapper>
                                <SourceDetails
                                    viewMode="column"
                                    rowMode="row"
                                    definition={transactionDefinition}
                                    data={data}
                                />
                            </Wrapper>
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={12} md={6}>
                            <Wrapper>
                                <Typography variant="h6">Transaction Status</Typography>
                                {transactionStatusDefinition}
                            </Wrapper>
                        </Grid>

                        {/* Customer Details */}
                        <Grid item xs={12} md={6}>
                            <Wrapper>
                                <SourceDetails
                                    viewMode="column"
                                    rowMode="row"
                                    definition={CustomerDefinition}
                                    data={data}
                                />
                            </Wrapper>
                        </Grid>

                        {/* Beneficiary Details */}
                        <Grid item xs={12} md={6}>
                            <Wrapper>
                                <SourceDetails
                                    viewMode="column"
                                    rowMode="row"
                                    definition={BeneficiaryDefinition}
                                    data={data}
                                />
                            </Wrapper>
                        </Grid>

                        {/* Transaction Table */}
                        <Grid mb={2} item xs={12}>
                            <TanstackReactTable columns={columns} data={amountData} />
                        </Grid>
                    </Grid>
                    <StyleImageWrapper>
                        <Wrapper
                            sx={{
                                maxHeight: "100%",
                                overflowY: "auto",
                                textAlign: "left",
                            }}
                        >
                            <Typography variant="h6">Documents</Typography>

                            {documentStatusDefinition}
                        </Wrapper>
                    </StyleImageWrapper>
                </ResponsiveBox>

                <Grid item xs={12} gap={"10px"} display={"flex"}>
                    <Button
                        size="small"
                        variant="outlined"
                        disableElevation
                        disableRipple
                        onClick={() => navigate(`/transaction/remarks/${transactionId}`)}
                    >
                        Remarks
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        disableElevation
                        disableRipple
                        onClick={() => navigate(`/transaction/documents/${transactionId}`)}
                    >
                        Documents
                    </Button>

                    <Button
                        size="large"
                        variant="outlined"
                        disableElevation
                        disableRipple
                        onClick={() => setOpenCommentDrawer(true)}
                    >
                        Comments
                    </Button>

                    <Button variant="outlined" color="primary" onClick={() => setOpenAttachmentDrawer(true)}>
                        Attachments
                    </Button>

                    <SuspiciosModal
                        open={openSuspiciosModal}
                        data={sanctionMessage}
                        handleClose={handleCloseSuspiciosModal}
                    />

                    {data?.is_b2b && (
                        <>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleDownloadPDF}
                                disabled={downloadPdfLoading}
                            >
                                Export PDF
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    handleSendMail();
                                }}
                            >
                                Send Mail
                            </Button>

                            {isAML && (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        disableElevation
                                        disableRipple
                                        onClick={() => {
                                            setOpenSuspiciosModal(true);
                                        }}
                                    >
                                        View Sanction
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Grid>

                <Drawer anchor="right" open={openCommentDrawer} onClose={toggleCommentDrawer}>
                    <Box sx={{ width: 650, px: 2 }}>
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

                <SuspiciosModal
                    open={openSuspiciosModal}
                    data={sanctionMessage}
                    handleClose={handleCloseSuspiciosModal}
                />

                <Modal
                    title="Send Mail"
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                    }}
                    sx={{
                        width: "100%",
                    }}
                    children={
                        <SendMail
                            id={transactionId}
                            onClose={() => {
                                setOpenModal(false);
                            }}
                        />
                    }
                />
            </PageContentContainer>
        </PageContent>
    );
}
