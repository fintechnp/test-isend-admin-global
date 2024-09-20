import React from "react";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";

import dateUtils from "App/utils/dateUtils";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";

const ViewDeliveryRoutesModal = ({ open }) => {
    const dispatch = useDispatch();
    const { response, loading } = useSelector((state) => state.get_delivery_route_by_id);

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                { label: "Id", accessorKey: "delivery_route_id" },
                {
                    label: "Sending Agent",
                    accessorKey: "sending_agent",
                    cell: (data) => (
                        <Typography textTransform="uppercase">
                            {data.sending_agent ? data.sending_agent : "-"}
                        </Typography>
                    ),
                },
                { label: "Payout Agent", accessorKey: "payout_agent" },
                {
                    label: "Payout Country",
                    accessorKey: "payout_country",
                    cell: (data) => <>{data.payout_country ? CountryName(data.payout_country) : "-"}</>,
                },
                {
                    label: "Payout Currency",
                    accessorKey: "payout_currency",
                    cell: (data) => <>{data.payout_currency ? CurrencyName(data.payout_currency) : "-"} </>,
                },
                {
                    label: "Payment Type",
                    accessorKey: "payment_type",
                    cell: (data) => <>{data.payment_type ? ReferenceName(1, data.payment_type) : "-"}</>,
                },
                {
                    label: "status",
                    accessorKey: "is_active",
                    cell: (data) => (
                        <>
                            {data.is_active ? (
                                <CheckCircleIcon color="success" fontSize="small" />
                            ) : (
                                <CancelIcon color="error" fontSize="small" />
                            )}
                        </>
                    ),
                },
                {
                    label: "Created Date",
                    accessorKey: "created_ts",
                    cell: (data) => <>{data.created_ts ? dateUtils.getLocalDateFromUTC(data.created_ts) : "-"}</>,
                },
            ],
        },
    ]);
    const handleClose = () => {
        dispatch({ type: "CLOSE_DELIVERY_ROUTE_BY_ID_MODAL" });
    };

    return (
        <Modal open={open} onClose={handleClose} title="Delivery Route Details">
            <SourceDetails data={response?.data || []} definition={definition} isLoading={loading} />
        </Modal>
    );
};

export default ViewDeliveryRoutesModal;
