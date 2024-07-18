import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useMemo, useState } from "react";

import ViewKycModal from "./ViewKycModal";
import PopoverButton from "App/components/Button/PopoverButton";

import isEmpty from "App/helpers/isEmpty";
import { relatedTo } from "Private/data/b2b";
import useModal from "Private/hooks/useModal";
import buildRoute from "App/helpers/buildRoute";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { businessActions as actions } from "Private/pages/Agent/Business/store";
import { MarketMakerActions as mActions } from "Private/pages/Agent/MarketMaker/store";

// TODO: this component is only options for Agent User and remaining for Business User
export default function Users({ agentId }) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [selectedId, setSelectedId] = useState(null);

    const [open, setOpen] = useState(false);

    const { isModalOpen, openModal, closeModal } = useModal("ViewUserKyc");

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
                            if (row.original.isDefaultUser && !row.original.hasKyc) {
                                return (
                                    <PopoverButton>
                                        {({ onClose }) => {
                                            return (
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(
                                                            buildRoute(routePaths.agent.addUserKyc, {
                                                                agentId: agentId,
                                                                userId: row.original.user_id,
                                                            }),
                                                        );
                                                    }}
                                                >
                                                    Add KYC
                                                </ListItemButton>
                                            );
                                        }}
                                    </PopoverButton>
                                );
                            } else if (row.original.isDefaultUser && row.original.hasKyc) {
                                return (
                                    <PopoverButton>
                                        {({ onClose }) => {
                                            return (
                                                <>
                                                    <ListItemButton
                                                        onClick={() => (setSelectedId(row.original.kycId), onClose())}
                                                    >
                                                        View
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        onClick={() => {
                                                            navigate(
                                                                buildRoute(
                                                                    routePaths.agent.editUserKyc,
                                                                    row.original.kycId,
                                                                ),
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </ListItemButton>
                                                </>
                                            );
                                        }}
                                    </PopoverButton>
                                );
                            } else if (!row.original.isDefaultUser && row.original.hasKyc) {
                                return (
                                    <PopoverButton>
                                        {({ onClose }) => {
                                            return (
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(
                                                            buildRoute(
                                                                routePaths.agent.viewKycUser,
                                                                row?.original.kycId,
                                                            ),
                                                        );
                                                    }}
                                                >
                                                    View
                                                </ListItemButton>
                                            );
                                        }}
                                    </PopoverButton>
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
            <ViewKycModal
                kycId={selectedId}
                onClose={() => setSelectedId(null)}
                data={kycDetailData?.data}
                loading={kycDetailLoading}
                relatedTo="market-maker"
            />
        </>
    );
}

Users.propTypes = {
    relatedTo: PropTypes.oneOf([relatedTo.AGENT, relatedTo.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
};
