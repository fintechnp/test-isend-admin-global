import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import PageContent from "App/components/Container/PageContent";
import { ResetButton, SearchButton } from "../AllButtons/Buttons";

export default function MarketMakerFilterForm({ isProcessing, onSubmit, onReset }) {
    const methods = useForm();

    const { reset } = methods;

    const handleReset = () => {
        onReset();
        reset();
    };

    return (
        <PageContent>
            <HookForm onSubmit={onSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="Name" label="Name" />
                    </Grid>
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
                                    onClick={handleReset}
                                    disabled={isProcessing}
                                >
                                    Reset
                                </ResetButton>
                            </Grid>
                            <Grid item>
                                <SearchButton size="small" variant="outlined" type="submit" disabled={isProcessing}>
                                    Search
                                </SearchButton>
                            </Grid>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </HookForm>
        </PageContent>
    );
}

MarketMakerFilterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    isProcessing: PropTypes.bool.isRequired,
};
