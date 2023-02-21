import React from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import range from "App/helpers/range";

export default function BulkEmailCredentialFormSkeleton() {
    return (
        <Grid container rowSpacing={2} columnSpacing={2}>
            {range(1, 6).map((k) => (
                <Grid item xs={12} md={6}>
                    <Skeleton
                        sx={{
                            transform: "scale(1)",
                            height: "40px",
                        }}
                    />
                </Grid>
            ))}
            <Grid item xs={12}>
                <ButtonWrapper>
                    <Skeleton
                        sx={{
                            transform: "scale(1)",
                            height: "30px",
                            width: "100px",
                        }}
                    />
                </ButtonWrapper>
            </Grid>
        </Grid>
    );
}
