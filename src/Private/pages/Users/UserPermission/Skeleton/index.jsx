import React from "react";
import { Grid } from "@mui/material";
import SkeletonCard from "./SkeletonCard";

const PermissionSkeleton = () => {

  return (
    <>
      <Grid container spacing={2} >
        {Array.from(Array(12).keys()).map((row, index) => {
            return (
              <Grid item xs={12} sm={4} md={3} key={index}>
                <SkeletonCard />
              </Grid >
          )})
        }
      </Grid>
    </>
  );
};

export default PermissionSkeleton;
