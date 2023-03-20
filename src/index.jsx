import React, { Suspense } from "react";
import { lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Logo from "../src/assets/long-logo.svg";

const App = lazy(() => import("./App"));

const Card = styled(Box)(({ theme }) => ({
  height: "96vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function ImageCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="108"
        image={Logo}
        alt="document image"
        sx={{ width: "124px" }}
      />
    </Card>
  );
}

ReactDOM.render(
  <Suspense fallback={<ImageCard />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

reportWebVitals();
