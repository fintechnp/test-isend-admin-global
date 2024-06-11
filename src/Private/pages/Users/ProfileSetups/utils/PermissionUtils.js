export const PermissionType = {
    MENU: "MENU",
    SUBMENU: "SUB_MENU",
    PERMISSION: "PERMISSION",
};

class PermissionUtils {
    /**
     * Recursively extract permission ids based on type
     * @param {Array} permissions - Array of permission objects
     * @param {string|null} targetType - Type of permission to extract ids for - MENU, SUBMENU, PERMISSION
     * @param {boolean} enableNested - Flag to enable extraction of nested permissions
     * @returns {Array} - Array of extracted ids
     */
    extractPermissionIds(permissions = [], targetType = null, enableNested = false) {
        let ids = [];

        function traversePermissions(permissions) {
            for (let permission of permissions) {
                if (permission.type === targetType || targetType === null) {
                    ids.push(permission.id);
                }
                if (enableNested && permission.children) {
                    traversePermissions(permission.children);
                }
            }
        }

        traversePermissions(permissions);
        return this.removeDuplicates(ids);
    }

    /**
     * Recursively extract permission names
     * @param {Array} permissions - Array of permission objects
     * @returns {Array} - Array of extracted names
     */
    extractPermissionNames(permissions = []) {
        let names = [];

        function traversePermissions(permissions) {
            for (let permission of permissions) {
                names.push(permission.name);
                if (permission.children) {
                    traversePermissions(permission.children);
                }
            }
        }

        traversePermissions(permissions);

        return this.removeDuplicates(names);
    }

    /**
     * Get menu ids from permissions
     * @param {Array} permissions - Array of permission objects
     * @param {boolean} enableNested - Flag to enable extraction of nested permissions
     * @returns {Array} - Array of menu ids
     */
    getMenuIds(permissions = [], enableNested = false) {
        return this.extractPermissionIds(permissions, PermissionType.MENU, enableNested);
    }

    /**
     * Get submenu ids from permissions
     * @param {Array} permissions - Array of permission objects
     * @param {boolean} enableNested - Flag to enable extraction of nested permissions
     * @returns {Array} - Array of submenu ids
     */
    getSubMenuIds(permissions = [], enableNested = false) {
        return this.extractPermissionIds(permissions, PermissionType.SUBMENU, enableNested);
    }

    /**
     * Get permission ids from permissions
     * @param {Array} permissions - Array of permission objects
     * @param {boolean} enableNested - Flag to enable extraction of nested permissions
     * @returns {Array} - Array of permission ids
     */
    getPermissionIds(permissions = [], enableNested = false) {
        return this.extractPermissionIds(permissions, PermissionType.PERMISSION, enableNested);
    }

    getMenuIdsWithDecedents() {
        //
    }

    /**
     * Get submenus with associated permissions from permissions
     * @param {Array} permissions - Array of permission objects
     * @returns {Array} - Array of submenus with associated permissions
     */
    getSubMenuWithPermissions(permissions = []) {
        function extractSubmenusWithPermissions(permissions) {
            const subMenusWithPermissions = [];

            for (const permission of permissions) {
                if (permission.type === PermissionType.SUBMENU) {
                    subMenusWithPermissions.push(permission);
                }

                if (permission.children && permission.children.length > 0) {
                    extractSubmenusWithPermissions(permission.children);
                }
            }

            return subMenusWithPermissions;
        }

        // Start the extraction process from the top-level of permissions
        return extractSubmenusWithPermissions(permissions);
    }

    /**
     * Remove duplicate ids from an array
     * @param {Array} ids - Array of ids
     * @returns {Array} - Array of unique ids
     */
    removeDuplicates(ids = []) {
        return [...new Set(ids)];
    }

    /**
     * Check if other submenus from the current parent menu have selected permissions
     * @param {Array} permissions - Array of permission objects
     * @param {Array} selectedPermissionIds - Array of selected permission ids
     * @param {number} menuId - ID of the parent menu
     * @param {number} skipSubMenuId - ID of the submenu to skip from consideration
     * @returns {boolean} - Whether other submenus have selected permissions
     */
    isOtherSubMenuSelectedFromCurrentParent(permissions = [], selectedPermissionIds = [], menuId, skipSubMenuId) {
        const parentMenu = permissions.find((menu) => menu.id === menuId);

        if (parentMenu && parentMenu.children) {
            // Filter out the submenu to skip
            const otherSubMenus = parentMenu.children.filter((subMenu) => subMenu.id !== skipSubMenuId);

            for (const subMenu of otherSubMenus) {
                if (subMenu.children) {
                    // Check if any permission in the submenu is selected
                    for (const permission of subMenu.children) {
                        if (selectedPermissionIds.includes(permission.id)) {
                            return true; // Found selected permission in another submenu
                        }
                    }
                }
            }
        }

        return false; // No selected permissions found in other submenus
    }

    /**
     * Find the parent permission object of a given permission ID within nested permissions
     * @param {Array} permissions - Array of permission objects (hierarchical structure)
     * @param {number} permissionId - ID of the permission to find the parent for
     * @returns {Object|null} - Parent permission object or null if not found
     */
    getParent(permissions, permissionId) {
        function findParent(permissions, targetId, parent = null) {
            for (const permission of permissions) {
                if (permission.id === targetId) {
                    return parent; // Found the parent of the target permission
                }
                if (permission.children && permission.children.length > 0) {
                    const foundParent = findParent(permission.children, targetId, permission);
                    if (foundParent) {
                        return foundParent; // Forward the parent object up the call stack
                    }
                }
            }
            return null; // Target permission ID not found in this branch
        }

        // Start the recursive search from the top-level of permissions
        return findParent(permissions, permissionId);
    }


}

export default new PermissionUtils();
