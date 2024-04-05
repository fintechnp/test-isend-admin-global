import isEmpty from "App/helpers/isEmpty";
import { useState, useEffect } from "react";
import cloneDeep from 'lodash/cloneDeep'
import { drawerItems } from "App/data/drawer-items";

const useDrawerItems = () => {
    const [filteredDrawerItems, setFilteredDrawerItems] = useState([...drawerItems]);

    console.log({ drawerItems, filteredDrawerItems });

    const filterItems = (searchQuery) => {
        const searchText = searchQuery.toLowerCase();

        const drawerItems1 =  cloneDeep(drawerItems);

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

    return { drawerItems: filteredDrawerItems, filterItems };
};

export default useDrawerItems;
