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
import UpdateKycUserStatusForm from "Private/components/KycUser/UpdateKycUserStatusForm";
import { RenderField, Title, TitleWrapper } from "App/components/Container";

import { KycUserActions } from "./store";

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
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Name" value={response?.data?.fullName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Gender" value={response?.data?.genderName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Mobile Number" value={response?.data?.mobileNumber} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Date of Birth" value={convertDate(response?.data?.dateOfBirth)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RenderField label="Birth Country" value={response?.data?.birthCountry?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Identity Type" value={response?.data?.identityType} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Identity No" value={response?.data?.identityNo} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField
                            label="Identity Issued Country"
                            value={response?.data?.identityIssuedCountry?.country}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField
                            label="Identity Issued Date"
                            value={convertDate(response?.data?.identityIssuedDate)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField
                            label="Identity Expiry Date"
                            value={convertDate(response?.data?.identityExpiryDate)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Remarks" value={response?.data?.remarks} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RenderField label="Designation" value={response?.data?.designationName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Status" value={response?.data?.statusName} />
                    </Grid>

                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title> Temporary Address Details</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country" value={response?.data?.temporaryAddress?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="PostCode" value={response?.data?.temporaryAddress?.postCode} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Unit" value={response?.data?.temporaryAddress?.unit} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Street" value={response?.data?.temporaryAddress?.street} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="City" value={response?.data?.temporaryAddress?.city} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="State" value={response?.data?.temporaryAddress?.state} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Address" value={response?.data?.temporaryAddress?.address} />
                    </Grid>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title> Permanent Address Details</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country" value={response?.data?.permanentAddress?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="PostCode" value={response?.data?.permanentAddress?.postCode} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Unit" value={response?.data?.permanentAddress?.unit} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Street" value={response?.data?.permanentAddress?.street} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="City" value={response?.data?.permanentAddress?.city} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="State" value={response?.data?.permanentAddress?.state} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Address" value={response?.data?.permanentAddress?.address} />
                    </Grid>

                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Documents</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>

                    {response?.data?.documents?.map((item) => {
                        return (
                            <Grid xs={12} md={6} mt={2}>
                                <a
                                    href={item?.documentLink}
                                    target="_blank"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    {item?.fileType?.includes("image") ? (
                                        <>
                                            <Typography my={2}>{item?.documentName}</Typography>
                                            <img
                                                src={item?.documentLink}
                                                alt={item?.documentName}
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
                                            <Typography>{item?.documentName}</Typography>
                                        </Box>
                                    )}
                                </a>
                            </Grid>
                        );
                    })}
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Users</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="User" value={response?.data?.userName} />
                    </Grid>
                </Grid>
            )}
            <Modal title="Approve/Reject Kyc User" open={open} onClose={handleClose}>
                <UpdateKycUserStatusForm setOpen={setOpen} />
            </Modal>
        </PageContent>
    );
}
