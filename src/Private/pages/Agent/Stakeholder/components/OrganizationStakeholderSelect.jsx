import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import isEmpty from "App/helpers/isEmpty";
import { stakeholderActions } from "../store";
import { inputBorderRadius } from "App/theme/theme";
import { PARENT_ORGANIZATION_ID } from "../data/constants";
import { relatedTo as relatedToConstants } from "Private/data/b2b";

export default function OrganizationStakeholderSelect({
    relatedTo,
    relatedId,
    label,
    onChange,
    name,
    value,
    labelKey = "name",
    valueKey = "kybId",
    ignoreValues = [],
    required,
}) {
    const [selected, setSelected] = useState(null);

    const dispatch = useDispatch();

    const { response, loading: isLoading, success } = useSelector((state) => state.get_organization_stakeholders);

    const data = (response?.data ?? [])
        ?.map((option) => {
            if (option[valueKey] === null) {
                option.kybId = PARENT_ORGANIZATION_ID;
            }
            return option;
        })
        ?.filter((stakeholder) => !ignoreValues.includes(stakeholder[valueKey].toString()));

    const fetch = () => {
        const query = {
            ...(relatedTo === relatedToConstants.AGENT
                ? {
                      marketMakerId: relatedId,
                  }
                : undefined),
            ...(relatedTo === relatedToConstants.BUSINESS
                ? {
                      businessId: relatedId,
                  }
                : undefined),
        };

        dispatch(
            stakeholderActions.get_organization_stakeholders({
                ...query,
                isDropdown: true,
            }),
        );
    };

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        const data = response?.data ?? [];
        if (isEmpty(data) || isEmpty(value)) return;
        const option = data.find((stakeholder) => stakeholder[valueKey] === value);
        setSelected(option ?? null);
    }, [value, response]);

    return (
        <Box display="flex" gap={1}>
            <Autocomplete
                disablePortal
                options={data}
                size="small"
                fullWidth
                name={name}
                value={selected}
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        fullWidth
                        {...params}
                        label={label}
                        required={required}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                getOptionLabel={(option) => option[labelKey] ?? ""}
                disabled={isLoading}
                loading={isLoading}
            />
            <Box
                sx={{
                    ...(isLoading
                        ? {
                              pointerEvents: "none",
                              cursor: "not-allowed",
                          }
                        : undefined),
                }}
            >
                <Tooltip title="Refresh" placement="top" arrow>
                    <IconButton
                        onClick={fetch}
                        size="small"
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                            borderRadius: inputBorderRadius.outer,
                        }}
                    >
                        <RefreshRoundedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

OrganizationStakeholderSelect.propTypes = {
    relatedTo: PropTypes.oneOf([relatedToConstants.AGENT, relatedToConstants.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    ignoreValues: PropTypes.arrayOf(PropTypes.string),
};
