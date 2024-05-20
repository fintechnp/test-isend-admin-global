import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import SearchTextField from "App/components/Fields/SearchTextField";
import PermissionUtils from "../../utils/PermissionUtils";
import { menuItemPropTypes } from "./SelectSubMenuAndPermissions";

export default function SelectMenu(props) {
    const {
        isAllSelected = false,
        selectedIds,
        onSelect,
        onSelectAll,
        menus = [],
        onSearch,
        onClear,
        isSearchOn,
    } = props;

    return (
        <Column flex={1}>
            <Row px={2}>
                <Typography flex={1} marginY="auto">
                    Menu
                </Typography>
                <FormControlLabel
                    checked={isAllSelected}
                    value={isAllSelected}
                    control={<Checkbox />}
                    label="All"
                    onChange={onSelectAll}
                />
            </Row>
            <Column px={2}>
                <SearchTextField debounceTime={0} onChange={onSearch} onClear={onClear} />
                {isSearchOn && menus.length <= 0 && (
                    <Box mt={1}>
                        <Typography color="grey.600">No Results!</Typography>
                    </Box>
                )}
                <Box
                    sx={{
                        maxHeight: "400px",
                        overflowY: "scroll",
                        background: (theme) => theme.palette.grey[100],
                        borderRadius: "4px",
                    }}
                >
                    <List disablePadding>
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
                    </List>
                </Box>
            </Column>
        </Column>
    );
}

SelectMenu.propTypes = {
    isAllSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    menus: PropTypes.arrayOf(menuItemPropTypes).isRequired,
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    isSearchOn: PropTypes.bool,
};
