import * as yup from "yup";
import * as React from "react";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import CommentFrom from "./Form";

import actions from "../store/actions";
import Row from "App/components/Row/Row";
import { yupResolver } from "@hookform/resolvers/yup";

import { format } from "date-fns";
import { TablePagination } from "App/components/Table";


const commentFormSchema = yup.object().shape({
    commentText: yup.string().required("Required"),
});

function AddComment({ referenceId, referenceType, data, handleClose }) {
    const [filterSchema, setFilterSchema] = React.useState({
        reference_type: "Transaction",
        reference_id: referenceId,
        page_number: 1,
        page_size: 10,
    });

    const methods = useForm({
        resolver: yupResolver(commentFormSchema),
        defaultValues: {
            referenceId,
            referenceType,
        },
    });

    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.get_all_comments);

    const { success, loading: uploading } = useSelector((state) => state.add_comment);

    React.useEffect(() => {
        dispatch(actions.get_all_comments(filterSchema));
    }, [dispatch, filterSchema]);

    React.useEffect(() => {
        if (success) {
            dispatch(actions.get_all_comments(filterSchema));
            methods.reset();
        }
    }, [success]);

    const handleTypeSubmit = (data) => {
        dispatch(actions.add_comment(data));
    };

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
                    Comments
                </Typography>
                <IconButton color="error" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Row>
            <CommentFrom onSubmit={handleTypeSubmit} method={methods} handleClose={handleClose} loading={uploading} />
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                }}
            >
                {response?.data?.map((comment, index) => (
                    <Box key={index} sx={{ my: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
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
                                {comment?.userName
                                    ?.split(" ")
                                    .map((name) => name[0])
                                    .join("")
                                    .toUpperCase()}
                            </Box>
                            <Typography fontSize={18}>{comment?.userName}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {comment?.comment}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {format(new Date(comment?.commentedDate), "MMMM d, yyyy 'at' hh:mm a")}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            <TablePagination
                paginationData={response?.pagination}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default AddComment;
