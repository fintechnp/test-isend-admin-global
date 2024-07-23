import * as Yup from "yup";
import cloneDeep from "lodash/cloneDeep";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useMemo, useEffect, useCallback } from "react";

import PermissionUtils from "../utils/PermissionUtils";
import isEmpty from "App/helpers/isEmpty";

const schema = Yup.object().shape({
    role_name: Yup.string().required("Required"),
    description: Yup.string().nullable(),
    is_active: Yup.bool().required("Required"),
    remarks: Yup.string().when("is_active", {
        is: false,
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.nullable(),
    }),
});

const useUserProfileSetup = (props) => {
    const { defaultValues, permissions: permissionsData } = props;

    const [menus, setMenus] = useState([...permissionsData]);

    const [isMenuSearch, setIsMenuSearch] = useState(false);

    const [subMenus, setSubMenus] = useState([]);

    const [filteredSubMenus, setFilteredSubMenus] = useState([]);

    const [isSubMenuSearch, setIsSubMenuSearch] = useState(false);

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { watch, setValue } = methods;

    const selectedPermissionIds = watch("permission_ids");

    const selectedMenuIds = watch("selected_menu_ids");

    const [isOpenPreviewModal, setIsPreviewModalOpen] = useState(false);

    const toggleOpenPreviewModal = () => setIsPreviewModalOpen((open) => !open);

    const isMenuAllSelected = useMemo(() => {
        const menuPermissionIds = PermissionUtils.getMenuIds(permissionsData);
        return menuPermissionIds.every((id) => selectedMenuIds.includes(id));
    }, [selectedMenuIds]);

    const isSubMenuAllSelected = useMemo(() => {
        const selectedMenus = permissionsData.filter((menu) => selectedMenuIds.includes(menu.id));
        const ids = PermissionUtils.extractPermissionIds(selectedMenus, null, true);
        if (selectedMenuIds.length <= 0) return false;
        return ids.every((id) => selectedPermissionIds.includes(id));
    }, [selectedMenuIds, selectedPermissionIds]);

    const onSelectAllMenu = () => {
        if (!isMenuAllSelected) {
            setValue("selected_menu_ids", PermissionUtils.getMenuIds(permissionsData));
        } else {
            setValue("selected_menu_ids", []);
            setValue("permission_ids", []);
        }
    };

    const onSelectAllSubMenu = () => {
        if (!isSubMenuAllSelected) {
            const menus = [...permissionsData].filter((menu) => selectedMenuIds.includes(menu.id));
            const ids = PermissionUtils.extractPermissionIds(menus, null, true);
            setValue("permission_ids", ids);
        } else {
            setValue("permission_ids", []);
        }
    };

    const onMenuSelect = (menu) => {
        const menuId = menu.id;
        let menuIds = selectedMenuIds.includes(menuId)
            ? [...selectedMenuIds].filter((id) => id !== menuId)
            : [...selectedMenuIds, menuId];
        setValue("selected_menu_ids", PermissionUtils.removeDuplicates(menuIds));

        if (!menuIds.includes(menuId)) {
            const permissionIds = PermissionUtils.extractPermissionIds([menu], null, true);
            const selectedIds = [...selectedPermissionIds].filter((id) => !permissionIds.includes(id));
            setValue("permission_ids", selectedIds);
        }
    };

    const onMenuAsPermissionSelect = (menu) => {
        const menuId = menu.id;
        let ids = selectedPermissionIds.includes(menuId)
            ? [...selectedPermissionIds].filter((id) => id !== menuId)
            : [...selectedPermissionIds, menuId];
        setValue("permission_ids", PermissionUtils.removeDuplicates(ids));
    };

    const onSubMenuSelect = (subMenu) => {
        const subMenuId = subMenu.id;

        const menu = PermissionUtils.getParent(permissionsData, subMenuId);

        const childPermissionIds = PermissionUtils.extractPermissionIds([subMenu, ...(subMenu?.children ?? [])]);

        const adjacentSubMenuIds = PermissionUtils.extractPermissionIds(
            menu.children.filter((subMenu) => subMenu.id !== subMenuId),
        );

        const isAdjacentSubMenuSelected = adjacentSubMenuIds.some((id) => selectedPermissionIds.includes(id));

        if (!selectedPermissionIds.includes(subMenuId)) {
            const ids = [...childPermissionIds, subMenu.parent_id];
            setValue("permission_ids", PermissionUtils.removeDuplicates([...selectedPermissionIds, ...ids]));
        } else {
            let ids = [...selectedPermissionIds]
                .filter((id) => id !== subMenuId)
                .filter((id) => !childPermissionIds.includes(id));

            if (!isAdjacentSubMenuSelected) {
                ids = ids.filter((id) => id !== menu.id);
            }

            setValue("permission_ids", ids);
        }

        // TODO: on sub menu select, select parent and descendent children
        // TODO: check if other same level is selected before deselecting parent
    };

    const onPermissionSelect = (permission) => {
        const permissionId = permission.id;

        const subMenuId = permission.parent_id;

        const menu = PermissionUtils.getParent(permissionsData, subMenuId);

        const subMenu = PermissionUtils.getParent(permissionsData, permissionId);

        const adjacentPermissionIds = PermissionUtils.extractPermissionIds(
            subMenu.children.filter((p) => p.id !== permissionId),
        );

        const isAdjacentPermissionSelected = adjacentPermissionIds.some((id) => selectedPermissionIds.includes(id));

        const adjacentSubMenuIds = PermissionUtils.extractPermissionIds(
            menu.children.filter((subMenu) => subMenu.id !== subMenuId),
        );

        const isAdjacentSubMenuSelected = adjacentSubMenuIds.some((id) => selectedPermissionIds.includes(id));

        if (!selectedPermissionIds.includes(permissionId)) {
            const ids = [...selectedPermissionIds, permission.id, permission.parent_id, menu.id];
            setValue("permission_ids", PermissionUtils.removeDuplicates([...ids]));
        } else {
            let ids = [...selectedPermissionIds].filter((id) => id !== permissionId);

            if (!isAdjacentPermissionSelected) {
                ids = ids.filter((id) => id !== permission.parent_id);
            }

            if (!isAdjacentSubMenuSelected) {
                ids = ids.filter((id) => id !== menu.id);
            }

            setValue("permission_ids", PermissionUtils.removeDuplicates([...ids]));
        }

        // TODO: on sub menu select, select parent and descendent children
        // TODO: check if other same level is selected before deselecting parent
    };

    const filterMenu = useCallback((query) => {
        if (query) {
            setIsMenuSearch(true);
            setMenus(
                [...permissionsData].filter((menu) => menu.display_name.toLowerCase().includes(query?.toLowerCase())),
            );
        } else {
            setIsMenuSearch(false);
            setMenus([...permissionsData]);
        }
    }, []);

    const memoizedSubMenus = useMemo(
        () =>
            [...permissionsData]
                .filter((menu) => selectedMenuIds.includes(menu.id))
                .flatMap((menu) => (menu.children?.length > 0 ? menu.children : [menu])),
        [permissionsData, selectedMenuIds],
    );

    const filterSubMenu = useCallback(
        (query) => {
            if (!isEmpty(query)) {
                setIsSubMenuSearch(true);
                const filteredSubMenus = cloneDeep(subMenus).filter((subMenu) => {
                    if (subMenu.display_name.toLowerCase().includes(query.toLowerCase())) {
                        return true;
                    }
                    const matchChildren =
                        subMenu?.children &&
                        subMenu?.children.some((child) => child.display_name.toLowerCase().includes(query));
                    if (matchChildren) {
                        subMenu.children = subMenu.children.filter((child) =>
                            child.display_name.toLowerCase().includes(query),
                        );
                        return true;
                    }
                    return false;
                });
                setFilteredSubMenus([...filteredSubMenus]);
            } else {
                setIsSubMenuSearch(false);
                setFilteredSubMenus(memoizedSubMenus);
            }
        },
        [subMenus, permissionsData],
    );

    useEffect(() => {
        setMenus([...permissionsData]);
    }, [permissionsData]);

    useEffect(() => {
        setSubMenus(memoizedSubMenus);
        setFilteredSubMenus(memoizedSubMenus);
    }, [memoizedSubMenus]);

    return {
        methods,
        menus,
        isMenuSearch,
        subMenus,
        filteredSubMenus,
        isSubMenuSearch,
        isOpenPreviewModal,
        setIsPreviewModalOpen,
        toggleOpenPreviewModal,
        onSelectAllMenu,
        onSelectAllSubMenu,
        onMenuSelect,
        onMenuAsPermissionSelect,
        onSubMenuSelect,
        onPermissionSelect,
        isMenuAllSelected,
        isSubMenuAllSelected,
        filterMenu,
        filterSubMenu,
    };
};

export default useUserProfileSetup;
