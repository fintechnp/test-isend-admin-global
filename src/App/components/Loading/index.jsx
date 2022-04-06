import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const BoxLoader = styled(Box)(({ theme }) => ({
    display: "flex",
    position: "absolute",
    top: "50%",
    left: `calc(50% - 40px)`,
    height: "50px",
    width: "80px",
    borderRadius: "10px",
    backgroundColor: "#dbe8ff",
    justifyContent: "center",
    alignItems: "center",
}));

const Loader = styled(Box)(({ theme }) => ({
    paddingTop: "8px",
    display: "flex",
    justifyContent: "center",
}));

function Loading({ loading, box }) {
    if (box && loading) {
        return (
            <BoxLoader>
                <CircularProgress size={25} color="secondary" />
            </BoxLoader>
        );
    } else if (loading) {
        return (
            <Loader>
                <CircularProgress size={20} sx={{color: "border.main"}} />
            </Loader>
        );
    } else {
        return <></>;
    }
}

export default Loading;
