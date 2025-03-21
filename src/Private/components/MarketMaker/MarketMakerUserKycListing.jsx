import Typography from "@mui/material/Typography";
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

import { businessActions as actions } from "Private/pages/Agent/Business/store";

import { MarketMakerActions as mActions } from "Private/pages/Agent/MarketMaker/store";

export default function MarketMakerUserKycListing({ agentId }) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { response: kycDetailData, loading: kycDetailLoading } = useSelector(
        (state) => state.get_business_kyc_details,
    );
    const { response: users, loading: userLoading } = useSelector((state) => state.get_market_maker_users);

    useEffect(() => {
        dispatch(mActions.get_market_maker_users(agentId));
    }, [agentId]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Name",
                accessorKey: "user_name",
            },
            {
                header: "Email",
                accessorKey: "user_email",
            },
            {
                header: "User Type",
                cell: ({ row }) => <Typography>{row?.original?.isDefaultUser ? "Admin" : "User"}</Typography>,
            },

            {
                header: "Actions",
                cell: ({ row }) => (
                    <>
                        {(() => {
                            if (row?.original?.isDefaultUser && !row?.original?.hasKyc) {
                                return (
                                    <Button
                                        onClick={() => {
                                            navigate(buildRoute(routePaths.agent.addUserKyc, row?.original?.user_id));
                                        }}
                                    >
                                        Add KYC
                                    </Button>
                                );
                            } else if (row?.original?.isDefaultUser && row?.original?.hasKyc) {
                                return (
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
                                        <IconButton
                                            onClick={() => {
                                                navigate(
                                                    buildRoute(routePaths.agent.editUserKyc, row?.original?.kycId),
                                                );
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
                                );
                            } else if (!row?.original?.isDefaultUser && row?.original?.hasKyc) {
                                return (
                                    <TableRowActionContainer>
                                        <IconButton
                                            onClick={() => {
                                                navigate(
                                                    buildRoute(routePaths.agent.viewKycUser, row?.original?.kycId),
                                                );
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
                                );
                            } else {
                                return <></>;
                            }
                        })()}
                    </>
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
                marketMakerId: agentId,
            }),
        );
    }, []);
    return (
        <>
            <TanstackReactTable columns={columns} title="Users" data={users?.data ?? []} loading={userLoading} />
            <Modal title="Kyc Detail" open={open} onClose={handleClose}>
                <BusinessKycDetail data={kycDetailData?.data} loading={kycDetailLoading} relatedTo="market-maker" />
            </Modal>
        </>
    );
}
