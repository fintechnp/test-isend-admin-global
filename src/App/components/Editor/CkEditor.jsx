import React, { useEffect, useState } from "react";

const CKEditorComponent = ({ elementData, ...rest }) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [CKEditor, setCKEditor] = useState(null);
    const [ClassicEditor, setClassicEditor] = useState(null);

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
        <div>
            {editorLoaded ? (
                <CKEditor
                    editor={ClassicEditor}
                    data={elementData}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setValue("element_content", data);
                    }}
                    {...rest}
                />
            ) : (
                <p>Loading editor...</p>
            )}
        </div>
    );
};

export default CKEditorComponent;
