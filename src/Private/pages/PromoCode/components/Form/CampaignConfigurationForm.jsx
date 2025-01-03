import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import Grid from "@mui/material/Grid";
import React, { useRef } from "react";
import FormLabel from "@mui/material/FormLabel";
import { useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";

import isEmpty from "App/helpers/isEmpty";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import FormFileField from "App/core/hook-form/FormFileField";
import CKEditorComponent from "App/components/Editor/CkEditor";

const ImageWrapper = styled(Box)(({ theme }) => ({
    borderRadius: "12px",
    padding: theme.spacing(0.5),
    color: "black",
    border: "1px solid #C4C4C4",
}));

export const CampaignConfigurationForm = ({
    isAddMode,
    initialValues,
    displayMechanismsOptions,
    setMobileImage,
    setWebImage,
}) => {
    const editorRef = useRef(null);

    const { control, watch, setValue } = useFormContext();

    const termsAndCondition = watch("TermsAndCondition");
    const description = watch("Description");

    return (
        <>
            <Grid container spacing={2} marginY={2}>
                {isAddMode && (
                    <Grid item xs={12} md={4} lg={4}>
                        <FormSelect
                            required
                            name="DisplayMechanism"
                            label="Display Mechanism"
                            options={displayMechanismsOptions}
                        />
                    </Grid>
                )}

                <Grid item xs={12} md={4} lg={4}>
                    <FormTextField
                        required
                        type="number"
                        name="LimitPerUser"
                        label="Limit Per Customer"
                        control={control}
                    />
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                    <FormTextField
                        type="number"
                        name="LimitPerPromo"
                        label="Total Redemptions Allowed"
                        required
                        control={control}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} marginY={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <CKEditorComponent
                        required
                        name="Description"
                        label="Description"
                        elementData={description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setValue("Description", data);
                        }}
                        onReady={(editor) => {
                            editorRef.current = editor;
                            editor.ui.view.editable.element.style.minHeight = "300px";
                        }}
                        onBlur={(event, editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle("height", `300px`, editor.editing.view.document.getRoot());
                            });
                        }}
                        onFocus={(event, editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle("height", `300px`, editor.editing.view.document.getRoot());
                            });
                        }}
                    />
                </Grid>

                <Grid
                    sx={{
                        display: "flex",
                        textAlign: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    item
                    xs={12}
                    md={6}
                    lg={6}
                >
                    <Grid container spacing={2} alignItems="center">
                        {!isAddMode && (
                            <Grid item xs={6}>
                                <ImageWrapper>
                                    {!isEmpty(initialValues.WebImage) ? (
                                        <img
                                            src={initialValues.WebImage}
                                            alt="Web"
                                            height={25}
                                            width={35}
                                            style={{ marginRight: "8px" }}
                                        />
                                    ) : (
                                        <Typography>
                                            No Web Image Available.
                                            <br /> Upload New
                                        </Typography>
                                    )}
                                </ImageWrapper>
                            </Grid>
                        )}

                        <Grid
                            sx={{
                                textAlign: "left",
                            }}
                            item
                            xs={6}
                        >
                            <FormLabel
                                sx={{
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                }}
                                htmlFor="WebImage"
                                component="label"
                            >
                                Web Image
                            </FormLabel>

                            <FormFileField
                                name="WebImage"
                                accept="image/*"
                                onImageCallback={(file) => {
                                    setWebImage(file);
                                }}
                            />
                        </Grid>

                        {!isAddMode && (
                            <Grid item xs={6}>
                                <ImageWrapper>
                                    {!isEmpty(initialValues.MobileImage) ? (
                                        <img
                                            src={initialValues.MobileImage}
                                            alt="Web"
                                            height={30}
                                            width={35}
                                            style={{ marginRight: "8px" }}
                                        />
                                    ) : (
                                        <Typography>
                                            No Web Image Available.
                                            <br /> Upload New
                                        </Typography>
                                    )}
                                </ImageWrapper>
                            </Grid>
                        )}

                        <Grid
                            sx={{
                                textAlign: "left",
                            }}
                            item
                            xs={6}
                        >
                            <FormLabel
                                sx={{
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                }}
                                htmlFor="MobileImage"
                                component="label"
                            >
                                Mobile Image
                            </FormLabel>
                            <FormFileField
                                name="MobileImage"
                                accept="image/*"
                                onImageCallback={(file) => {
                                    setMobileImage(file);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CKEditorComponent
                        required
                        name="TermsAndCondition"
                        label="Terms And Condition"
                        elementData={termsAndCondition}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setValue("TermsAndCondition", data);
                        }}
                        onReady={(editor) => {
                            editorRef.current = editor;
                            editor.ui.view.editable.element.style.minHeight = "300px";
                        }}
                        onBlur={(event, editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle("height", `300px`, editor.editing.view.document.getRoot());
                            });
                        }}
                        onFocus={(event, editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle("height", `300px`, editor.editing.view.document.getRoot());
                            });
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};
