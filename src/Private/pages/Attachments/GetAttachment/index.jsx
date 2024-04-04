import * as React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import { TablePagination } from "App/components/Table";
import AddAttachmentForm from "../AddAttachments/AddAttachmentForm";

import actions from "../store/actions";
import Row from "App/components/Row/Row";
import { format } from "date-fns";

function GetAttachment({ attachmentType, attachmentId, onClose }) {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = React.useState({
        attachmentType: "Transaction",
        attachmentId: attachmentId,
        page_number: 1,
        page_size: 10,
    });
    const { response, loading } = useSelector((state) => state.get_all_attachments);
    const { success } = useSelector((state) => state.upload_attachment);

    React.useEffect(() => {
        dispatch(actions.get_all_attachments(filterSchema));
    }, [dispatch, filterSchema]);

    React.useEffect(() => {
        if (success) {
            dispatch(actions.get_all_attachments(filterSchema));
        }
    }, [success]);

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Row justifyContent="space-between">
                <Typography marginY="1rem" variant="h6">
                    Attachments
                </Typography>
                <IconButton color="error" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Row>
            <AddAttachmentForm attachmentObjectId={attachmentId} attachmentObjectType="Transaction" onClose={onClose} />
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                }}
            >
                {response?.data?.map((attachments, index) => (
                    <Box key={index} sx={{ my: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                        <Box display="flex" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={1}>
                                <Box
                                    sx={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        backgroundColor: "#f3f3f3",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "20px",
                                        color: "#333",
                                    }}
                                >
                                    {attachments?.userName
                                        ?.split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                        .toUpperCase()}
                                </Box>
                                <Typography fontSize={18}>{attachments?.userName}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {format(new Date(attachments?.uploadedDate), "MMMM d, yyyy hh:mm:ss a")}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {attachments?.attachmnetName}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {
                                    <a
                                        href={attachments?.attachment}
                                        target="_blank"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        <img
                                            src={attachments?.attachment}
                                            alt={attachments?.attachmnetName}
                                            style={{
                                                width: "100%",
                                                height: "70px",
                                                objectFit: "cover",
                                            }}
                                        ></img>
                                    </a>
                                }
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            {loading && (
                <Typography align="center" fontSize={20}>
                    Loading...
                </Typography>
            )}
            <TablePagination
                paginationData={response?.pagination}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default React.memo(GetAttachment);
