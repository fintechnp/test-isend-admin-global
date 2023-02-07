import * as React from "react";
import Switch from "@mui/material/Switch";

function ControlledSwitch({ size, defaultChecked, checked, handleCheck }) {
  return (
    <Switch
      size={size}
      defaultChecked={defaultChecked}
      checked={checked}
      onChange={(e) => handleCheck(e.target.checked)}
    />
  );
}

function TableSwitch({ value, data, dataId, handleStatus }) {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleCheck = React.useCallback(
    (status) => {
      setChecked(status);
      handleStatus(
        status,
        dataId ?? data?.tid,
        data?.parent_id,
        data?.promo_id
      );
    },
    [value]
  );

  return (
    <ControlledSwitch
      size="small"
      defaultValue={value}
      checked={checked}
      handleCheck={handleCheck}
    />
  );
}

export default TableSwitch;
