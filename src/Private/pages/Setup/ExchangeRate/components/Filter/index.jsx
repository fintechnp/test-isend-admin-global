import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import MuiFormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";

import React, { useEffect } from "react";
import SearchTextField from "App/components/Fields/SearchTextField";
import Button from "App/components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/actions";
import Row from "App/components/Row/Row";
import { useLocation, useSearchParams } from "react-router-dom";
import dateUtils from "App/utils/dateUtils";
import SubmitButton from "App/components/Button/SubmitButton";
import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";

const FilterWrapper = styled(Box)(({ theme }) => ({
    paddingTop: "8px",
    paddingBottom: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: "8px",
        width: "100%",
    },
}));

const SearchBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexGrow: 1,
    width: "100%",
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
    borderColor: theme.palette.border.light,
    width: "55%",
    "& .MuiOutlinedInput-input.MuiInputBase-input": {
        padding: "8px 0px",
        paddingRight: "8px",
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
        paddingLeft: "10px",
    },
    "&: hover": {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.border.main,
            borderWidth: "2px",
        },
    },
    "& .MuiSvgIcon-root": {
        fill: theme.palette.border.main,
    },
}));

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        maxHeight: "400px",
        maxWidth: "320px",
        background: "red",
    },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
    // minWidth: "max-content",
    "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "8px 10px",
        paddingRight: "28px",
    },
    "& .MuiSvgIcon-root.MuiSelect-icon": {
        color: theme.palette.border.main,
    },
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        maxHeight: "400px !important",
        maxWidth: "320px",
        background: "red",
    },
}));

const DropWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
}));

function Filter({
    state,
    handleSearch,
    handleOrder,
    handleSort,
    sortData,
    orderData,
    onRefreshSuccess,
    lastUpdatedAt,
}) {
    const pathname = useLocation();

    const [params] = useSearchParams();

    const dispatch = useDispatch();

    const { loading: isRefreshing, success: isSuccess } = useSelector((state) => state.refresh_exchange_rate);

    const sendingAgentId = params.get("sending_agent_id");

    const handleOnRefreshExchangeRate = () => {
        dispatch(actions.refresh_exchange_rate({ sendingAgentId }));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.reset_refresh_exchange_rate());
            onRefreshSuccess?.();
        }
    }, [isSuccess]);

    return (
        <FilterWrapper>
            {/* <SearchBox>
                <SearchTextField
                    onChange={handleSearch}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            width: "100%",
                        },
                    })}
                />
            </SearchBox> */}
            {sendingAgentId && (
                <>
                    {lastUpdatedAt && (
                        <Box display="flex" flexDirection="row">
                            <Typography mr={2}>Last updated at:</Typography>
                            <Typography mr={2}>{dateUtils.getFormattedDate(lastUpdatedAt)}</Typography>
                        </Box>
                    )}
                    <HasPermission permission={permissions.PULL_EXCHANGE_RATE_FROM_IPAY}>
                        <SubmitButton
                            type="button"
                            size="large"
                            variant="outlined"
                            onClick={handleOnRefreshExchangeRate}
                            isLoading={isRefreshing}
                        >
                            Pull exchange rate from IPAY
                        </SubmitButton>
                    </HasPermission>
                </>
            )}
            <DropWrapper>
                <Box
                    sx={(theme) => {
                        return {
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                            width: "100%",
                            [theme.breakpoints.down("sm")]: {
                                flexDirection: "column",
                            },
                        };
                    }}
                >
                    {handleSort && (
                        <FormControl
                            sx={(theme) => ({
                                ml: 1,
                                minWidth: 120,

                                [theme.breakpoints.down("sm")]: {
                                    width: "100%",
                                    ml: 0,
                                },
                            })}
                        >
                            <Select
                                onChange={handleSort}
                                displayEmpty
                                defaultValue={state.sort_by}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return (
                                            <Typography component="p" sx={{ opacity: 0.6 }}>
                                                Sort By
                                            </Typography>
                                        );
                                    }
                                    const value = sortData.filter((type) => type.value === selected);
                                    return value[0]?.key;
                                }}
                            >
                                {sortData.map((order) => (
                                    <MenuItem value={order.value} key={order.value}>
                                        {order.key}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <FormControl
                        sx={(theme) => ({
                            ml: 1,
                            minWidth: 120,

                            [theme.breakpoints.down("sm")]: {
                                width: "100%",
                                ml: 0,
                            },
                        })}
                    >
                        <Select
                            onChange={handleOrder}
                            displayEmpty
                            defaultValue={state.order_by}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return (
                                        <Typography component="p" sx={{ opacity: 0.6 }}>
                                            Order By
                                        </Typography>
                                    );
                                }
                                const value = orderData.filter((type) => type.value === selected);
                                return value[0]?.key;
                            }}
                        >
                            {orderData.map((order) => (
                                <MenuItem value={order.value} key={order.value}>
                                    {order.key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DropWrapper>
        </FilterWrapper>
    );
}

export default Filter;
