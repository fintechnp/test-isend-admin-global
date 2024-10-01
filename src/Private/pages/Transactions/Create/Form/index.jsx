import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import CustomerForm from "./CustomerForm";
import BeneficiaryForm from "./BeneficiaryForm";
import SendAmountForm from "./SendAmountForm";
import actions from "./../../store/actions";
import PartnerActions from "../../../Setup/Partner/store/actions";

const CompletedWrapper = styled(Box)(({ theme }) => ({
    marginTop: "16px",
    minHeight: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "32px 0px",
    backgroundColor: theme.palette.background.light,
}));

const Stepper = styled(MuiStepper)(({ theme }) => ({
    "& .MuiSvgIcon-root.MuiStepIcon-root.Mui-completed": {
        color: theme.palette.success.main,
    },
    "& .MuiStepLabel-label": {
        fontSize: "18px",
    },
    "& .MuiStepLabel-label.Mui-completed": {
        color: theme.palette.success.main,
    },
}));

const Fetching = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.main,
    fontSize: "16px",
    fontWeight: 400,
}));

const steps = ["Customer Information", "Beneficiary Information", "Sending Amount"];

const stateSend = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

const stateCustomer = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

function TransactionForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMounted = React.useRef(false);
    const [data, setData] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [filterPartner, setFilterPartner] = React.useState(stateSend);
    const [filterCustomer, setFilterCustomer] = React.useState(stateCustomer);

    const {
        success: add_success,
        loading: add_loading,
        error: add_error,
    } = useSelector((state) => state.create_transactions);

    const { response: customer_list, loading: customer_loading } = useSelector((state) => state.get_customers);

    const { response: sending_partner, loading: sending_loading } = useSelector((state) => state.get_sending_partner);

    React.useEffect(() => {
        if (add_error) {
            setActiveStep(0);
            let keys = Object.keys(completed);
            delete completed[keys[keys.length - 1]];
        }
    }, [add_error]);

    React.useEffect(() => {
        if (add_success) {
            navigate(-1);
            setCompleted({});
        }
    }, [add_success]);

    React.useEffect(() => {
        if (isMounted.current) {
            dispatch(PartnerActions.get_sending_partner(filterPartner));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterPartner]);

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    //Form
    const handleSubmitForm = () => {
        dispatch(actions.add_partner(data));
    };

    const handleCustomerForm = (data) => {
        handleComplete();
    };

    const handleBeneficiaryForm = () => {
        handleComplete();
    };

    const handleAmountForm = (data) => {
        setData(data);
        handleComplete();
    };

    //Partner
    const handlePartner = (e) => {
        const country = e.target.value;
        const updatedFilterSchema = {
            ...filterPartner,
            country: country,
        };
        setFilterPartner(updatedFilterSchema);
    };

    //Customer
    const handleUCustomer = (e) => {
        const sending_agent_id = e.target.value;
        const updatedFilterSchema = {
            ...filterCustomer,
            sending_agent_id: sending_agent_id,
        };
        setFilterCustomer(updatedFilterSchema);
    };

    return (
        <Box sx={{ width: "100%", pt: "16px" }}>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel sx={{ width: "100%", padding: "16px 0px" }}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepLabel color="inherit">{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {allStepsCompleted() ? (
                <React.Fragment>
                    <CompletedWrapper sx={{}}>
                        <Typography
                            sx={{
                                mt: 2,
                                mb: 1,
                                color: "border.dark",
                                fontSize: "18px",
                            }}
                        >
                            All steps completed - Please submit to create Transaction.
                        </Typography>
                        <CheckCircleOutlineIcon sx={{ fontSize: "64px", color: "success.main" }} />
                        <LoadingButton
                            size="small"
                            variant="outlined"
                            loading={add_loading}
                            sx={{
                                mt: 2,
                                borderWidth: "2px",
                                minWidth: "120px",
                                "&:hover": {
                                    borderWidth: "2px",
                                },
                                "& .MuiCircularProgress-root": {
                                    color: "primary.contrastText",
                                },
                            }}
                            onClick={() => handleSubmitForm()}
                        >
                            Submit
                        </LoadingButton>
                    </CompletedWrapper>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box>
                        {activeStep === 0 && (
                            <CustomerForm
                                destroyOnUnmount={false}
                                shouldError={() => true}
                                form={`create_transaction_form`}
                                steps={steps}
                                customer_list={customer_list?.data}
                                sending_partner={sending_partner?.data}
                                activeStep={activeStep}
                                handleBack={handleBack}
                                handlePartner={handlePartner}
                                handleUCustomer={handleUCustomer}
                                onSubmit={handleCustomerForm}
                            />
                        )}
                        {activeStep === 1 && (
                            <BeneficiaryForm
                                destroyOnUnmount={false}
                                shouldError={() => true}
                                form={`create_transaction_form`}
                                steps={steps}
                                activeStep={activeStep}
                                handleBack={handleBack}
                                onSubmit={handleBeneficiaryForm}
                            />
                        )}
                        {activeStep === 2 && (
                            <SendAmountForm
                                destroyOnUnmount={false}
                                shouldError={() => true}
                                form={`create_transaction_form`}
                                steps={steps}
                                activeStep={activeStep}
                                handleBack={handleBack}
                                onSubmit={handleAmountForm}
                            />
                        )}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default TransactionForm;
