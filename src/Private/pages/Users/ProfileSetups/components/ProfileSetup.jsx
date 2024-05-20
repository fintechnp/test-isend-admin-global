import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Row from "App/components/Row/Row";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Column from "App/components/Column/Column";
import LabelValue from "App/components/Forms/LabelValue";

import PermissionUtils from "../utils/PermissionUtils";
import SelectSubMenuAndPermissions from "./profile-setup-forms/SelectSubMenuAndPermissions";

export default function ProfileSetup(props) {
    const { role } = props;

    console.log(role);

    const menus = PermissionUtils.getMenuIds(role?.menus ?? []);

    const subMenus = PermissionUtils.getSubMenuWithPermissions(role?.menus ?? []);

    return (
        <>
            <Row mt={2} px={2} display="flex" justifyContent="space-between">
                <Typography marginY="auto" variant="h6" fontSize="1rem">
                    Group & Permission
                </Typography>
            </Row>
            <Divider sx={{ mt: 2 }} />
            <Row>
                <Column flex={1} p={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <LabelValue label="Name" value={role?.role_name} />
                        </Grid>
                        <Grid item xs={12}>
                            <LabelValue label="Description" value={role?.description} />
                        </Grid>
                        <Grid item xs={12}>
                            <LabelValue label="Status" value={role?.is_active ? "Active" : "Inactive"} />
                        </Grid>
                        <Grid item xs={12}>
                            <LabelValue label="Remarks" value={role?.remarks} />
                        </Grid>
                    </Grid>
                </Column>
                <Divider orientation="vertical" flexItem />
                <Column flex={1}>
                    <Row px={2}>
                        <Typography flex={1} marginY="auto">
                            Menu
                        </Typography>
                    </Row>
                    <Column px={2}>
                        <Box
                            sx={{
                                maxHeight: "400px",
                                overflowY: "scroll",
                                background: (theme) => theme.palette.grey[100],
                                borderRadius: "4px",
                            }}
                        >
                            {/* <List disablePadding>
                                {menus.map((menu, index) => {
                                    const selected = selectedIds.includes(menu.id);
                                    return (
                                        <ListItem key={menu.id} disablePadding>
                                            <ListItemButton selected={selected} onClick={() => onSelect(menu)}>
                                                <ListItemText primary={menu.display_name} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List> */}
                        </Box>
                    </Column>
                </Column>
                <Divider orientation="vertical" flexItem />
                <SelectSubMenuAndPermissions
                    selectedMenuIds={PermissionUtils.extractPermissionIds(menus)}
                    selectedIds={PermissionUtils.extractPermissionIds(menus, null, true)}
                    permissions={subMenus}
                    onMenuSelect={() => {}}
                    onSubMenuSelect={() => {}}
                    onPermissionSelect={() => {}}
                    isAllSelected
                    onSelectAll={() => {}}
                />
            </Row>
        </>
    );
}

ProfileSetup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    permissions: PropTypes.any,
    defaultValues: PropTypes.any,
};
