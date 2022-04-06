import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import React from "react";

import Card from "./Card";
import TotalCard from "./TotalCard";

const Wapper = styled(Grid)(({ theme }) => ({
    display: "flex",
}));

function Numbers() {
    const theme = useTheme();

    return (
        <Wapper container spacing={2}>
            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", flexGrow: 1 }}
            >
                <TotalCard name="Total" total={100} />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", flexGrow: 1 }}
            >
                <Card
                    name="Admin"
                    total={100}
                    number={20}
                    color="primary"
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", flexGrow: 1 }}
            >
                <Card
                    name="Partner"
                    total={100}
                    number={37}
                    color="secondary"
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", flexGrow: 1 }}
            >
                <Card
                    name="User"
                    total={100}
                    number={43}
                    color="success"
                />
            </Grid>
        </Wapper>
    );
}

export default Numbers;
