import React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import DesktopMacRoundedIcon from "@mui/icons-material/DesktopMacRounded";

import Webcam from "react-webcam";
import Row from "App/components/Row/Row";
import isEmpty from "App/helpers/isEmpty";
import Modal from "App/components/Modal/Modal";

import ImageCropperModal from "./ImageCropperModal";
import { UploadProfilePictureActions } from "../Auth/MyAccount/store";

function EditProfilePictureModal({ open, onClose, id, handleUpload, loading }) {
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
        <Modal open={open} onClose={handleCancel} title="Edit Profile Picture">
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
                <ImageCropperModal
                    onCancel={handleCancel}
                    imageSrc={imageSrc}
                    onSubmit={handleUpload}
                    loading={loading}
                />
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

EditProfilePictureModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default EditProfilePictureModal;
