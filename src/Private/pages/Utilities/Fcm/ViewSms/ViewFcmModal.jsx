import { useCallback } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import dateUtils from "App/utils/dateUtils";
import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";

import actions from "../../store/actions";

export default function ViewFcmModal() {
    const dispatch = useDispatch();

    const defination = useSourceDetail([
        {
            title: "Fcm Details",
            items: [
                {
                    label: "Title",
                    accessorKey: "title",
                },
                {
                    label: "FCM ID",
                    accessorKey: "fcm_id",
                },
                {
                    label: "Customer ID",
                    accessorKey: "customer_id",
                },
                {
                    label: "Message",
                    accessorKey: "body",
                },

                {
                    label: "Is Active ?",
                    accessorKey: "is_active",
                    cell: (data) => (
                        <>
                            <Typography fontWeight={600}>{data?.is_active ? "True" : "False"}</Typography>
                        </>
                    ),
                },

                {
                    label: "Type",
                    contactNo: "inbox",
                },
                {
                    label: "Created At",
                    cell: (data) => (
                        <Typography fontWeight={600}>{dateUtils.getLocalDateTimeFromUTC(data?.created_ts)}</Typography>
                    ),
                },
                {
                    label: "Website",
                    accessorKey: "website",
                },
            ],
        },
    ]);

    const { is_open: isOpen, data } = useSelector((state) => state.view_fcm);

    const handleClose = useCallback(() => {
        dispatch(actions.close_view_fcm_modal());
    }, [dispatch]);

    return (
        <Modal
            sx={{
                minWidth: "700px",
                maxWidth: "900px",
            }}
            open={isOpen}
            onClose={handleClose}
            title="View Fcm Details"
        >
            <SourceDetails viewMode="column" rowMode="row" definition={defination} data={data} />
        </Modal>
    );
}
