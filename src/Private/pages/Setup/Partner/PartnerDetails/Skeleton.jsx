import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Skeleton, Typography } from "@mui/material";

function PartnerSkeleton() {
    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12}>
                <Skeleton />
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    columnSpacing={2}
                    rowSpacing={1}
                    sx={{ paddingBottom: "8px" }}
                >
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Skeleton />
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    columnSpacing={2}
                    rowSpacing={1}
                    sx={{ paddingBottom: "8px" }}
                >
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Skeleton />
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    columnSpacing={2}
                    rowSpacing={1}
                    sx={{ paddingBottom: "8px" }}
                >
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(PartnerSkeleton);
