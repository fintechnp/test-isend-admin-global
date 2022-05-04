import React from "react";
import Grid from "@mui/material/Grid";
import { Skeleton } from "@mui/material";

function PartnerSkeleton() {
    return (
        <Grid
            container
            rowSpacing={1}
            sx={{
                padding: "8px",
                margin: 0,
                backgroundColor: "background.main",
            }}
        >
            {Array.from(Array(11).keys()).map((row, index) => {
                return (
                    <Grid item xs={12} md={6} sx={{ padding: "4px 8px" }}>
                        <Skeleton />
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default React.memo(PartnerSkeleton);
