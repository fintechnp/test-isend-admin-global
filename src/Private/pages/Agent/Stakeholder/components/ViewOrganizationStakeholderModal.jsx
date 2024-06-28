import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Row from "App/components/Row/Row";
import { Loading } from "App/components";
import Modal from "App/components/Modal/Modal";
import PopoverButton from "App/components/Button/PopoverButton";
import { RenderField, Title, TitleWrapper } from "App/components/Container";

import isEmpty from "App/helpers/isEmpty";
import { stakeholderActions } from "../store";
import useModal from "Private/hooks/useModal";
import { approveBusinessStakeholderSchema } from "../schema/approveBusinessStakeholderSchema";
import ChangeOrganizationStakeholderStatusModal from "./ChangeOrganizationStakeholderStatusModal";

export default function ViewOrganizationStakeholderModal({ stakeholderId, onClose, onChangeStatusSuccess }) {
    const { isModalOpen, openModal, closeModal } = useModal("ChangeOrganizationStakeholderStatus");

    const methods = useForm({
        resolver: yupResolver(approveBusinessStakeholderSchema),
    });

    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.get_organization_stakeholder_by_id);

    const data = response?.data;

    const fetch = () => dispatch(stakeholderActions.get_organization_stakeholder_by_id(stakeholderId));

    useEffect(() => {
        if (stakeholderId) {
            fetch();
        }
    }, [stakeholderId]);

    return (
        <Modal
            title="Organization Stakeholder Details"
            open={!isEmpty(stakeholderId)}
            onClose={onClose}
            sx={{ minWidth: "600px" }}
        >
            <Box>
                <Row justifyContent="flex-end">
                    <PopoverButton variant="button" disabled={loading}>
                        {({ onClose }) => (
                            <>
                                <ListItemButton onClick={() => (openModal(), onClose())}>Update Status</ListItemButton>
                            </>
                        )}
                    </PopoverButton>
                </Row>
            </Box>
            {loading ? (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            ) : (
                <>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Details</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Name" value={data?.name} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Brand Name" value={data?.brandName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registration No" value={data?.registrationNo} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registration Date" value={data?.registeredDate} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registered Country" value={data?.registeredCountry?.country} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Status" value={data?.status} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Remarks" value={data?.remarks} />
                        </Grid>
                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Address</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Address" value={data?.address?.address} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="City" value={data?.address?.city} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Country" value={data?.address?.country} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <RenderField label="Post Code" value={data?.address?.postCode} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="State" value={data?.address?.state} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Street" value={data?.address?.street} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Unit" value={data?.address?.unit} />
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
                </>
            )}
            {data && (
                <ChangeOrganizationStakeholderStatusModal
                    currentStatusId={data.statusId}
                    onClose={closeModal}
                    onSuccess={() => {
                        fetch();
                        onChangeStatusSuccess?.();
                    }}
                    open={isModalOpen}
                    stakeholderId={stakeholderId}
                />
            )}
        </Modal>
    );
}

ViewOrganizationStakeholderModal.propTypes = {
    stakeholderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
    onChangeStatusSuccess: PropTypes.func,
};
