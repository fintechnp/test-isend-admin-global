import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { convertDate } from "App/utils/convertDate";
import { format } from "date-fns";

import Basic from "./Basic";
import AddressForm from "./AddressForm";
import IdentityForm from "./IdentityForm";
import actions from "./../store/actions";

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

const steps = ["Basic Information", "Address Details", "Identity Information"];

function CustomerForm({ update_data, loading }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = React.useState("null");
    const [data, setData] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const {
        success: add_success,
        loading: add_loading,
        error: add_error,
    } = useSelector((state) => state.create_customers);
    const {
        success: update_success,
        loading: update_loading,
        error: update_error,
    } = useSelector((state) => state.update_customers);

    const { response: partner_sending, loading: p_loading } = useSelector((state) => state.get_sending_partner);

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        if (id) {
            setCode(memoizedData?.phone_country_code);
        }
        if (id && memoizedData?.country) {
            setCode(memoizedData?.phone_country_code);
            dispatch({
                type: "GET_SENDING_PARTNER",
                query: {
                    page_number: 1,
                    page_size: 100,
                    agent_type: "SEND",
                    country: memoizedData?.country,
                    sort_by: "name",
                    order_by: "DESC",
                },
            });
        }
    }, [dispatch, id, memoizedData]);

    React.useEffect(() => {
        if (update_error || add_error) {
            setActiveStep(0);
            let keys = Object.keys(completed);
            delete completed[keys[keys.length - 1]];
        }
    }, [update_error, add_error]);

    React.useEffect(() => {
        if (add_success || update_success) {
            navigate(-1);
            setCompleted({});
        }
    }, [add_success, update_success]);

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

    const handleSubmitForm = (id) => {
        if (id) {
            dispatch(actions.update_customers(id, data));
        } else {
            dispatch(actions.create_customers(data));
        }
    };

    const handleBasicForm = (data) => {
        handleComplete();
    };

    const handleContactForm = () => {
        handleComplete();
    };

    const handleBusinessForm = (data) => {
        setData(data);
        handleComplete();
    };

    if (loading) {
        return (
            <Box sx={{ width: "100%", pt: "16px" }}>
                <Stepper nonLinear activeStep={activeStep} alternativeLabel sx={{ width: "100%", padding: "16px 0px" }}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepLabel color="inherit">{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                    <Fetching>Fetching...</Fetching>
                </Box>
            </Box>
        );
    }

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
                            All steps completed - Please submit to create Partner.
                        </Typography>
                        <CheckCircleOutlineIcon sx={{ fontSize: "64px", color: "success.main" }} />
                        <LoadingButton
                            size="small"
                            variant="outlined"
                            loading={add_loading || update_loading}
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
                            onClick={() => handleSubmitForm(id)}
                        >
                            Submit
                        </LoadingButton>
                    </CompletedWrapper>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {id ? (
                        <Box>
                            {activeStep === 0 && (
                                <Basic
                                    destroyOnUnmount={false}
                                    enableReinitialize={true}
                                    shouldError={() => true}
                                    form={`update_customer_form`}
                                    initialValues={
                                        memoizedData && {
                                            customer_type: memoizedData?.customer_type?.toUpperCase(),
                                            title: memoizedData?.title,
                                            first_name: memoizedData?.first_name,
                                            middle_name: memoizedData?.middle_name,
                                            last_name: memoizedData?.last_name,
                                            gender: memoizedData?.gender,
                                            phone_country_code: memoizedData?.phone_country_code,
                                            country: memoizedData?.country,
                                            register_agent_id: memoizedData?.register_agent_id,
                                            postcode: memoizedData?.postcode,
                                            unit: memoizedData?.unit,
                                            street: memoizedData?.street,
                                            city: memoizedData?.city,
                                            state: memoizedData?.state,
                                            address: memoizedData?.address,
                                            mobile_number: memoizedData?.mobile_number,
                                            id_type: memoizedData?.id_type,
                                            id_number: memoizedData?.id_number,
                                            id_issue_date:
                                                memoizedData?.id_issue_date && convertDate(memoizedData?.id_issue_date),
                                            id_expiry_date:
                                                memoizedData?.id_expiry_date &&
                                                convertDate(memoizedData?.id_expiry_date),
                                            id_issued_country: memoizedData?.id_issued_country,
                                            date_of_birth:
                                                memoizedData?.date_of_birth && convertDate(memoizedData?.date_of_birth),
                                            birth_country: memoizedData?.birth_country,
                                            citizenship_country: memoizedData?.citizenship_country,
                                            occupation: memoizedData?.occupation,
                                            source_of_income: memoizedData?.source_of_income,
                                            language: memoizedData?.language,
                                            is_active: memoizedData?.is_active,
                                            street_type: memoizedData?.street_type,
                                            street_no: memoizedData?.street_no,
                                            ssn_number: memoizedData?.ssn_number,
                                        }
                                    }
                                    steps={steps}
                                    hasPartner={code}
                                    setCode={setCode}
                                    buttonText="Next"
                                    loading={p_loading}
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBasicForm}
                                    partner_sending={partner_sending?.data}
                                />
                            )}
                            {activeStep === 1 && (
                                <AddressForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`update_customer_form`}
                                    steps={steps}
                                    code={code}
                                    id={id}
                                    buttonText="Next"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleContactForm}
                                />
                            )}
                            {activeStep === 2 && (
                                <IdentityForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`update_customer_form`}
                                    steps={steps}
                                    buttonText="Update"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBusinessForm}
                                />
                            )}
                        </Box>
                    ) : (
                        <Box>
                            {activeStep === 0 && (
                                <Basic
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`add_customer_form`}
                                    initialValues={{
                                        language: "en",
                                    }}
                                    steps={steps}
                                    buttonText="Next"
                                    hasPartner={code}
                                    setCode={setCode}
                                    loading={p_loading}
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBasicForm}
                                    partner_sending={partner_sending?.data}
                                />
                            )}
                            {activeStep === 1 && (
                                <AddressForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`add_customer_form`}
                                    code={code}
                                    steps={steps}
                                    buttonText="Next"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleContactForm}
                                />
                            )}
                            {activeStep === 2 && (
                                <IdentityForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`add_customer_form`}
                                    steps={steps}
                                    buttonText="Finish"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBusinessForm}
                                />
                            )}
                        </Box>
                    )}
                </React.Fragment>
            )}
        </Box>
    );
}

export default CustomerForm;
