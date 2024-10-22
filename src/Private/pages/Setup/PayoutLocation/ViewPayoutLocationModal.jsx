import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";

import useSourceDetail from "App/core/source-detail/useSourceDetail";
import { CountryName, CurrencyName, FormatDate, ReferenceName } from "App/helpers";
import dateUtils from "App/utils/dateUtils";

const ViewPayoutLocationModal = ({ open }) => {
    const dispatch = useDispatch();
    const { response, loading } = useSelector((state) => state.get_payout_location_details);

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                { label: "Id", accessorKey: "tid" },
                {
                    label: "Location Name",
                    accessorKey: "location_name",
                },
                {
                    label: "Location Code",
                    accessorKey: "location_code",
                    cell: (data) => <>{data.location_code ? data.location_code : "-"}</>,
                },
                {
                    label: "Country",
                    accessorKey: "country",
                    cell: (data) => <>{data.country ? CountryName(data.country) : "-"}</>,
                },
                {
                    label: "Currency",
                    accessorKey: "currency",
                    cell: (data) => <>{data.currency ? CurrencyName(data.currency) : "-"} </>,
                },
                {
                    label: "Payment Type",
                    accessorKey: "payment_type",
                    cell: (data) => <>{data.payment_type ? ReferenceName(1, data.payment_type) : "-"}</>,
                },

                {
                    label: "Status",
                    accessorKey: "is_active",
                    cell: (data) => (
                        <>
                            {" "}
                            {data?.is_active ? (
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
                    cell: (data) => (
                        <>{data.created_ts ? dateUtils.getFormattedDate(data.created_ts, "MMM DD, YYYY") : "-"}</>
                    ),
                },
            ],
        },
    ]);
    const handleClose = () => {
        dispatch({ type: "CLOSE_GET_PAYOUT_LOCATION_DETAILS_MODAL" });
    };

    return (
        <Modal open={open} onClose={handleClose} title="Payout Location Details">
            <SourceDetails data={response?.data || []} definition={definition} isLoading={loading} />
        </Modal>
    );
};

export default ViewPayoutLocationModal;
