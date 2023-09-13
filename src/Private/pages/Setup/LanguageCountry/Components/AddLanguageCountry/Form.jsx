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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSelect from "App/core/hook-form/FormSelect";
import actions from "./../../../LanguageSetup/store/actions";
import { useEffect } from "react";

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

const validationSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    language_code: Yup.string().required("Language is required"),
});

const LanguageCountryForm = ({ update, onSubmit, buttonText, loading, initialValues, handleClose }) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });
    const dispatch = useDispatch();
    const { reset, setValue, getValues } = methods;

    const queryLanguage = {
        page_size: 10000,
    };

    useEffect(() => {
        dispatch(actions.get_all_language_option(queryLanguage));
    }, []);

    const country = JSON.parse(localStorage.getItem("country"));

    const countryOptions = country?.map((data) => {
        return { label: data.country, value: data.iso3 };
    });

    const { response: languageData, loading: lang_loading } = useSelector((state) => state.get_all_language_option);

    const languageOptions = languageData?.data?.map((data) => {
        return { label: data?.language_name, value: data?.language_code };
    });
    const handleSubmit = (data) => {
        onSubmit(data);
    };
    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Container>
                <Grid item xs={12}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                            <FormSelect name="country" label="Country" options={countryOptions} />
                        </FieldWrapper>
                        <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                            <FormSelect name="language_code" label="Language" options={languageOptions} />
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

export default LanguageCountryForm;
