import React from "react";
import { styled } from "@mui/material/styles";
import { Field, Form, reduxForm } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import SelectField from "../../../../../App/components/Fields/SelectField";
import DatePickerField from "../../../../../App/components/Fields/DatePickerField";

const Container = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginTop: "8px",
    marginBottom: "12px",
    padding: "8px 0px",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.border.main}`,
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "8px",
    display: "flex",
    paddingLeft: "14px",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexDirection: "column",
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingLeft: "8px",
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "0px 12px",
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "2px 4px",
}));

const FieldWrapperLabel = styled(Grid)(({ theme }) => ({
    padding: "4px 4px",
    "& .MuiInputBase-input": {
        opacity: 0.6,
    },
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    padding: "4px 0px",
    paddingRight: "4px",
}));

const ResetButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    border: `1px solid ${theme.palette.warning.main}`,
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const SearchButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

function SearchForm({ handleSubmit, handleReset, s_loading, SendPartner }) {
    const handleResetButton = (e) => {
        handleReset();
    };

    return (
        <Container container>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContentPasteSearchIcon
                            sx={{ color: "primary.main", fontSize: "28px" }}
                        />
                        <Title> Filter Transaction </Title>
                    </Box>
                </TitleWrapper>
            </Grid>
            <Grid item xs={12}>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper container direction="row">
                        <FieldWrapper item xs={12} sm={6}>
                            <Field
                                name="sending_agent_id"
                                placeholder="Send Partner"
                                type="number"
                                small={12}
                                component={SelectField}
                            >
                                <option value="" disabled>
                                    {s_loading
                                        ? "Loading..."
                                        : "Select Send Partner"}
                                </option>
                                {!s_loading && SendPartner?.length === 0 && (
                                    <option value="" disabled>
                                        No Partners
                                    </option>
                                )}
                                {SendPartner &&
                                    SendPartner.map((data) => (
                                        <option
                                            value={data.agent_id}
                                            key={data?.tid}
                                        >
                                            {data.name}
                                        </option>
                                    ))}
                            </Field>
                        </FieldWrapper>
                        <FieldWrapperLabel item xs={12} sm={6}>
                            <Field
                                name="transaction_year"
                                showLabel={true}
                                disableFuture
                                placeholder="Select Year"
                                views={["year"]}
                                inputFormat="YYYY"
                                small={12}
                                component={DatePickerField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FieldWrapperLabel>
                        <Grid item xs={12}>
                            <ButtonWrapper
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                columnSpacing={2}
                            >
                                <Grid item>
                                    <ResetButton
                                        size="small"
                                        variant="outlined"
                                        onClick={handleResetButton}
                                    >
                                        Reset
                                    </ResetButton>
                                </Grid>
                                <Grid item>
                                    <SearchButton
                                        size="small"
                                        variant="outlined"
                                        type="submit"
                                    >
                                        Filter
                                    </SearchButton>
                                </Grid>
                            </ButtonWrapper>
                        </Grid>
                    </FormWrapper>
                </Form>
            </Grid>
        </Container>
    );
}

export default reduxForm({ form: "search_form_yearly_reports" })(SearchForm);
