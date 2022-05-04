import React from "react";
import Grid from "@mui/material/Grid";
import { Skeleton } from "@mui/material";

function PartnerSkeleton() {
    return (
        <Grid
            container
            rowSpacing={1}
            sx={{
                padding: "8px 20px",
                margin: 0,
                backgroundColor: "background.main",
            }}
        >
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
