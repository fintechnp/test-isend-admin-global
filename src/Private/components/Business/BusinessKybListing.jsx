import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import Modal from "App/components/Modal/Modal";
import Spacer from "App/components/Spacer/Spacer";
import BusinessKybDetail from "./BusinessKybDetail";
import NoResults from "Private/pages/Transactions/components/NoResults";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { businessActions as actions } from "Private/pages/Business/store";

export default function BusinessKybListing() {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const [open, setOpen] = useState(false);

    const { response, loading } = useSelector((state) => state.get_business_kyb);

    const { response: kybDetailData, loading: kybDetailLoading } = useSelector(
        (state) => state.get_business_kyb_details,
    );

    const { success } = useSelector((state) => state.update_business_kyb_status);

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (success) {
            setOpen(false);
        }
    }, [success]);

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
                        <BusinessKybDetail relatedTo="business" data={kybDetailData?.data} loading={kybDetailLoading} />
                    </Modal>
                </>
            )}
        </>
    );
}
