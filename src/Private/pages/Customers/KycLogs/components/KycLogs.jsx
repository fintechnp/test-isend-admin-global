import React from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import VerifiedBadge from "../../Search/components/VerifiedBadge";
import { ReactComponent as KycLogActive } from "assets/active-stepper.svg";
import { ReactComponent as KycLogInActive } from "assets/inactive-stepper.svg";

function areAllValuesNull(obj) {
    return Object.values(obj).every((value) => value === null);
}

const StatusStepper = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
    position: "relative",
    "&::after": {
        content: '""',
        position: "absolute",
        left: "15px",
        top: "34px",
        bottom: "-30px",
        width: "1px",
        borderLeft: "2px dashed #EAEBF0",
        display: "block",
    },
}));

const KycLogs = ({ kycLogs = {} }) => {
    return (
        <>
            {kycLogs &&
                Object.entries(kycLogs).map(
                    ([key, value], index) =>
                        !areAllValuesNull(value) && (
                            <Grow in={true} timeout={1000} key={index}>
                                <Fade in={true} timeout={1000}>
                                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                        {/* Status Stepper */}
                                        <StatusStepper
                                            sx={{
                                                "&::after": {
                                                    display:
                                                        index === Object.entries(kycLogs).length - 1 ? "none" : "block",
                                                },
                                            }}
                                        >
                                            {value.status ? <KycLogActive /> : <KycLogInActive />}
                                        </StatusStepper>

                                        {/* Step Content */}
                                        <Box flex={1}>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {key
                                                    .replace(/([A-Z])/g, " $1")
                                                    .toUpperCase()
                                                    .trim()}
                                            </Typography>

                                            <Box display="flex" gap="8px" alignItems="center">
                                                {value.verifiedValues && !areAllValuesNull(value.verifiedValues)
                                                    ? Object.entries(value.verifiedValues).map(
                                                          ([field, isVerified]) => {
                                                              return (
                                                                  isVerified !== null && (
                                                                      <Box
                                                                          key={field}
                                                                          display="flex"
                                                                          alignItems="center"
                                                                          gap="4px"
                                                                          sx={{
                                                                              border: "1px solid #EAEBF0",
                                                                              borderRadius: "8px",
                                                                              padding: "2px 8px",
                                                                              backgroundColor: "#F7F7F8",
                                                                          }}
                                                                      >
                                                                          <VerifiedBadge
                                                                              size="10px"
                                                                              isVerified={Boolean(isVerified)}
                                                                          />
                                                                          <span>
                                                                              {field === "dateOfBirth"
                                                                                  ? "D.O.B"
                                                                                  : field
                                                                                        .replace(/([A-Z])/g, " $1")
                                                                                        .toUpperCase()
                                                                                        .trim()}
                                                                          </span>
                                                                      </Box>
                                                                  )
                                                              );
                                                          },
                                                      )
                                                    : null}
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Fade>
                            </Grow>
                        ),
                )}
        </>
    );
};

export default KycLogs;
