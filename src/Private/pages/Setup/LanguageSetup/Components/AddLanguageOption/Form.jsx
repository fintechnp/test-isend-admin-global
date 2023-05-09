import { Divider, Grid } from "@mui/material";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";
import HookForm from "App/core/hook-form/HookForm";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const StatusText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    paddingTop: "6px",
    paddingBottom: "-6px",
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

const languageValidation = Yup.object().shape({
    language_name: Yup.string().required("Language name is required"),
    language_code: Yup.string().required("Language code is required"),
});

const LanguageOptionForm = ({ update, onSubmit, buttonText, loading, initialValues, handleClose }) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(languageValidation),
    });
    const { reset, setValue, getValues } = methods;

    const handleSubmit = (data) => {
        onSubmit(data);
        console.log(data);
    };
    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Container>
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                            <FormTextField name="language_name" label="Name" />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                            <FormTextField name="language_code" label="Code" />
                        </FieldWrapper>

                        {update && (
                            <FieldWrapper item xs={12} sm={6}>
                                <Grid container alignItems="flex-end" justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <StatusText component="p">Status</StatusText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormCheckbox name="is_active" label="Active" />
                                    </Grid>
                                </Grid>
                            </FieldWrapper>
                        )}
                    </FormWrapper>
                </Grid>
                <Grid>
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
                                <CancelButton size="small" variant="contained" onClick={handleClose}>
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
                                    {buttonText}
                                </CreateButton>
                            </Grid>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </Container>
        </HookForm>
    );
};

export default LanguageOptionForm;
