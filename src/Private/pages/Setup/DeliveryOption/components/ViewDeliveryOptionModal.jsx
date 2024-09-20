import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";

import dateUtils from "App/utils/dateUtils";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";

const ViewDeliveryOptionModal = ({ open }) => {
    const dispatch = useDispatch();
    const { response, loading } = useSelector((state) => state.get_delivery_option_details);

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                { label: "Id", accessorKey: "delivery_option_id" },
                { label: "Name", accessorKey: "delivery_name" },
                { label: "Payout Agent", accessorKey: "payout_agent" },
                {
                    label: "Country",
                    accessorKey: "country_code",
                    cell: (data) => <>{data.country_code ? CountryName(data.country_code) : "-"}</>,
                },
                {
                    label: "Currency",
                    accessorKey: "currency_code",
                    cell: (data) => <>{data.currency_code ? CurrencyName(data.currency_code) : "-"} </>,
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
        dispatch({ type: "CLOSE_DELIVERY_OPTION_DETAILS_MODAL" });
    };

    return (
        <Modal open={open} onClose={handleClose} title="Delivery Option Details">
            <SourceDetails data={response?.data || []} definition={definition} isLoading={loading} />
        </Modal>
    );
};

export default ViewDeliveryOptionModal;
