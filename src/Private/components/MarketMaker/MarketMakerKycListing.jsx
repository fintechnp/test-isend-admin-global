import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import Modal from "App/components/Modal/Modal";
import buildRoute from "App/helpers/buildRoute";
import Spacer from "App/components/Spacer/Spacer";
import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import BusinessKycDetail from "../Business/BusinessKycDetail";
import PageContent from "App/components/Container/PageContent";
import NoResults from "Private/pages/Transactions/components/NoResults";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { businessActions as actions } from "Private/pages/Business/store";

export default function MarketMakerKycListing() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { marketMakerId } = useParams();

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
                marketMakerId,
            }),
        );
    }, []);
    return (
        <PageContent
            topRightEndContent={
                <Button
                    onClick={() => {
                        navigate(buildRoute(routePaths.agent.addMarketMakerKyc, marketMakerId));
                    }}
                >
                    Add KYC
                </Button>
            }
        >
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
                <BusinessKycDetail data={kycDetailData?.data} loading={kycDetailLoading} relatedTo="market-maker" />
            </Modal>
        </PageContent>
    );
}
