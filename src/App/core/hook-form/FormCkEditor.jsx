import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext, useController } from "react-hook-form";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Label = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    verticalAlign: "middle",
    paddingTop: "2px",
    paddingBottom: "2px",
    textAlign: "left",
}));

const CKEditorWrapper = styled("div", {
    shouldForwardProp: (prop) => prop !== "error",
})(({ theme, error }) => ({
    // "& .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused)": {
    //     minHeight: "200px !important",
    // },
    "& .ck.ck-editor": {
        ...(error
            ? {
                  border: "1px solid red",
              }
            : {}),
    },
}));

const editorConfiguration = {
    toolbar: {
        items: [
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "indent",
            "outdent",
            "|",
            "link",
            "blockQuote",
            "imageUpload",
            "insertTable",
            "|",
            "undo",
            "redo",
        ],
    },
    ui: {
        minHeight: 300,
    },
};

function FormCkEditor(props) {
    const { control } = useFormContext();

    const { name, label, disabled, color, placeholder, height } = props;

    const {
        field: { value, onChange, onBlur },
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue: "",
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <Box display="flex" flexDirection="column" gap={1}>
                        {label && (
                            <Box>
                                <Label>{label}</Label>
                            </Box>
                        )}
                        <CKEditorWrapper error={error}>
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfiguration}
                                data={value ?? ""}
                                onReady={(editor) => {
                                    editor.ui.view.editable.element.style.minHeight = `${height}`;
                                }}
                                onBlur={(event, editor) => {
                                    editor.editing.view.change((writer) => {
                                        writer.setStyle("height", `${height}`, editor.editing.view.document.getRoot());
                                    });
                                    onBlur(event);
                                }}
                                onFocus={(event, editor) => {
                                    editor.editing.view.change((writer) => {
                                        writer.setStyle("height", `${height}`, editor.editing.view.document.getRoot());
                                    });
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    onChange(data);
                                }}
                            />
                        </CKEditorWrapper>
                        {error && (
                            <Box>
                                <FormHelperText error={true}>{error.message}</FormHelperText>
                            </Box>
                        )}
                    </Box>
                );
            }}
        />
    );
}

export default FormCkEditor;

FormCkEditor.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    height: PropTypes.string,
};

FormCkEditor.defaultProps = {
    type: "text",
    label: "",
    height: "100px",
};
