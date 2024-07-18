import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MuiStep from "@mui/material/Step";
import { styled } from "@mui/material/styles";
import MuiStepper from "@mui/material/Stepper";
import MuiStepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";

import useDetectScreen from "App/hooks/useDetectScreen";

const StepLabel = styled(MuiStepLabel, {
    shouldForwardProp: (prop) => prop !== "isActiveOrCompleted",
})(({ theme, isActiveOrCompleted }) => ({
    flexDirection: "row",
    "& .MuiStepLabel-label": {
        color: theme.palette.primary.main,
        fontWeight: 600,
    },
    "& .MuiStepLabel-iconContainer": {
        "& div div:first-of-type": {
            height: "32px",
            width: "32px",
            ...(isActiveOrCompleted
                ? {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                  }
                : {
                      border: `1px solid ${theme.palette.stroke.base}`,
                      color: theme.palette.text.baseSecond,
                  }),
        },
    },
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 15,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {},
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {},
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 0,
        borderStyle: "dashed",
    },
    "& .MuiSvgIcon-root": {
        backgroundColor: "red",
    },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
}));

function StepIconRenderer({ isActive, isCompleted, icon }) {
    if (isCompleted) {
        return (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                    fill="#105BB7"
                />
                <path
                    d="M21.3332 12.6665L14.3534 19.6463C14.1581 19.8415 13.8415 19.8415 13.6463 19.6463L10.6665 16.6665"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        );
    }
    if (isActive) {
        return (
            <Box
                sx={{
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid  #105BB7",
                    borderRadius: "50%",
                    color: "#105BB7",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                    }}
                >
                    {icon}
                </Typography>
            </Box>
        );
    }
    return (
        <Box
            sx={{
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid  #A1C8F7",
                borderRadius: "50%",
                color: "#A1C8F7",
            }}
        >
            <Typography
                sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                }}
            >
                {icon}
            </Typography>
        </Box>
    );
}

StepIconRenderer.propTypes = {
    isActive: PropTypes.bool,
    isCompleted: PropTypes.bool,
    icon: PropTypes.node,
};

function QontoStepIcon(props) {
    const { active, completed, className, icon } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            <StepIconRenderer isActive={active} isCompleted={completed} icon={icon} />
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.node,
};

export default function Stepper({ steps = [], activeStep, sx }) {
    let activeIndex = activeStep;

    const { isMobile, isTablet, isDesktop } = useDetectScreen();

    if (activeIndex === -1) {
        activeIndex = steps.length;
    }

    return (
        <MuiStepper
            sx={{
                "& .Mui-completed span": {
                    borderColor: theme => theme.palette.primary.main,
                },
                ...sx,
            }}
            nonLinear
            activeStep={activeStep}
            connector={<QontoConnector />}
        >
            {steps.map((step, index) => (
                <MuiStep key={step.label} completed={activeIndex > index}>
                    <StepLabel
                        StepIconComponent={QontoStepIcon}
                        StepIconProps={{
                            completed: activeIndex > index,
                            active: activeIndex === index,
                        }}
                        isActiveOrCompleted={activeIndex === index || activeIndex > index}
                    >
                        {activeIndex === index && (
                            <>
                                {isMobile && activeIndex === index && step.label}
                                {isTablet || isDesktop ? step.label : ""}
                            </>
                        )}
                    </StepLabel>
                </MuiStep>
            ))}
        </MuiStepper>
    );
}

Stepper.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.node.isRequired,
            component: PropTypes.node,
        }),
    ),
    activeStep: PropTypes.number.isRequired,
};
