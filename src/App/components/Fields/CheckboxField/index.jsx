import React from "react";
import { Grid, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";

const Wrapper = styled(Grid)(({ theme }) => ({
    "& .MuiTypography-root": {
        paddingLeft: "7px",
    },
    "& .MuiButtonBase-root.MuiCheckbox-root": {
        padding: "0px 9px",
    },
}));

export default function CheckboxField({ label, reverse, half, input, ...rest }) {
    return (
        <Wrapper container>
            <Grid item xs={12} md={half ? 6 : 12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            {...input}
                            {...rest}
                            label={label}
                            disableRipple
                            checked={input.value ? true : false}
                            onChange={input.onChange}
                        />
                    }
                    label={label}
                />
            </Grid>
        </Wrapper>
    );
}
