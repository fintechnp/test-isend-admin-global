import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MuiIconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import actions from "../store/actions";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const TransactionDocuments = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { response: documentData, loading: documentLoading } = useSelector(
        (state) => state.get_transaction_documents,
    );

    const newDocumentData = [documentData?.data];

    useEffect(() => {
        dispatch(
            actions.get_transaction_documents({
                transaction_id: params.id,
            }),
        );
    }, []);

    const columns = [
        {
            header: "SN",
            accessorKey: "",
            maxWidth: 80,
            cell: ({ row }) => <Box>{row.id + 1}</Box>,
        },
        {
            header: "Transaction Id",
            accessorKey: "transaction_id",
        },
        {
            header: "Document Id",
            accessorKey: "id",
        },
        {
            header: "Created By",
            accessorKey: "created_by",
        },
        {
            header: "Updated By",
            accessorKey: "updated_by",
        },
        {
            header: "Action",
            accessorKey: "show",
            cell: ({ row }) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Tooltip title=" View Transaction Documents" arrow>
                            <a href={row?.original?.ref3} target="_blank">
                                <IconButton>
                                    <RemoveRedEyeOutlinedIcon
                                        sx={{
                                            fontSize: "20px",
                                            "&:hover": {
                                                background: "transparent",
                                            },
                                        }}
                                    />
                                </IconButton>
                            </a>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];
    return (
        <PageContent title="Transaction Documents">
            <TanstackReactTable data={newDocumentData ?? []} columns={columns} />
        </PageContent>
    );
};
export default TransactionDocuments;
