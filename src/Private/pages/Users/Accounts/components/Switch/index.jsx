import * as React from "react";
import Switch from "@mui/material/Switch";

function ControlledSwitch({ size, defaultChecked, checked, handleStatus, data }) {
    return (
        <Switch
            size={size}
            defaultChecked={defaultChecked}
            checked={checked}
            onChange={() => handleStatus(checked, data?.id)}
        />
    );
}

export default ControlledSwitch;
