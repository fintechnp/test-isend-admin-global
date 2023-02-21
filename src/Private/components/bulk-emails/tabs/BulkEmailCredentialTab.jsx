import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import BulkEmailCredentialForm from "../credentials/BulkEmailCredentialForm";
import BulkEmailCredentialFormSkeleton from "../credentials/BulkEmailCredentialFormSkeleton";

export default function BulkEmailCredentialTab() {
    const dispatch = useDispatch();

    const { loading: isLoading, response } = useSelector((state) => state.get_bulk_email_credential);

    const { loading: isUpdating } = useSelector((state) => state.update_bulk_email_credential);

    const handleSubmit = (data) => {
        dispatch({
            type: "UPDATE_BULK_EMAIL_CREDENTIAL",
            data,
            bulk_email_credential_id: response?.data?.cred_id,
        });
    };

    useEffect(() => {
        dispatch({
            type: "GET_BULK_EMAIL_CREDENTIAL",
        });
    }, []);

    if (isLoading) return <BulkEmailCredentialFormSkeleton />;

    if (!isLoading && !response?.data)
        return (
            <Box sx={{ minHeight: "400px" }} display="flex" alignItems="center" justifyContent="center">
                <Typography>No credentials found</Typography>
            </Box>
        );

    return (
        <div>
            <BulkEmailCredentialForm
                onSubmit={handleSubmit}
                initialState={{
                    host: response?.data?.host ?? "",
                    port: response?.data?.port ?? "",
                    enable_ssl: response?.data?.enable_ssl ?? true,
                    credential_email: response?.data?.credential_email ?? "",
                    pwd: response?.data?.pwd ?? "",
                    sender_name: response?.data?.sender_name ?? "",
                }}
                isProcessing={isUpdating}
            />
        </div>
    );
}
