import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

function PartnerSkeleton() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <Typography>Basic</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <Typography>Basic</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <Typography>Basic</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(PartnerSkeleton);
