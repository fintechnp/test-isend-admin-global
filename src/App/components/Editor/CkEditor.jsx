import React, { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext, get } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    AutoLink,
    Autosave,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HtmlComment,
    HtmlEmbed,
    Italic,
    Link,
    Paragraph,
    RemoveFormat,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Underline,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
const LICENSE_KEY = "GPL"; // Replace with your actual license key if needed.

const CKEditorComponent = ({ elementData, required, name, label, placeholder, ...rest }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const {
        setValue,
        formState: { errors },
        control,
    } = useFormContext();

    const formName = name ?? "element_content";
    const isError = get(errors, formName);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }
        return {
            editorConfig: {
                toolbar: {
                    items: [
                        "sourceEditing",
                        "showBlocks",
                        "|",
                        "heading",
                        "|",
                        "fontSize",
                        "fontFamily",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "subscript",
                        "superscript",
                        "code",
                        "removeFormat",
                        "|",
                        "specialCharacters",
                        "link",
                        "insertTable",
                        "highlight",
                        "codeBlock",
                        "htmlEmbed",
                    ],
                    shouldNotGroupWhenFull: false,
                },
                plugins: [
                    AutoLink,
                    Autosave,
                    Bold,
                    Code,
                    CodeBlock,
                    Essentials,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    FullPage,
                    GeneralHtmlSupport,
                    Heading,
                    Highlight,
                    HtmlComment,
                    HtmlEmbed,
                    Italic,
                    Link,
                    Paragraph,
                    RemoveFormat,
                    ShowBlocks,
                    SourceEditing,
                    SpecialCharacters,
                    Strikethrough,
                    Subscript,
                    Superscript,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    Underline,
                ],
                fontFamily: {
                    supportAllValues: true,
                },
                fontSize: {
                    options: [10, 12, 14, "default", 18, 20, 22],
                    supportAllValues: true,
                },
                heading: {
                    options: [
                        { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                        { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
                        { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
                        { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
                        { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
                        { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
                        { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" },
                    ],
                },
                licenseKey: LICENSE_KEY,
                placeholder: placeholder ?? "",
                table: {
                    contentToolbar: [
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                        "tableProperties",
                        "tableCellProperties",
                    ],
                },
            },
        };
    }, [isLayoutReady]);

    return (
        <Controller
            control={control}
            name={formName}
            render={() => (
                <Box>
                    <InputLabel>
                        {label ?? ""}
                        {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}
                    </InputLabel>
                    {isLayoutReady ? (
                        <Box
                            sx={(theme) => ({
                                border: `1px solid ${isError ? theme.palette.error.main : "transparent"}`,
                            })}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfig}
                                data={elementData}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setValue(formName, data);
                                }}
                                {...rest}
                            />
                        </Box>
                    ) : (
                        <p>Loading editor...</p>
                    )}
                    <FormHelperText error>{isError?.message}</FormHelperText>
                </Box>
            )}
        />
    );
};

export default CKEditorComponent;
