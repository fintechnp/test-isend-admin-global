import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import React, { useState } from "react";

import Card from "./Card";
import TotalCard from "./TotalCard";
import Skeleton from "./Skeleton";

const Wapper = styled(Grid)(({ theme }) => ({
    display: "flex",
}));

function Numbers() {
    const [total, setTotal] = useState(0);
    const { response: number_data, loading } = useSelector(
        (state) => state.get_user_number
    );

    if (loading) {
        return (
            <Wapper container spacing={2}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{ display: "flex", flexGrow: 1 }}
                >
                    <Skeleton />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{ display: "flex", flexGrow: 1 }}
                >
                    <Skeleton />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{ display: "flex", flexGrow: 1 }}
                >
                    <Skeleton />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{ display: "flex", flexGrow: 1 }}
                >
                    <Skeleton />
                </Grid>
            </Wapper>
        );
    }

    return (
        <Wapper container spacing={2}>
            {number_data?.data &&
                number_data?.data.map((each, index) => {
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={index}
                            sx={{ display: "flex", flexGrow: 1 }}
                        >
                            {each.user_type === "TOTAL" ? (
                                <TotalCard
                                    name={each?.user_type}
                                    number={each.count}
                                    setTotal={setTotal}
                                />
                            ) : (
                                <Card
                                    name={each?.user_type}
                                    total={total}
                                    number={each.count}
                                    color="success"
                                />
                            )}
                        </Grid>
                    );
                })}
        </Wapper>
    );
}

export default Numbers;
