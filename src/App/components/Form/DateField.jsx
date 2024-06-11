import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField as MuiDateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DateField(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDateField {...props} />
        </LocalizationProvider>
    );
}
