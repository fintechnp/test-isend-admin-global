import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "App/components/Modal/Modal";
import SelectSubMenuAndPermissions, { menuItemPropTypes } from "./profile-setup-forms/SelectSubMenuAndPermissions";

export default function PreviewSelectedPermissionModal({ isOpen = false, onClose, permissions = [] }) {
    return (
        <Modal title="Preview" open={isOpen} onClose={onClose}>
            <Box>
                <SelectSubMenuAndPermissions
                    isAllSelected={false}
                    onMenuSelect={() => {}}
                    onPermissionSelect={() => {}}
                    permissions={permissions}
                    
                />
            </Box>
        </Modal>
    );
}

PreviewSelectedPermissionModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    permissions: PropTypes.arrayOf(menuItemPropTypes).isRequired,
    selectedPermissionIds: PropTypes.arrayOf(PropTypes.number),
};
