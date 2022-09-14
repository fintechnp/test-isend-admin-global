import React from "react";
import Box from "@mui/material/Box";
import MuiTextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const SearchContainer = styled("div")(({ theme }) => ({
    marginRight: "4px",
    columnGap: 12,
    minWidth: "300px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
        minWidth: "400px",
    },
    [theme.breakpoints.up("xl")]: {
        minWidth: "450px",
    },
}));

const SearchBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
    width: "100%",
    "& .MuiOutlinedInput-input.MuiInputBase-input": {
        padding: "7px 0px",
        paddingRight: "8px",
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
        paddingLeft: "10px",
        borderColor: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.border.light,
        borderWidth: "1px",
    },
    "&: hover": {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.border.light,
            borderWidth: "2px",
        },
    },
    "& .MuiSvgIcon-root": {
        fill: theme.palette.border.main,
    },
}));

function SearchTransactions({ handleSearch }) {
    return (
        <SearchContainer>
            <SearchBox>
                <TextField
                    type="search"
                    variant="outlined"
                    onClick={handleSearch}
                    placeholder="Search Transaction"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </SearchBox>
        </SearchContainer>
    );
}

export default SearchTransactions;
