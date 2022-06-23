import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm, change } from "redux-form";
import { Grid, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";

import SelectField from "../../../../../App/components/Fields/SelectField";
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
    padding: "6px 0px 16px",
    backgroundColor: theme.palette.background.light,
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 16px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
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
                                name="type"
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
