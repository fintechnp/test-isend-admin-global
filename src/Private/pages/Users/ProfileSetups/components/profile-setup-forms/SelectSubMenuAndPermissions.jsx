import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import SearchTextField from "App/components/Fields/SearchTextField";

import { PermissionType } from "../../utils/PermissionUtils";

function SelectSubMenuAndPermissions(props) {
    const {
        selectedIds = [],
        permissions = [],
        onMenuSelect,
        onSubMenuSelect,
        onPermissionSelect,
        isAllSelected = false,
        onSelectAll,
        disableHeader = false,
        showOnlySelected = false,
        onSearch,
        onClear,
        isSearchOn,
    } = props;

    const handleChange = (permission) => {
        if (permission.type === PermissionType.MENU) onMenuSelect?.(permission);
        if (permission.type === PermissionType.SUBMENU) onSubMenuSelect?.(permission);
        if (permission.type === PermissionType.PERMISSION) onPermissionSelect?.(permission);
    };

    return (
        <Column flex={1}>
            {!disableHeader && (
                <Row px={2}>
                    <Typography flex={1} marginY="auto">
                        Sub Menus / Roles
                    </Typography>
                    <FormControlLabel
                        checked={isAllSelected}
                        value={isAllSelected}
                        control={<Checkbox />}
                        label="All"
                        onChange={() => onSelectAll(isAllSelected)}
                    />
                </Row>
            )}
            <Column px={2}>
                {!disableHeader && <SearchTextField debounceTime={0} onChange={onSearch} onClear={onClear} />}
                {isSearchOn && permissions.length <= 0 && (
                    <Box mt={1}>
                        <Typography color="grey.600">No Results!</Typography>
                    </Box>
                )}
                <Box
                    sx={{
                        maxHeight: "calc(100svh - 350px)",
                        overflowY: "scroll",
                        background: (theme) => theme.palette.grey[100],
                        borderRadius: "4px",
                    }}
                >
                    {permissions.map((subMenu) => {
                        if (subMenu.children) {
                            return (
                                <ListItem
                                    key={subMenu.id}
                                    disablePadding
                                    sx={{
                                        ...(showOnlySelected && !selectedIds.includes(subMenu.id)
                                            ? {
                                                  display: "none",
                                              }
                                            : {}),
                                    }}
                                >
                                    <Column>
                                        <ListItemButton sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}>
                                            <FormControlLabel
                                                onClick={(e) => e.stopPropagation()}
                                                control={
                                                    <Checkbox
                                                        checked={selectedIds.includes(subMenu.id)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={() => handleChange(subMenu)}
                                                    />
                                                }
                                                label={subMenu.display_name}
                                            />
                                        </ListItemButton>
                                        <Grid container px={6}>
                                            {subMenu.children.map((permission) => (
                                                <Grid
                                                    item
                                                    xs={6}
                                                    key={permission.id}
                                                    sx={{
                                                        ...(showOnlySelected && !selectedIds.includes(permission.id)
                                                            ? {
                                                                  display: "none",
                                                              }
                                                            : {}),
                                                    }}
                                                >
                                                    <Row alignItems="center">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={selectedIds.includes(permission.id)}
                                                                    onChange={() => handleChange(permission)}
                                                                />
                                                            }
                                                            label={permission.display_name}
                                                        />
                                                    </Row>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Column>
                                </ListItem>
                            );
                        }

                        return (
                            <ListItem
                                key={subMenu.id}
                                disablePadding
                                sx={{
                                    ...(showOnlySelected && !selectedIds.includes(subMenu.id)
                                        ? {
                                              display: "none",
                                          }
                                        : {}),
                                }}
                            >
                                <ListItemButton sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}>
                                    <FormControlLabel
                                        onClick={(e) => e.stopPropagation()}
                                        control={
                                            <Checkbox
                                                checked={selectedIds.includes(subMenu.id)}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={() => handleChange(subMenu)}
                                            />
                                        }
                                        label={subMenu.display_name}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </Box>
            </Column>
        </Column>
    );
}

export const menuItemPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    display_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    parent_id: PropTypes.number,
    type: PropTypes.string.isRequired,
    has_permission: PropTypes.bool,
    children: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            display_name: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            url: PropTypes.string,
            parent_id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            has_permission: PropTypes.bool,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    display_name: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    url: PropTypes.string,
                    parent_id: PropTypes.number.isRequired,
                    type: PropTypes.string.isRequired,
                }),
            ),
        }),
    ),
});

SelectSubMenuAndPermissions.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    selectedMenuIds: PropTypes.arrayOf(PropTypes.number),
    permissions: PropTypes.arrayOf(menuItemPropTypes),
    onMenuSelect: PropTypes.func,
    onSubMenuSelect: PropTypes.func,
    onPermissionSelect: PropTypes.func,
    isAllSelected: PropTypes.bool,
    onSelectAll: PropTypes.func,
    disableHeader: PropTypes.bool,
    showOnlySelected: PropTypes.bool,
    onSearch: PropTypes.func,
    onClear: PropTypes.func,
    isSearchOn: PropTypes.bool,
};

export default SelectSubMenuAndPermissions;
