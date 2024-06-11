import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImagePreview from "./ImagePreview";
import Placeholder from "./Placeholder";
import { renderFromHelper } from "../helpers";

const ImageUploadField = ({ dragText, selectText, handleOnDrop, input, imagefile, meta: { error, touched } }) => {
    const onDrop = useCallback((acceptedFiles) => {
        handleOnDrop(acceptedFiles);
        input.onChange(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Placeholder error={error} touched={touched} text={dragText} />
            ) : imagefile && imagefile.length > 0 ? (
                <ImagePreview imagefile={imagefile} />
            ) : (
                <Placeholder error={error} touched={touched} text={selectText} />
            )}
            {renderFromHelper({ touched, error })}
        </div>
    );
};

export default ImageUploadField;
