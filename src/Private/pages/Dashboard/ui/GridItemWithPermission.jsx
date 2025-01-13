import { Grid } from "@mui/material";
import HasPermission from "Private/components/shared/HasPermission";
import React from "react";

const GridItemWithPermission = ({ permission, gridSize, children }) => {
    return (
        <HasPermission permission={permission}>
            <Grid item xs={12} md={gridSize}>
                {children}
            </Grid>
        </HasPermission>
    );
};

export default GridItemWithPermission;
