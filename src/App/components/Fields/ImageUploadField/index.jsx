import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImagePreview from "./ImagePreview";
import Placeholder from "./Placeholder";
import { renderFromHelper } from "../helpers";

const ImageUploadField = ({
    dragText,
    selectText,
    handleOnDrop,
    input,
    imagefile,
    meta: { error, touched },
    ...rest
}) => {
    const onDrop = useCallback((acceptedFiles) => {
        handleOnDrop(acceptedFiles);
        input.onChange("dfhgdk");
        console.log(acceptedFiles, "loaded files");
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input
                name={input.name}
                // onChange={(files) => input.onChange(files)}
                {...getInputProps()}
                {...input}
                {...rest}
            />
            {isDragActive ? (
                <Placeholder error={error} touched={touched} text={dragText} />
            ) : imagefile && imagefile.length > 0 ? (
                <ImagePreview imagefile={imagefile} />
            ) : (
                <Placeholder
                    error={error}
                    touched={touched}
                    text={selectText}
                />
            )}
            {renderFromHelper({ touched, error })}
        </div>
    );
};

export default ImageUploadField;
