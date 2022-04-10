import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Form, FieldArray, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import PolicyIcon from "@mui/icons-material/Policy";
import Skeleton from "@mui/material/Skeleton";
import AddIcon from "@mui/icons-material/Add";

import actions from "../store/actions";
import userActions from "../../Accounts/store/actions";
import Card from "./../Card";
import PermissionSkeleton from "../Skeleton";

const PermissionContainer = styled(Grid)(({ theme }) => ({}));

const TitleWrapper = styled(Grid)(({ theme }) => ({
    margin: "0px",
    width: "100%",
    marginBottom: "8px",
    backgroundColor: "#fff",
    borderBottom: `1px solid ${theme.palette.border.light}`,
}));

const Title = styled(Typography)(({ theme }) => ({
    color: "#090269",
    fontSize: "19px",
    paddingLeft: "8px",
}));

const BottomWrapper = styled(Box)(({ theme }) => ({
    margin: 0,
    width: "100%",
    padding: "12px 0px",
    marginLeft: "8px",
    marginTop: "16px",
    borderTop: `1px solid ${theme.palette.border.light}`,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
}));

const CancelButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    backgroundColor: "#d60f0f",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    "&:hover": {
        backgroundColor: "#d60f0f",
    },
}));

const SaveButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    backgroundColor: "#06205c",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    "&:hover": {
        backgroundColor: "#06205c",
    },
}));

const PermissionForm = ({ handleSubmit }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const permission_data = useSelector(
        (state) => state.get_all_permission?.response
    );
    const permission_loading = useSelector(
        (state) => state.get_all_permission?.loading
    );
    const { response: user_details, loading: user_loading } = useSelector(
        (state) => state.get_user_details_id
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_all_permission(id));
            dispatch(userActions.get_user_details_by_id(id));
        }
    }, [id]);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <PermissionContainer container>
                    <Grid item xs={12}>
                        <TitleWrapper container alignItems="center">
                            {!user_loading && (
                                <Grid item>
                                    <PolicyIcon
                                        fontSize="large"
                                        color="primary"
                                    />
                                </Grid>
                            )}
                            <Grid item xs>
                                {user_loading ? (
                                    <Skeleton
                                        width="100%"
                                        height="40px"
                                        sx={{ marginBottom: "8px" }}
                                    />
                                ) : (
                                    <Title>
                                        Change Permission & Policy For{" "}
                                        <strong>
                                            {user_details?.data?.first_name}{" "}
                                            {user_details?.data?.last_name}
                                        </strong>
                                    </Title>
                                )}
                            </Grid>
                        </TitleWrapper>
                    </Grid>
                    {!permission_loading && (
                        <Grid item sx={{ margin: 0 }}>
                            <FieldArray name={`menu`} component={Card} />
                        </Grid>
                    )}
                    {permission_loading && (
                        <Grid item xs>
                            <PermissionSkeleton />
                        </Grid>
                    )}
                    {!permission_loading &&
                        permission_data?.data &&
                        permission_data?.data?.length && (
                            <Grid item xs={12}>
                                <BottomWrapper columnGap={2}>
                                    <Box>
                                        <CancelButton
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Cancel
                                        </CancelButton>
                                    </Box>
                                    <Box>
                                        <SaveButton
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            endIcon={<AddIcon />}
                                            type="submit"
                                        >
                                            Save
                                        </SaveButton>
                                    </Box>
                                </BottomWrapper>
                            </Grid>
                        )}
                </PermissionContainer>
            </Form>
        </>
    );
};

export default reduxForm({
    form: "create_permission_form",
    enableReinitialize: true,
})(PermissionForm);
