import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm, change } from "redux-form";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";

import SelectField from "../../../../../App/components/Fields/SelectField";
import CheckboxField from "../../../../../App/components/Fields/CheckboxField";
import TextAreaField from "../../../../../App/components/Fields/TextAreaField";
import TextField from "../../../../../App/components/Fields/TextField";
import Validator from "../../../../../App/utils/validators";

const Container = styled(Grid)(({ theme }) => ({
    maxWidth: "900px",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "0px 0px 16px",
    backgroundColor: theme.palette.background.light,
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "0px 16px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "10px",
}));

const StatusText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    paddingTop: "6px",
    paddingBottom: "-6px",
}));

const CancelButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
}));

const CreateButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const FCMForm = ({
    handleSubmit,
    loading,
    update,
    customer_id,
    handleClose,
}) => {
    const dispatch = useDispatch();
    const [id, setId] = React.useState("topic");
    const [name, setName] = React.useState("Topic");
    const reference = JSON.parse(localStorage.getItem("reference"));

    React.useEffect(() => {
        if (update && !!customer_id) {
            setName("Customer Id");
            dispatch(change("update_fcm_form", "type", "customer_id"));
        } else if (update && !customer_id) {
            dispatch(change("update_fcm_form", "type", "topic"));
        }
    }, []);

    const handleId = (e) => {
        setId(e.target.value);
        if (e.target.value === "customer_id") {
            setName("Customer Id");
        } else {
            setName("Topic");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container container direction="column">
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="title"
                                label="Title"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                    Validator.maxLength100,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="type"
                                label="Select Type"
                                type="text"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    Select Type
                                </option>
                                {reference &&
                                    reference
                                        ?.filter(
                                            (ref_data) =>
                                                ref_data?.reference_type === 89
                                        )[0]
                                        .reference_data.map((data) => (
                                            <option
                                                value={data?.value}
                                                key={data?.reference_id}
                                            >
                                                {data?.name}
                                            </option>
                                        ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="redirect_url"
                                label="Redirect URL"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.urlValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="image_url"
                                label="Image URL"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={Validator.urlValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="type_topic"
                                label="Select Customer / Topic"
                                type="text"
                                small={12}
                                onChange={handleId}
                                component={SelectField}
                            >
                                <option value="topic" name="Topic">
                                    Topic
                                </option>
                                <option value="customer_id" name="Customer Id">
                                    Customer Id
                                </option>
                            </Field>
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name={id}
                                label={name}
                                type={id === "topic" ? "text" : "number"}
                                small={12}
                                component={TextField}
                                validate={Validator.emptyValidator}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="body"
                                label="Body"
                                type="text"
                                small={12}
                                component={TextField}
                                validate={[
                                    Validator.emptyValidator,
                                    Validator.minValue1,
                                    Validator.maxLength500,
                                ]}
                            />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6}>
                            <Grid container sx={{ height: "100%" }}>
                                <Grid item xs={12}>
                                    <StatusText component="p">
                                        Display Notification
                                    </StatusText>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="display_notification"
                                        label="Show"
                                        small={12}
                                        reverse="row-reverse"
                                        component={CheckboxField}
                                    />
                                </Grid>
                            </Grid>
                        </FieldWrapper>
                        <FieldWrapper item xs={12}>
                            <Field
                                name="detail_content"
                                label="Content"
                                placeholder="Write content..."
                                type="text"
                                small={12}
                                minRows={4}
                                component={TextAreaField}
                            />
                        </FieldWrapper>
                    </FormWrapper>
                </Grid>
                <Grid item>
                    <Divider sx={{ pt: 1.2 }} />
                </Grid>
                <Grid item>
                    <ButtonWrapper
                        container
                        columnGap={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item>
                            <CancelButton
                                size="small"
                                variant="contained"
                                onClick={handleClose}
                            >
                                Cancel
                            </CancelButton>
                        </Grid>
                        <Grid item>
                            <CreateButton
                                size="small"
                                variant="outlined"
                                loading={loading}
                                endIcon={update ? <UpdateIcon /> : <AddIcon />}
                                type="submit"
                            >
                                {update ? "Update" : "Create"}
                            </CreateButton>
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Container>
        </Form>
    );
};

export default reduxForm({ form: ["form"] })(FCMForm);
