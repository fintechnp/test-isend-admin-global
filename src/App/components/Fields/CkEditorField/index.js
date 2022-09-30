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

const editorConfiguration = {
    toolbar: {
        items: [
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "highlight",
            "|",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "indent",
            "outdent",
            "|",
            "todoList",
            "link",
            "blockQuote",
            "imageUpload",
            "insertTable",
            "|",
            "undo",
            "redo",
        ],
    },
};

const TextField = ({
    label,
    input,
    showLabel,
    placeholder,
    small,
    customClass,
    defaultValue,
    inputProps,
    InputProps,
    meta: { touched, invalid, error },
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
                <CKEditor
                    style={{ minHeight: "400px" }}
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={`<p>${placeholder}</p>`}
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
