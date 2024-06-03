import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import MuiList from "@mui/material/List";
import Divider from "@mui/material/Divider";

import MainButton from "./components/MainButton";
import MainHeader from "./components/MainHeader";

const List = styled(MuiList)(({ theme, open }) => ({
    ...(open && {
        padding: "8px",
    }),
    ...(!open && {
        margin: "0px",
    }),
}));

function DrawerList(props) {
    const { items, open, isSearching } = props;
    const [selectedKey, setSelectedKey] = React.useState("");
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (key) => {
        setSelectedKey(key);
    };

    return (
        <List open={open}>
            {items.map((item, index) =>
                item.sub ? (
                    <MainButton
                        key={index}
                        open={open}
                        item={item}
                        index={index}
                        selectedIndex={selectedIndex}
                        selectedkey={selectedKey}
                        setSelectedIndex={setSelectedIndex}
                        handleListItemClick={handleListItemClick}
                        isSearching={isSearching}
                    />
                ) : (
                    <MainHeader
                        key={index}
                        open={open}
                        item={item}
                        index={index}
                        selectedkey={selectedKey}
                        setSelectedIndex={setSelectedIndex}
                        handleListItemClick={handleListItemClick}
                    />
                ),
            )}
            <Divider
                sx={{
                    margin: "8px 0px",
                    borderColor: "#ffffff",
                    opacity: 0.25,
                }}
            />
        </List>
    );
}

export default DrawerList;
