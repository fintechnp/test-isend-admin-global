import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Modal from "App/components/Modal/Modal";
import buildRoute from "App/helpers/buildRoute";
import Spacer from "App/components/Spacer/Spacer";
import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import BusinessKycDetail from "../Business/BusinessKycDetail";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { businessActions as actions } from "Private/pages/Business/store";

export default function MarketMakerUserKycListing({ userData, loading }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { marketMakerId } = useParams();

    const [open, setOpen] = useState(false);

    const { response: kycDetailData, loading: kycDetailLoading } = useSelector(
        (state) => state.get_business_kyc_details,
    );

    const columns = useMemo(
        () => [
            {
                header: "Name",
                accessorKey: "user_name",
            },
            {
                header: "Email",
                accessorKey: "user_email",
            },

            {
                header: "Actions",
                cell: ({ row }) => (
                    <>
                        {!row?.original?.hasDefaultUserKyc ? (
                            <Button
                                onClick={() => {
                                    navigate(buildRoute(routePaths.agent.addUserKyc, row?.original?.user_id));
                                }}
                            >
                                Add KYC
                            </Button>
                        ) : (
                            <TableRowActionContainer>
                                <IconButton
                                    onClick={() => {
                                        setOpen(true);
                                        dispatch(actions.get_business_kyc_details(userData?.kycId));
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
                                <IconButton
                                    onClick={() => {
                                        navigate(buildRoute(routePaths.agent.editUserKyc, row?.original?.kycId));
                                    }}
                                >
                                    <EditOutlinedIcon
                                        sx={{
                                            fontSize: "20px",
                                            "&:hover": {
                                                background: "transparent",
                                            },
                                        }}
                                    />
                                </IconButton>
                            </TableRowActionContainer>
                        )}
                    </>
                ),
            },
        ],
        [userData],
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
        <>
            <TanstackReactTable columns={columns} title="User KYC" data={[userData]} loading={loading} />
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
        </>
    );
}
