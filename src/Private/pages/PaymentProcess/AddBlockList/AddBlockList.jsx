import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import MuiTextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiTextareaAutosize from "@mui/material/TextareaAutosize";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import actions from "./../store/actions";
import Details from "./Details";

const TitleWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexDirection: "column",
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingLeft: "8px",
}));

const SearchBox = styled(Box)(({ theme }) => ({
    width: "50%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const BlockBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "120px",
    marginTop: "8px",
    padding: "8px",
    border: "1px solid black",
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
    borderColor: theme.palette.border.light,
    width: "100%",
    "& .MuiOutlinedInput-input.MuiInputBase-input": {
        padding: "8px 0px",
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
    [theme.breakpoints.down("md")]: {
        width: "100%",
    },
}));

const SearchButton = styled(Button)(({ theme }) => ({
    fontSize: "12px",
    textTransform: "capitalize",
    color: theme.palette.border.main,
    borderColor: theme.palette.border.main,
    "&:hover": {
        color: theme.palette.border.dark,
        borderColor: theme.palette.border.dark,
    },
    "& .MuiButton-startIcon>*:nth-of-type(1)": {
        fontSize: "15px",
    },
}));

function AddBlockList() {
    const dispatch = useDispatch();
    const [tid, setTId] = useState(null);
    const { response, loading } = useSelector(
        (state) => state.get_transaction_details
    );

    useEffect(() => {
        setTId(null);
    }, []);

    const handleTid = (e) => {
        if (e.target.value) {
            setTId(e.target.value);
        }
    };

    const handleSearch = () => {
        if (tid) {
            dispatch(actions.get_transaction_details(tid));
        }
    };

    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <CancelPresentationIcon
                            sx={{ color: "primary.main", fontSize: "28px" }}
                        />
                        <Title> Add Transaction to Block List </Title>
                    </Box>
                    <SearchBox sx={{ columnGap: 1 }}>
                        <TextField
                            type="number"
                            variant="outlined"
                            placeholder="Transaction Id"
                            onChange={handleTid}
                        />
                        <SearchButton
                            variant="outlined"
                            size="small"
                            onClick={handleSearch}
                        >
                            Search
                        </SearchButton>
                    </SearchBox>
                </TitleWrapper>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{ mb: 1.2 }} />
            </Grid>
            {loading && (
                <Grid item xs={12}>
                    <p>loading</p>
                </Grid>
            )}
            <Grid item xs={12}>
                <Details data={response?.data} />
            </Grid>
            <Grid item xs={12}>
                <BlockBox>
                    <MuiTextareaAutosize
                        maxRows={4}
                        placeholder="Write remarks"
                    />
                    <Button>Block</Button>
                </BlockBox>
            </Grid>
        </Grid>
    );
}

export default AddBlockList;
