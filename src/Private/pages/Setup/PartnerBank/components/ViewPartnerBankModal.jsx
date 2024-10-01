import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";

import dateUtils from "App/utils/dateUtils";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import { CountryName, CurrencyName, FormatDate, ReferenceName } from "App/helpers";

const ViewPartnerBankModal = ({ open }) => {
    const dispatch = useDispatch();
    const { response, loading } = useSelector((state) => state.get_partner_bank_by_id);

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                { label: "Id", accessorKey: "partner_bank_id" },
                {
                    label: "Payout Agent",
                    accessorKey: "agent_id",
                },
                {
                    label: "Country",
                    accessorKey: "country",
                    cell: (data) => (
                        <Typography fontWeight={600}>{data.country ? CountryName(data.country) : "-"}</Typography>
                    ),
                },
                {
                    label: "Currency",
                    accessorKey: "currency",
                    cell: (data) => (
                        <Typography fontWeight={600}>{data.currency ? CurrencyName(data.currency) : "-"} </Typography>
                    ),
                },
                {
                    label: "Payment Type",
                    accessorKey: "payment_type",
                    cell: (data) => (
                        <Typography fontWeight={600}>
                            {data.payment_type ? ReferenceName(1, data.payment_type) : "-"}
                        </Typography>
                    ),
                },
                { label: "External Bank Code", accessorKey: "external_bank_code" },
                { label: "External Bank Code1", accessorKey: "external_bank_code1" },
                { label: "External Bank Code2", accessorKey: "external_bank_code2" },
                {
                    label: "Mapping Status",
                    accessorKey: "is_mapped",
                    cell: (data) => (
                        <>
                            {data.is_mapped ? (
                                <Chip
                                    sx={{
                                        background: (theme) => theme.palette.surface.successSecond,
                                        color: (theme) => theme.palette.success.main,
                                    }}
                                    label="Mapped"
                                />
                            ) : (
                                <Chip
                                    sx={{
                                        background: (theme) => theme.palette.surface.dangerSecond,
                                        color: (theme) => theme.palette.error.main,
                                    }}
                                    label="Not Mapped"
                                />
                            )}
                        </>
                    ),
                },
                {
                    label: "Created At/By",
                    accessorKey: "created_ts",
                    cell: (data) => (
                        <Typography fontWeight={600}>
                            {data.created_ts ? dateUtils.getLocalDateFromUTC(data.created_ts) : "-"},{" "}
                            {data?.created_by ? data?.created_by : "-"}
                        </Typography>
                    ),
                },
                {
                    label: "Updated At/By",
                    accessorKey: "updated_ts",
                    cell: (data) => (
                        <Typography fontWeight={600}>
                            {data.updated_ts ? dateUtils.getLocalDateFromUTC(data.updated_ts) : "-"},{" "}
                            {data?.updated_by ? data?.updated_by : "-"}
                        </Typography>
                    ),
                },
            ],
        },
    ]);
    const handleClose = () => {
        dispatch({ type: "CLOSE_GET_PARTNER_BANK_BYID_MODAL" });
    };

    return (
        <Modal open={open} onClose={handleClose} title="Partner Bank Details">
            <Box sx={{ border: "1px solid #EAEBF0", borderRadius: "8px", padding: "16px" }}>
                <SourceDetails data={response?.data || []} definition={definition} isLoading={loading} rowMode="row" />
            </Box>
        </Modal>
    );
};

export default ViewPartnerBankModal;
