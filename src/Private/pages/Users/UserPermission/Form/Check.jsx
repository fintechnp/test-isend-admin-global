import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import actions from "./../store/actions";

function Check({ menu, allValue, click, setClick, handleAll }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        if (click) {
            if (allValue && !checked) {
                setChecked(allValue);
                dispatch(
                    actions.update_user_permission(id, {
                        menu_id: menu?.menu_id,
                        is_active: allValue,
                    })
                );
            } else if (!allValue && checked) {
                setChecked(allValue);
                dispatch(
                    actions.update_user_permission(id, {
                        menu_id: menu?.menu_id,
                        is_active: allValue,
                    })
                );
            }
        }
    }, [allValue, click]);

    React.useEffect(() => {
        setChecked(menu.is_active);
    }, []);

    const handleChange = (event) => {
        handleAll(event.target.checked);
        dispatch(
            actions.update_user_permission(id, {
                menu_id: menu?.menu_id,
                is_active: event.target.checked,
            })
        );
        setClick(false);
        setChecked(event.target.checked);
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={menu?.sub_title}
        />
    );
}

export default React.memo(Check);
