import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

import { Loading } from "App/components";
import Row from "App/components/Row/Row";
import Modal from "App/components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import PopoverButton from "App/components/Button/PopoverButton";
import { RenderField, Title, TitleWrapper } from "App/components/Container";

import { userActions } from "../store";
import isEmpty from "App/helpers/isEmpty";
import useModal from "Private/hooks/useModal";
import ChangeUserKycStatusModal from "./ChangeUserKycStatusModal";

export default function ViewKycModal({ kycId, onClose, onChangeStatusSuccess }) {
    const { isModalOpen, closeModal, openModal } = useModal("ChangeUserKycStatus");

    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.get_b2b_user_kyc_by_id);

    const data = response?.data;

    const fetch = () => dispatch(userActions.get_b2b_user_kyc_by_id(kycId));

    useEffect(() => {
        if (kycId) {
            fetch();
        }
    }, [kycId]);

    return (
        <Modal open={!isEmpty(kycId)} title="User KYC" onClose={onClose}>
            {!loading && (
                <Row justifyContent="flex-end">
                    <PopoverButton variant="button">
                        {({ onClose }) => (
                            <>
                                <ListItemButton onClick={openModal}>Update Status</ListItemButton>
                            </>
                        )}
                    </PopoverButton>
                </Row>
            )}
            <>
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
                            <RenderField label="Name" value={data?.fullName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Date of Birth" value={data?.dateOfBirth} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Gender" value={data?.genderName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Mobile Number" value={data?.mobileNumber} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Birth Country" value={data?.birthCountry?.country} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Identity Type" value={data?.identityType} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Identity No " value={data?.identityNo} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Identity Issued Date " value={data?.identityIssuedDate} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Identity Issued By " value={data?.identityIssuedBy} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField
                                label="Identity issued country "
                                value={data?.identityIssuedCountry?.country}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Identity Expiry Date" value={data?.identityExpiryDate} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Status" value={data?.statusName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Remarks" value={data?.remarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Designation" value={data?.designationName} />
                        </Grid>

                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Temporary Address</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Address" value={data?.temporaryAddress?.address} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="City" value={data?.temporaryAddress?.city} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Country" value={data?.temporaryAddress?.countryDetails.country} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Post Code" value={data?.temporaryAddress?.postCode} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="State" value={data?.temporaryAddress?.state} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Street" value={data?.temporaryAddress?.street} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Unit" value={data?.address?.unit} />
                        </Grid>
                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Permanent Address</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Address" value={data?.permanentAddress?.address} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="City" value={data?.permanentAddress?.city} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Country" value={data?.permanentAddress?.countryDetails.country} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Post Code" value={data?.permanentAddress?.postCode} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="State" value={data?.permanentAddress?.state} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Street" value={data?.permanentAddress?.street} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Unit" value={data?.permanentAddress?.unit} />
                        </Grid>
                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Documents</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>

                        {data?.documents?.map((item) => {
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
                    </Grid>
                )}
            </>
            {data && (
                <ChangeUserKycStatusModal
                    open={isModalOpen}
                    onClose={closeModal}
                    kycId={kycId}
                    currentStatusId={data?.status}
                    onSuccess={() => {
                        fetch();
                        onChangeStatusSuccess?.();
                    }}
                />
            )}
        </Modal>
    );
}

ViewKycModal.propTypes = {
    kycId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
    onChangeStatusSuccess: PropTypes.func,
};
