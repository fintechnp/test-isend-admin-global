import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Divider } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const SkeletonWrapper = styled(Grid)(({ theme }) => ({
    margin: 0,
    width: "100%",
    border: "none",
    boxShadow: "none",
    backgroundColor: "#fff",
    paddingTop: theme.spacing(1),
}));

const SkeletonCard = () => {
    return (
        <SkeletonWrapper container spacing={1} direction="column">
            <Grid item xs>
                <Skeleton width="100%" />
            </Grid>
            <Grid item xs>
                <Divider light />
            </Grid>
            <Grid item xs>
                <Grid container spacing={2}>
                    <Grid item>
                        <Skeleton width="24px" />
                    </Grid>
                    <Grid item xs>
                        <Skeleton width="100%" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs>
                <Grid container spacing={2}>
                    <Grid item>
                        <Skeleton width="24px" />
                    </Grid>
                    <Grid item xs>
                        <Skeleton width="100%" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs>
                <Grid container spacing={2}>
                    <Grid item>
                        <Skeleton width="24px" />
                    </Grid>
                    <Grid item xs>
                        <Skeleton width="100%" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs>
                <Grid container spacing={2}>
                    <Grid item>
                        <Skeleton width="24px" />
                    </Grid>
                    <Grid item xs>
                        <Skeleton width="100%" />
                    </Grid>
                </Grid>
            </Grid>
        </SkeletonWrapper>
    );
};

export default SkeletonCard;
