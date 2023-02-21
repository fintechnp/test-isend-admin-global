import { memo } from "react";
import PropTypes from "prop-types";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import InputAdornment from "@mui/material/InputAdornment";
import MuiOutlinedInput from "@mui/material/OutlinedInput";

const OutlinedInput = styled(MuiOutlinedInput)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    // lineHeight: '1rem',
    // height: '40px',
    maxWidth: "300px",
    border: `inherit solid ${theme.palette.grey[400]}`,
    "&::placeholder": {
        color: theme.palette.grey[300],
    },
    "& input": {
        outline: "none",
    },
}));

function SearchBox({ placeholder, onChange, onClickClearSearch, value, size }) {
    return (
        <OutlinedInput
            size={"small"}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
            endAdornment={
                value ? (
                    <InputAdornment position="end">
                        <IconButton
                            size={size}
                            sx={{
                                "& .MuiSvgIcon-root": (theme) => ({
                                    color: theme.palette.error.main,
                                }),
                            }}
                            color="error"
                            onClick={onClickClearSearch}
                        >
                            <CancelIcon />
                        </IconButton>
                    </InputAdornment>
                ) : (
                    ""
                )
            }
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}

export default memo(SearchBox);

SearchBox.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    onClickClearSearch: PropTypes.func,
    size: PropTypes.oneOf(["small", "medium", "large"]),
};

SearchBox.defaultProps = {
    placeholder: "Search ...",
    size: "small",
};
