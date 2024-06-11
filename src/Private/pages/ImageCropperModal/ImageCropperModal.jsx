import Box from "@mui/material/Box";
import Cropper from "react-easy-crop";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";

import getCropperImg from "./getCropperImg";
import Button from "App/components/Button/Button";

export default function ImageCropperModal({ onCropComplete, imageSrc, onCancel, onSubmit, loading }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(2);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSubmit = async () => {
        if (imageSrc && croppedAreaPixels) {
            const targetWidth = 300;
            const targetHeight = 300;
            const croppedImage = await getCropperImg(imageSrc, croppedAreaPixels, targetWidth, targetHeight);

            if (typeof croppedImage === "string") {
                const blob = await fetch(croppedImage).then((r) => r.blob());
                onSubmit?.(blob);
            } else {
                console.error("Failed to crop the image.");
            }
        }
    };

    return (
        <Box sx={{ width: "400px" }}>
            <Box>
                {imageSrc && (
                    <>
                        <Box position="relative" width="100%" height={400} bgcolor="#333">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                zoomWithScroll={true}
                                showGrid={true}
                                onCropChange={setCrop}
                                onCropComplete={handleCropComplete}
                                onZoomChange={setZoom}
                            />
                        </Box>
                        <Slider
                            value={zoom}
                            min={1}
                            max={4}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e, zoom) => setZoom(Number(zoom))}
                            style={{ marginTop: 20 }}
                        />
                    </>
                )}
            </Box>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="text" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
                    Upload
                </Button>
            </div>
        </Box>
    );
}
