import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { businessActions as actions } from "Private/pages/Business/store";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import { Box, Grid, IconButton } from "@mui/material";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Loading } from "App/components";
import NoResults from "Private/pages/Transactions/components/NoResults";
import Spacer from "App/components/Spacer/Spacer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import Modal from "App/components/Modal/Modal";
import BusinessKybDetail from "../Business/BusinessKybDetail";
import PageContent from "App/components/Container/PageContent";
import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import buildRoute from "App/helpers/buildRoute";

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
                header: "Business Type",
                accessorKey: "businessType",
            },
            {
                header: "Registered Date",
                accessorKey: "registeredDate",
            },
            {
                header: "Related To",
                accessorKey: "relatedTo",
            },
            {
                header: "Remarks",
                accessorKey: "remarks",
            },
            {
                header: "Status",
                accessorKey: "status",
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
            {loading && (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            )}
            {!loading && response?.data && response?.data?.length === 0 ? (
                <Grid item xs={12}>
                    <NoResults text="No KYB Found" />
                </Grid>
            ) : (
                <>
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
                        <BusinessKybDetail
                            relatedTo="market-maker"
                            data={kybDetailData?.data}
                            loading={kybDetailLoading}
                        />
                    </Modal>
                </>
            )}
        </>
    );
}
