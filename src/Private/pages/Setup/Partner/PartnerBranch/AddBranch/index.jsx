import React from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import BranchForm from "./Form";
import actions from "./../../store/actions";

const TitleWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingLeft: "8px",
}));

const Fetching = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.main,
    fontSize: "16px",
    fontWeight: 400,
}));

const BackButton = styled(Button)(({ theme }) => ({
    fontSize: "12px",
    textTransform: "capitalize",
    color: theme.palette.border.main,
    borderColor: theme.palette.border.main,
    "&:hover": {
        color: theme.palette.border.dark,
        borderColor: theme.palette.border.dark,
    },
    "& .MuiButton-startIcon>*:nth-of-type(1)": {
        fontSize: "15px",
    },
}));

function AddBranch() {
    const { agent_id, branch_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { response: BranchData, loading: get_loading } = useSelector(
        (state) => state.get_branch_details
    );

    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_branch
    );
    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_branch
    );

    React.useEffect(() => {
        if (branch_id) {
            dispatch(actions.get_branch_details(branch_id));
        }
    }, [dispatch, branch_id]);

    React.useEffect(() => {
        if (add_success || update_success) {
            handleClose();
        }
    }, [add_success, update_success]);

    const handleClose = () => {
        navigate(-1);
    };

    const handleBranchSubmit = (data) => {
        dispatch(actions.add_branch(agent_id, data));
    };

    const handleBranchUpdate = (data) => {
        console.log(data, "hhdsfhsupdate");
        dispatch(actions.update_branch(branch_id, data));
    };

    if (get_loading) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <PublishedWithChangesIcon
                                sx={{ color: "primary.main", fontSize: "28px" }}
                            />
                            <Title>
                                {branch_id ? "Update" : "Add"} Partner Branch
                            </Title>
                        </Box>
                        <BackButton
                            variant="outlined"
                            size="small"
                            onClick={handleClose}
                        >
                            Back
                        </BackButton>
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ mb: 1.2 }} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Fetching>Fetching...</Fetching>
                    </Box>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <PublishedWithChangesIcon
                            sx={{ color: "primary.main", fontSize: "28px" }}
                        />
                        <Title>
                            {branch_id ? "Update" : "Add"} Partner Branch{" "}
                        </Title>
                    </Box>
                    <BackButton
                        variant="outlined"
                        size="small"
                        onClick={handleClose}
                    >
                        Back
                    </BackButton>
                </TitleWrapper>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{ mb: 1.2 }} />
            </Grid>
            <Grid item xs={12}>
                {branch_id ? (
                    <BranchForm
                        branch_id={branch_id}
                        destroyOnUnmount
                        enableReinitialize={true}
                        initialValues={{
                            name: BranchData?.data?.name,
                            short_code: BranchData?.data?.short_code,
                            external_branch_code:
                                BranchData?.data?.external_branch_code,
                            branch_type: BranchData?.data?.branch_type,
                            phone_number: BranchData?.data?.phone_number,
                            email: BranchData?.data?.email,
                            postcode: BranchData?.data?.postcode,
                            unit: BranchData?.data?.unit,
                            street: BranchData?.data?.street,
                            city: BranchData?.data?.city,
                            state: BranchData?.data?.state,
                            start_time: BranchData?.data?.start_time,
                            end_time: BranchData?.data?.end_time,
                        }}
                        onSubmit={handleBranchUpdate}
                        buttonText="Update"
                        handleClose={handleClose}
                        loading={update_loading}
                        form={`update_agent_branch_form`}
                    />
                ) : (
                    <BranchForm
                        destroyOnUnmount
                        enableReinitialize
                        onSubmit={handleBranchSubmit}
                        buttonText="Add"
                        form={`add_agent_branch_form`}
                        handleClose={handleClose}
                        initialValues={{
                            agent_id: agent_id || 0,
                        }}
                        loading={add_loading}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default React.memo(AddBranch);
