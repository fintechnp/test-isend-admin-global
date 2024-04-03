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
import { Pagination } from "@tanstack/react-table";
import Row from "App/components/Row/Row";
import { yupResolver } from "@hookform/resolvers/yup";

const commentFormSchema = yup.object().shape({
    commentText: yup.string().required("Required"),
});

function AddComment({ referenceId, referenceType, data, handleClose }) {
    const methods = useForm({
        resolver: yupResolver(commentFormSchema),
        defaultValues: {
            referenceId,
            referenceType,
        },
    });

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const [pageNumber, setPageNumber] = React.useState(1);

    const [pageSize, setPageSize] = React.useState(5);

    const { response, loading } = useSelector((state) => state.get_all_comments);

    React.useEffect(() => {
        dispatch(
            actions.get_all_comments({
                reference_type: "Transaction",
                reference_id: referenceId,
                page_number: 1,
                page_size: 10,
            }),
        );
    }, [dispatch, pageNumber, pageSize, referenceId]);

    const handleTypeSubmit = (data) => {
        dispatch(actions.add_comment(data));

        dispatch(
            actions.get_all_comments({
                reference_type: "Transaction",
                reference_id: referenceId,
                page_number: 1,
                page_size: 10,
            }),
        );
    };

    return (
        <div>
            <Row justifyContent="space-between">
                <Typography marginY="1rem" variant="h6">
                    Comments
                </Typography>
                <IconButton color="error" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Row>
            <CommentFrom onSubmit={handleTypeSubmit} method={methods} handleClose={handleClose} />
            {response?.data?.map((comment, index) => (
                <Box key={index} sx={{ my: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {comment?.userName}
                    </Typography>
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
                            {new Date(comment?.commentedDate).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </div>
    );
}

export default AddComment;
