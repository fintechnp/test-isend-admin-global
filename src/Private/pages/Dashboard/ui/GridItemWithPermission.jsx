import { Grid } from "@mui/material";
import HasPermission from "Private/components/shared/HasPermission";
import React from "react";

const GridItemWithPermission = ({ permission, gridSize, children }) => {
    const effectiveGridSize = gridSize || 12;

    return (
        <HasPermission permission={permission}>
            <Grid item xs={12} md={effectiveGridSize}>
                {children}
            </Grid>
        </HasPermission>
    );
};

export default GridItemWithPermission;
