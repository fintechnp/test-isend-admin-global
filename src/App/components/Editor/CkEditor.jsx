import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import React, { useEffect, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, get, useFormContext } from "react-hook-form";

const CKEditorComponent = ({ elementData, required, name, label, ...rest }) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [CKEditor, setCKEditor] = useState(null);
    const [ClassicEditor, setClassicEditor] = useState(null);

    const {
        setValue,
        formState: { errors },
        control,
    } = useFormContext();

    const formName = name ?? "element_content";

    const isError = get(errors, formName);

    useEffect(() => {
        const loadEditor = async () => {
            const { CKEditor } = await import("@ckeditor/ckeditor5-react");
            const ClassicEditor = await import("@ckeditor/ckeditor5-build-classic");
            setCKEditor(() => CKEditor);
            setClassicEditor(() => ClassicEditor.default);
            setEditorLoaded(true);
        };

        loadEditor();
    }, []);

    return (
        <Controller
            control={control}
            name={formName}
            render={() => {
                return (
                    <Box>
                        <InputLabel>
                            {<>{label ?? ""}</>}
                            {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}
                        </InputLabel>
                        {editorLoaded ? (
                            <Box
                                sx={(theme) => ({
                                    border: `1px solid ${isError ? theme.palette.error.main : "transparent"}`,
                                })}
                            >
                                <CKEditor
                                    editor={ClassicEditor}
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
                        <FormHelperText error={true}>{isError?.message}</FormHelperText>
                    </Box>
                );
            }}
        />
    );
};

export default CKEditorComponent;
