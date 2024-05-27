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
import BusinessKybDetail from "../Business/BusinessKybDetail";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { businessActions as actions } from "Private/pages/Agent/Business/store";

export default function MarketMakerKybListing() {
    const dispatch = useDispatch();
    const { marketMakerId } = useParams();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { response, loading } = useSelector((state) => state.get_business_kyb);

    const { response: kybDetailData, loading: kybDetailLoading } = useSelector(
        (state) => state.get_business_kyb_details,
    );

    const handleClose = () => {
        setOpen(false);
    };

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Registration No",
                accessorKey: "registrationNo",
            },
            {
                header: "Country of Registration",
                accessorKey: "registeredCountry.country",
            },
            {
                header: "Registered Date",
                accessorKey: "registeredDate",
            },
            {
                header: "Actions",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                setOpen(true);
                                dispatch(actions.get_business_kyb_details(row?.original?.kybId));
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
                                navigate(`/agent/market-maker/${marketMakerId}/update-kyb/${row?.original?.kybId}`);
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
                ),
            },
        ],
        [],
    );

    useEffect(() => {
        dispatch(
            actions.get_business_kyb({
                marketMakerId,
            }),
        );
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                }}
            >
                <Button
                    onClick={() => {
                        navigate(buildRoute(routePaths.agent.addMarketMakerKyb, marketMakerId));
                    }}
                >
                    Add KYB
                </Button>
            </Box>
            <Spacer />
            <TanstackReactTable columns={columns} title="KYB" data={response?.data ?? []} loading={loading} />
            <Modal
                title="Kyb Detail"
                open={open}
                onClose={handleClose}
                sx={{
                    width: "60%",
                }}
            >
                <BusinessKybDetail relatedTo="market-maker" data={kybDetailData?.data} loading={kybDetailLoading} />
            </Modal>
        </>
    );
}
