import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Row from "App/components/Row/Row";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Column from "App/components/Column/Column";
import HookForm from "App/core/hook-form/HookForm";
import FormTextArea from "App/core/hook-form/FormTextArea";
import FormTextField from "App/core/hook-form/FormTextField";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

import Modal from "App/components/Modal/Modal";
import FormRadio from "App/core/hook-form/FormRadio";
import SelectMenu from "./profile-setup-forms/SelectMenu";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";

import useUserProfileSetup from "../hooks/useUserProfileSetup";
import SelectSubMenuAndPermissions from "./profile-setup-forms/SelectSubMenuAndPermissions";

export default function ProfileSetupForm(props) {
    const { defaultValues, onSubmit, permissions } = props;

    const { loading } = useSelector((state) => state.update_user_profile_setup);

    const navigate = useNavigate();

    const {
        menus,
        isMenuSearch,
        subMenus,
        filteredSubMenus,
        isSubMenuSearch,
        isOpenPreviewModal,
        toggleOpenPreviewModal,
        methods,
        onSelectAllMenu,
        onSelectAllSubMenu,
        onMenuSelect,
        onMenuAsPermissionSelect,
        onSubMenuSelect,
        onPermissionSelect,
        isMenuAllSelected,
        filterMenu,
        filterSubMenu,
        isSubMenuAllSelected,
    } = useUserProfileSetup({ defaultValues, permissions });

    const {
        getValues,
        setValue,
        formState: { errors },
        reset,
    } = methods;

    const selectedMenuIds = getValues("permission_ids");

    const selectedIds = getValues("permission_ids");

    const handleReset = () => {
        reset({
            permission_ids: [],
            selected_menu_ids: [],
        });
    };

    return (
        <HookForm {...methods} onSubmit={onSubmit}>
            <Row mt={2} px={2} display="flex" justifyContent="space-between">
                <Typography marginY="auto" variant="h6" fontSize="1rem">
                    Group & Permission
                </Typography>
                <Row flex={0} gap={1}>
                    <Button
                        type="button"
                        size="small"
                        variant="outlined"
                        startIcon={<ReplayRoundedIcon />}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        type="button"
                        size="small"
                        variant="contained"
                        startIcon={<RemoveRedEyeRoundedIcon />}
                        onClick={toggleOpenPreviewModal}
                    >
                        Preview
                    </Button>
                </Row>
            </Row>
            <Divider sx={{ mt: 2 }} />
            <Row>
                <Column flex={1} p={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormTextField name="role_name" label="Name" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextArea name="description" label="Description" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormRadio
                                name="is_active"
                                label="Status"
                                options={[
                                    {
                                        label: "Active",
                                        value: true,
                                    },
                                    {
                                        label: "Inactive",
                                        value: false,
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextArea rows={2} name="remarks" label="Remarks" />
                        </Grid>
                    </Grid>
                </Column>
                <Divider orientation="vertical" flexItem />
                <SelectMenu
                    menus={menus}
                    isSearchOn={isMenuSearch}
                    isAllSelected={isMenuAllSelected}
                    selectedIds={getValues("selected_menu_ids")}
                    onSelect={onMenuSelect}
                    onSelectAll={onSelectAllMenu}
                    onSearch={filterMenu}
                    onClear={filterMenu}
                />
                <Divider orientation="vertical" flexItem />
                <SelectSubMenuAndPermissions
                    selectedMenuIds={selectedMenuIds}
                    selectedIds={selectedIds}
                    permissions={filteredSubMenus}
                    onMenuSelect={onMenuAsPermissionSelect}
                    onSubMenuSelect={onSubMenuSelect}
                    onPermissionSelect={onPermissionSelect}
                    isAllSelected={isSubMenuAllSelected}
                    onSelectAll={onSelectAllSubMenu}
                    onSearch={filterSubMenu}
                    onClear={filterSubMenu}
                    isSearchOn={isSubMenuSearch}
                />
            </Row>
            <Row px={4} pb={4} justifyContent="flex-end" gap={2} mt={2}>
                <CancelButton onClick={() => navigate(-1)} disabled={loading} />
                <SubmitButton submitText="Save" submittingText="Saving" isLoading={loading} />
            </Row>
            <Modal title="Preview" open={isOpenPreviewModal} onClose={toggleOpenPreviewModal}>
                <Box sx={{ minWidth: "600px" }}>
                    <SelectSubMenuAndPermissions
                        selectedMenuIds={selectedMenuIds}
                        selectedIds={selectedIds}
                        permissions={subMenus}
                        disableHeader
                        showOnlySelected
                        onSearch={(value) => {}}
                        onClear={() => {}}
                        isSearchOn={false}
                    />
                </Box>
            </Modal>
        </HookForm>
    );
}

ProfileSetupForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    permissions: PropTypes.any,
    defaultValues: PropTypes.any,
};
