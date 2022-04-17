import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Check from "./Check";

const CheckForm = ({ sub_data, length }) => {
    const [checked, setChecked] = React.useState(false);
    const [click, setClick] = React.useState(false);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const all = sub_data.every((value) => value.is_active === true);
        const Active = sub_data.filter((value) => value.is_active === true);
        setCount(Active.length);
        setChecked(all);
    }, []);

    React.useEffect(() => {
        if (count === length) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [count]);

    const handleChange = (event) => {
        setClick(true);
        setChecked(event.target.checked);
        if (event.target.checked) {
            setCount(length);
        } else {
            setCount(0);
        }
    };

    const handleAll = (update) => {
        if (update) {
            setCount(count + 1);
        } else {
            setCount(count - 1);
        }
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} />}
                label="All"
            />
            {sub_data &&
                sub_data.map((menu, index) => (
                    <Check
                        key={index}
                        menu={menu}
                        allValue={checked}
                        click={click}
                        setClick={setClick}
                        handleAll={handleAll}
                    />
                ))}
        </FormGroup>
    );
};

export default CheckForm;
