import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PolicyIcon from "@mui/icons-material/Policy";
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import actions from "./store/actions";
import userActions from "./../Accounts/store/actions";
import Card from "./Card";
import PermissionSkeleton from "./Skeleton";
import { TablePagination } from "./../../../../App/components/Table";

const PermissionContainer = styled(Grid)(({ theme }) => ({}));

const TitleWrapper = styled(Grid)(({ theme }) => ({
    margin: "0px",
    width: "100%",
    marginBottom: "8px",
    backgroundColor: "#fff",
    borderBottom: `1px solid ${theme.palette.border.light}`,
}));

const PaginationWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    margin: "8px 0px",
    backgroundColor: "#fff",
    borderTop: `1px solid ${theme.palette.border.light}`,
}));

const Title = styled(Typography)(({ theme }) => ({
    color: "#090269",
    fontSize: "19px",
}));

const BackButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    border: `1px solid ${theme.palette.background.dark}`,
    color: theme.palette.border.main,
    borderRadius: "4px",
    textTransform: "capitalize",
    "&:hover": {
        color: theme.palette.border.dark,
        border: `1px solid ${theme.palette.background.main}`,
    },
}));

const UserPermission = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 15,
        search: "",
        sort_by: "name",
        order_by: "ASC",
    });
    const { response: permission_data, loading } = useSelector(
        (state) => state.get_all_permission
    );
    const { response: user_details, loading: user_loading } = useSelector(
        (state) => state.get_user_details_id
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_all_permission(id, filterSchema));
        }
    }, [id, filterSchema]);

    useEffect(() => {
        if (id) {
            dispatch(userActions.get_user_details_by_id(id));
        }
    }, [id]);

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
            page_number: 1,
            page_size: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <>
            <PermissionContainer container>
                <Grid item xs={12}>
                    <TitleWrapper container columnGap={1} alignItems="center">
                        <Grid item>
                            {!user_loading ? (
                                <PolicyIcon fontSize="large" color="primary" />
                            ) : (
                                <Skeleton
                                    width="120px"
                                    height="40px"
                                    sx={{ marginBottom: "8px" }}
                                />
                            )}
                        </Grid>
                        <Grid item xs>
                            {user_loading ? (
                                <Skeleton
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
                        <Grid item>
                            {!user_loading ? (
                                <Box>
                                    <BackButton
                                        size="small"
                                        variant="outlined"
                                        disableElevation
                                        disableRipple
                                        onClick={() => navigate(-1)}
                                        startIcon={<ArrowBackIcon />}
                                    >
                                        Back
                                    </BackButton>
                                </Box>
                            ) : (
                                <Skeleton
                                    width="120px"
                                    height="40px"
                                    sx={{ marginBottom: "8px" }}
                                />
                            )}
                        </Grid>
                    </TitleWrapper>
                </Grid>
                {!loading && (
                    <Grid item xs={12} sx={{ margin: 0 }}>
                        <Grid container>
                            {permission_data?.data &&
                                permission_data?.data.map((data, index) => {
                                    return (
                                        <Grid
                                            item
                                            key={index}
                                            xs={12}
                                            sm={4}
                                            md={3}
                                        >
                                            <Card data={data} />
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </Grid>
                )}
                {loading && (
                    <Grid item xs>
                        <PermissionSkeleton />
                    </Grid>
                )}
                {!loading && (
                    <Grid item xs={12}>
                        <PaginationWrapper>
                            <TablePagination
                                paginationData={permission_data?.pagination}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={
                                    handleChangeRowsPerPage
                                }
                            />
                        </PaginationWrapper>
                    </Grid>
                )}
            </PermissionContainer>
        </>
    );
};

export default UserPermission;
