import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import MuiList from "@mui/material/List";
import Divider from "@mui/material/Divider";

import MainButton from "./components/MainButton";
import MainHeader from "./components/MainHeader";
import { AuthContext } from "../../auth";

const List = styled(MuiList)(({ theme, open }) => ({
    ...(open && {
        padding: "8px",
        // margin: "0px 4px",
    }),
    ...(!open && {
        margin: "0px",
    }),
    "& .MuiTooltip-popper": {
        margin: "12px",
        background: "red",
    },
}));

function DrawerList(props) {
    const { items, open } = props;
    const { currentUser } = useContext(AuthContext);
    const [selectedkey, setSelectedKey] = React.useState("");
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
                        selectedkey={selectedkey}
                        setSelectedIndex={setSelectedIndex}
                        handleListItemClick={handleListItemClick}
                    />
                ) : (
                    <MainHeader
                        key={index}
                        open={open}
                        item={item}
                        index={index}
                        selectedkey={selectedkey}
                        setSelectedIndex={setSelectedIndex}
                        handleListItemClick={handleListItemClick}
                    />
                )
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
