import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useMemo } from "react";
import Divider from "@mui/material/Divider";

import Spacer from "App/components/Spacer/Spacer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { RenderField, Title, TitleWrapper } from "App/components/Container";
import { relatedToEnum } from "./BusinessChargeForm";

export default function BusinessChargeModal({ data }) {
    const columns = useMemo(
        () => [
            {
                header: "Min txn No",
                accessorKey: "min_no_of_txn",
            },
            {
                header: "Max txn No",
                accessorKey: "max_no_of_txn",
            },
            {
                header: "Flat Amount",
                accessorKey: "flat_amount",
            },
        ],
        [],
    );
    return (
        <Box>
            <TitleWrapper>
                <Title>Details</Title>
                <Divider sx={{ flexGrow: 1, ml: 1 }} />
            </TitleWrapper>
            <Grid container spacing={1} mt={2}>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Sending Country" value={data?.sendingCountry} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RenderField label="Recieving Country" value={data?.receivingCountry} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Type" value={data?.relatedTo} />
                </Grid>
                {(() => {
                    if (relatedToEnum.marketmaker === data?.relatedTo) {
                        return (
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Market Maker" value={data?.relatedTo} />
                            </Grid>
                        );
                    } else if (relatedToEnum.business === data?.relatedTo) {
                        return (
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Business" value={data?.relatedTo} />
                            </Grid>
                        );
                    }
                })()}
                <Grid item xs={12} sm={6}>
                    <RenderField label="Is Active" value={data?.isActive === 1 ? "Active" : "Inactive"} />
                </Grid>
            </Grid>

            <Spacer />

            <TanstackReactTable columns={columns} title="Business Charge" data={data?.serviceChargeDetails ?? []} />
        </Box>
    );
}
