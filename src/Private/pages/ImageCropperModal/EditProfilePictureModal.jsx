import React from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import DesktopMacRoundedIcon from "@mui/icons-material/DesktopMacRounded";

import Webcam from "react-webcam";
import Row from "App/components/Row/Row";
import Modal from "App/components/Modal/Modal";
import ImageCropperModal from "./ImageCropperModal";
import isEmpty from "App/helpers/isEmpty";

export default function EditProfilePictureModal({ open, onClose, id, handleUpload, loading }) {
    const [importFrom, setImportFrom] = React.useState(null);
    const [imageSrc, setImageSrc] = React.useState(null);
    const [croppedImageSrc, setCroppedImageSrc] = React.useState(null);
    const inputFileRef = React.useRef(null);

    const onFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setImportFrom("desktop");
                    setImageSrc(reader.result);
                    setCroppedImageSrc(null);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setImportFrom(null);
        setCroppedImageSrc(null);
        setImageSrc(null);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} title="Edit Profile Picture">
            {isEmpty(importFrom) ? (
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton onClick={() => setImportFrom("webcam")}>
                        <ListItemIcon>
                            <CameraAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Camera" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => {
                            inputFileRef.current?.click();
                        }}
                    >
                        <ListItemIcon>
                            <DesktopMacRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Choose Photo" />
                    </ListItemButton>
                </List>
            ) : importFrom === "webcam" && isEmpty(imageSrc) ? (
                <Webcam height={400} width={400} videoConstraints={{ facingMode: "user" }}>
                    {({ getScreenshot }) => (
                        <Row justifyContent="space-between" mt={2}>
                            <Button variant="text" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button
                                disabled={loading}
                                variant="contained"
                                onClick={() => {
                                    setImageSrc(getScreenshot?.());
                                }}
                            >
                                Capture
                            </Button>
                        </Row>
                    )}
                </Webcam>
            ) : (
                <ImageCropperModal onCancel={handleCancel} imageSrc={imageSrc} onSubmit={handleUpload} />
            )}
            <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{ display: "none" }}
            />
        </Modal>
    );
}
