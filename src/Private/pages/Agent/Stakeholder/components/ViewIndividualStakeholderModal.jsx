import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Row from "App/components/Row/Row";
import Modal from "App/components/Modal/Modal";
import PopoverButton from "App/components/Button/PopoverButton";
import SourceDetails from "App/core/source-detail/SourceDetails";
import ChangeIndividualStakeholderStatusModal from "./ChangeIndividualStakeholderStatusModal";

import Documents from "./Documents";
import isEmpty from "App/helpers/isEmpty";
import { stakeholderActions } from "../store";
import useModal from "Private/hooks/useModal";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import IndividualStakeholderStatusBadge from "./IndividualStakeholderStatusBadge";
import { individualStakeholderStatus } from "../data/stakeholderStatus";

export default function ViewIndividualStakeholderModal({
    stakeholderId,
    onClose,
    onChangeStatusSuccess,
    onEditStakeholder,
}) {
    const dispatch = useDispatch();

    const { isModalOpen, openModal, closeModal } = useModal("ChangeIndividualStakeholderStatus");

    const { response, loading: isLoading } = useSelector((state) => state.get_individual_stakeholder_by_id);

    const data = response?.data;

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                {
                    label: "Organization",
                    accessorKey: "relatedKybName",
                },
            ],
        },
        {
            title: "Personal Details",
            items: [
                {
                    label: "Full Name",
                    accessorKey: "fullName",
                },
                {
                    label: "Designation",
                    accessorKey: "designationName",
                },
                {
                    label: "Gender",
                    accessorKey: "genderName",
                },
                {
                    label: "Date of Birth",
                    accessorKey: "dateOfBirth",
                },
                {
                    label: "Mobile Number",
                    accessorKey: "mobileNumber",
                },
                {
                    label: "Birth Country",
                    accessorKey: "birthCountry.country",
                },
                {
                    label: "Identity Type",
                    accessorKey: "identityType",
                },
                {
                    label: "Identity Number",
                    accessorKey: "identityNo",
                },
                {
                    label: "Identity Issued By",
                    accessorKey: "identityIssuedBy",
                },
                {
                    label: "Identity Issued Country",
                    accessorKey: "identityIssuedCountry.country",
                },
                {
                    label: "Identity Issued Date",
                    accessorKey: "identityIssuedDate",
                },
                {
                    label: "Identity Expiry Date",
                    accessorKey: "identityExpiryDate",
                },
                {
                    label: "Status",
                    cell: (data) => <IndividualStakeholderStatusBadge statusId={data.status} label={data.statusName} />,
                },
                {
                    label: "Remarks",
                    accessorKey: "remarks",
                },
            ],
        },
        {
            title: "Permanent Address",
            items: [
                {
                    label: "Country",
                    accessorKey: "permanentAddress.countryDetails.country",
                },
                {
                    label: "State",
                    accessorKey: "permanentAddress.state",
                },
                {
                    label: "City",
                    accessorKey: "permanentAddress.city",
                },
                {
                    label: "Postal Code",
                    accessorKey: "permanentAddress.postCode",
                },
                {
                    label: "Street",
                    accessorKey: "permanentAddress.street",
                },
                {
                    label: "Unit",
                    accessorKey: "permanentAddress.unit",
                },
                {
                    label: "Address",
                    accessorKey: "permanentAddress.address",
                },
            ],
        },
        {
            title: "Temporary Address",
            items: [
                {
                    label: "Country",
                    accessorKey: "temporaryAddress.countryDetails.country",
                },
                {
                    label: "State",
                    accessorKey: "temporaryAddress.state",
                },
                {
                    label: "City",
                    accessorKey: "temporaryAddress.city",
                },
                {
                    label: "Postal Code",
                    accessorKey: "temporaryAddress.postCode",
                },
                {
                    label: "Street",
                    accessorKey: "temporaryAddress.street",
                },
                {
                    label: "Unit",
                    accessorKey: "temporaryAddress.unit",
                },
                {
                    label: "Address",
                    accessorKey: "temporaryAddress.address",
                },
            ],
        },
    ]);

    const fetch = () => dispatch(stakeholderActions.get_individual_stakeholder_by_id(stakeholderId));

    useEffect(() => {
        if (stakeholderId) {
            fetch();
        }
    }, [stakeholderId]);

    return (
        <Modal
            title="Individual Stakeholder Details"
            open={!isEmpty(stakeholderId)}
            onClose={onClose}
            sx={{ minWidth: "600px" }}
        >
            <Box>
                <Row justifyContent="flex-end">
                    <PopoverButton variant="button" disabled={isLoading}>
                        {({ onClose }) => (
                            <>
                                <ListItemButton onClick={() => (openModal(), onClose())}>Update Status</ListItemButton>
                                {data?.status !== individualStakeholderStatus.APPROVED && (
                                    <ListItemButton onClick={() => onEditStakeholder?.(data.kycId)}>
                                        Edit
                                    </ListItemButton>
                                )}
                            </>
                        )}
                    </PopoverButton>
                </Row>
            </Box>
            <SourceDetails definition={definition} data={data} isLoading={isLoading} />
            <Divider sx={{ my: "16px" }} />
            <Documents data={data?.documents ?? []} isLoading={isLoading} />
            {data && stakeholderId && (
                <ChangeIndividualStakeholderStatusModal
                    open={isModalOpen}
                    onClose={closeModal}
                    stakeholderId={stakeholderId}
                    onSuccess={() => {
                        fetch();
                        onChangeStatusSuccess?.();
                    }}
                    currentStatusId={data.status}
                />
            )}
        </Modal>
    );
}

ViewIndividualStakeholderModal.propTypes = {
    stakeholderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
    onChangeStatusSuccess: PropTypes.func,
    onEditStakeholder: PropTypes.func,
};
