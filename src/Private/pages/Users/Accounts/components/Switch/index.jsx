import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";

import actions from "./../../store/actions";

function ControlledSwitch({ value, data }) {
    const dispatch = useDispatch();
    const memoizedValue = React.useMemo(() => value, [value]);
    const memoizedData = React.useMemo(() => data, [data]);
    const [checked, setChecked] = React.useState(memoizedValue);

    const { response: user_status, success: success } = useSelector(
        (state) => state.update_user_status
    );
    console.log(user_status);

    React.useEffect(() => {
        if (success) {
            setChecked(user_status?.data?.is_active);
        }
        dispatch({ type: "UPDATE_ACCOUNT_STATUS_RESET" });
    }, [success]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        dispatch(
            actions.update_user_status(
                { is_active: event.target.checked },
                memoizedData?.id
            )
        );
    };

    return <Switch size="small" checked={checked} onChange={handleChange} />;
}

export default React.memo(ControlledSwitch);
