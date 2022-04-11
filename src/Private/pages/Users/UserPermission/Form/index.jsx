import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckForm = ({ name }) => {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="All"
            />
            <FormControlLabel control={<Checkbox />} label="Read" />
            <FormControlLabel control={<Checkbox />} label="Create" />
            <FormControlLabel control={<Checkbox />} label="Update" />
            <FormControlLabel control={<Checkbox />} label="Delete" />
        </FormGroup>
    );
};

export default CheckForm;
