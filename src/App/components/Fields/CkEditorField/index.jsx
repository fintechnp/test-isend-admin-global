import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { renderFromHelper } from "../helpers";

const Wrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "4px",
}));

const Label = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    verticalAlign: "middle",
    paddingTop: "2px",
    paddingBottom: "2px",
    textAlign: "left",
    color: theme.palette.secondary.contrastText,
}));

const CKEditorWrapper = styled(CKEditor)(({ theme }) => ({
    "& .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused)": {
        minHeight: "300px !important",
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

const TextField = ({
    label,
    input,
    height,
    showLabel,
    placeholder,
    small,
    customClass,
    defaultValue,
    inputProps,
    InputProps,
    meta: { touched, error },
    ...rest
}) => {
    return (
        <Wrapper container>
            {label && (
                <Grid item xs={12} md={small ? 12 - small : 4}>
                    <Label>{label}</Label>
                </Grid>
            )}
            <Grid item xs={12} md={small ? small : 8}>
                <CKEditorWrapper
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={`<p>${placeholder}</p>`}
                    onReady={(editor) => {
                        editor.ui.view.editable.element.style.minHeight = `${height}`;
                    }}
                    onBlur={(event, editor) => {
                        editor.editing.view.change((writer) => {
                            writer.setStyle("height", `${height}`, editor.editing.view.document.getRoot());
                        });
                    }}
                    onFocus={(event, editor) => {
                        editor.editing.view.change((writer) => {
                            writer.setStyle("height", `${height}`, editor.editing.view.document.getRoot());
                        });
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        input.onChange(data);
                    }}
                />
                {renderFromHelper({ touched, error })}
            </Grid>
        </Wrapper>
    );
};

export default TextField;
