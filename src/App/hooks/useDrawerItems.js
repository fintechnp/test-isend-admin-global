import isEmpty from "App/helpers/isEmpty";
import { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useSelector } from "react-redux";
import { PermissionType } from "Private/pages/Users/ProfileSetups/utils/PermissionUtils";

const useDrawerItems = () => {
    const { response, loading: isLoading } = useSelector((state) => state.get_user_menus_and_permissions);

    const [drawerItems, setDrawerItems] = useState([]);

    const [filteredDrawerItems, setFilteredDrawerItems] = useState([]);

    const filterItems = (searchQuery) => {
        const searchText = searchQuery.toLowerCase();

        const drawerItems1 = cloneDeep(drawerItems);

        const filteredItems = drawerItems1.filter((item) => {
            const itemText = item.text.toLowerCase();

            const matchParent = itemText.includes(searchText);
            const matchChildren =
                item.children && item.children.some((child) => child.text.toLowerCase().includes(searchText));

            if (matchParent) {
                return true;
            }

            if (matchChildren) {
                item.children = item.children.filter((child) => child.text.toLowerCase().includes(searchText));
                return true;
            }

            return false;
        });
        if (isEmpty(searchQuery)) {
            setFilteredDrawerItems([...drawerItems]);
        } else {
            setFilteredDrawerItems(filteredItems);
        }
    };

    const transformMenuData = (permissions = []) => {
        const transformedData = [];

        function transform(permission) {
            return {
                key: permission.id,
                text: permission.display_name,
                icon: permission.icon,
                is_active: permission.is_active,
                sub: permission.type === PermissionType.MENU ? (permission?.children?.length ?? 0) > 0 : false,
                ...(permission.url
                    ? {
                          path: permission.url,
                      }
                    : {}),
                ...((permission?.children?.length ?? 0) < 0
                    ? {
                          url: permission.path,
                      }
                    : {}),
            };
        }

        for (let menu of permissions) {
            const transformed = transform(menu);
            if (transformed.sub) {
                transformed.children = [...(menu?.children ?? [])]
                    .filter((m) => !isEmpty(m.url))
                    ?.filter((item) => item?.is_active)
                    .map((a) => transform(a));
            }

            transformedData.push(transformed);
        }

        return transformedData;
    };

    useEffect(() => {
        const data = response?.data?.role_response?.menus?.filter((item) => item?.is_active) ?? [];
        if (data.length <= 0) return;
        const menus = transformMenuData(data);
        setDrawerItems(menus);
        setFilteredDrawerItems(menus);
    }, [response]);

    return {
        filteredDrawerItems,
        drawerItems,
        filterItems,
        isLoading,
    };
};

export default useDrawerItems;
