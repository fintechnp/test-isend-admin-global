import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

import Row from "App/components/Row/Row";
import Center from "App/components/Center/Center";
import Column from "App/components/Column/Column";

export default function ProfileSetupFormSkeleton() {
    return (
        <Box>
            <Row px={2} display="flex" justifyContent="space-between">
                <Center>
                    <Skeleton height="16px" width="100px" />
                </Center>
                <Row flex={0} gap={1}>
                    <Skeleton height="45px" width="90px" />
                    <Skeleton height="45px" width="90px" />
                </Row>
            </Row>
            <Divider sx={{ mt: 1 }} />
            <Row>
                <Column flex={1} p={2}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Skeleton height="62px" />
                        </Grid>
                        <Grid item xs={12}>
                            <Skeleton height="200px" sx={{ mt: "-36px" }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Skeleton height="62px" sx={{ mt: "-36px" }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Skeleton height="100px" sx={{ mt: "-16px" }} />
                        </Grid>
                    </Grid>
                </Column>
                <Divider orientation="vertical" flexItem />
                <Column flex={1}>
                    <Row px={2} py={1.5} justifyContent="space-between">
                        <Center>
                            <Skeleton height="16px" width="100px" />
                        </Center>
                        <Center>
                            <Skeleton height="16px" width="16px" sx={{ mr: 1 }} />
                            <Skeleton height="16px" width="40px" />
                        </Center>{" "}
                    </Row>
                    <Column px={2} gap={0}>
                        <Skeleton height="62px" sx={{ mt: "-1rem" }} />
                        <Skeleton height="400px" sx={{ mt: "-7rem" }} />
                    </Column>
                </Column>
                <Divider orientation="vertical" flexItem />
                <Column flex={1} pb={2}>
                    <Row px={2} py={1.5} justifyContent="space-between">
                        <Center>
                            <Skeleton height="16px" width="16px" />
                        </Center>
                        <Center>
                            <Skeleton height="16px" width="16px" sx={{ mr: 1 }} />
                            <Skeleton height="16px" width="40px" />
                        </Center>
                    </Row>
                    <Column px={2}>
                        <Skeleton height="62px" sx={{ mt: "-1rem" }} />
                        <Skeleton height="400px" sx={{ mt: "-7rem" }} />
                    </Column>
                </Column>
            </Row>
            <Row px={2} pb={4} justifyContent="flex-end" gap={2}>
                <Skeleton height="45px" width="90px" />
                <Skeleton height="45px" width="90px" />
            </Row>
        </Box>
    );
}
