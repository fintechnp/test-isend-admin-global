import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { businessActions as actions } from "Private/pages/Business/store";
import { Loading } from "App/components";
import { Grid, IconButton } from "@mui/material";
import NoResults from "Private/pages/Transactions/components/NoResults";
import Spacer from "App/components/Spacer/Spacer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Modal from "App/components/Modal/Modal";
import BusinessKycDetail from "./BusinessKycDetail";

export default function BusinessKycListing() {
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const { response, loading } = useSelector((state) => state.get_business_kyc);

    const { response: kycDetailData, loading: kycDetailLoading } = useSelector(
        (state) => state.get_business_kyc_details,
    );

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Name",
                accessorKey: "fullName",
            },
            {
                header: "Date of Birth",
                accessorKey: "dateOfBirth",
            },
            {
                header: "Gender",
                accessorKey: "genderName",
            },
            {
                header: "Identity No",
                accessorKey: "identityNo",
            },
            {
                header: "Identity Issued Country",
                accessorKey: "identityIssuedCountry.country",
            },
            {
                header: "Mobile Number",
                accessorKey: "mobileNumber",
            },
            {
                header: "Related KYB",
                accessorKey: "relatedKybName",
            },

            {
                header: "Remarks",
                accessorKey: "remarks",
            },
            {
                header: "Status",
                accessorKey: "statusName",
            },

            {
                header: "Actions",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                setOpen(true);
                                dispatch(actions.get_business_kyc_details(row?.original?.kycId));
                            }}
                        >
                            <RemoveRedEyeOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        </IconButton>
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(
            actions.get_business_kyc({
                businessId,
            }),
        );
    }, []);
    return (
        <>
            {loading && (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            )}
            {!loading && response?.data && response?.data?.length === 0 ? (
                <Grid item xs={12}>
                    <NoResults text="No KYC Found" />
                </Grid>
            ) : (
                <>
                    <Spacer />
                    <TanstackReactTable columns={columns} title="KYB" data={response?.data ?? []} loading={loading} />
                </>
            )}
            <Modal
                title="Kyc Detail"
                open={open}
                onClose={handleClose}
                sx={{
                    width: "60%",
                }}
            >
                <BusinessKycDetail data={kycDetailData?.data} loading={kycDetailLoading} />
            </Modal>
        </>
    );
}
