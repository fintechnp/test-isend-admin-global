import { useState, useEffect } from "react";
import { drawerItems } from "App/data/drawer-items";

const useDrawerItems = (searchQuery) => {
    const [filteredDrawerItems, setFilteredDrawerItems] = useState(drawerItems);

    useEffect(() => {
        const filterItems = () => {
            return [...drawerItems].filter((item) => {
                const searchText = searchQuery.toLowerCase();
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
        };

        const filteredItems = filterItems();
        setFilteredDrawerItems(filteredItems);
    }, [searchQuery]);

    return { drawerItems: filteredDrawerItems };
};

export default useDrawerItems;
