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
        <div>
            <Row justifyContent="space-between">
                <Typography marginY="1rem" variant="h6">
                    Comments
                </Typography>
                <IconButton color="error" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Row>
            <AddAttachmentForm attachmentObjectId={attachmentId} attachmentObjectType="Transaction" onClose={onClose} />

            {response?.data?.map((attachments, index) => (
                <Box key={index} sx={{ my: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    <Typography variant="h6">
                        {attachments?.userName}
                    </Typography>
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
                                            height: "50px",
                                            objectFit: "cover",
                                        }}
                                    ></img>
                                </a>
                            }
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {new Date(attachments?.uploadedDate).toLocaleDateString()}
                    </Typography>
                </Box>
            ))}
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
