import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import LabelValue from "App/components/Forms/LabelValue";
import ListItemButton from "@mui/material/ListItemButton";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import { userProfileSetupActions } from "../store";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.content}`]: {
        padding: theme.spacing(0.5, 1),
        margin: theme.spacing(0.2, 0),
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        "& .close": {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

export default function ViewUserProfileSetupModal({ userProfileSetupId, onClose }) {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const { loading, response } = useSelector((state) => state.get_user_profile_setup_by_id);

    const data = response?.data?.role_response;

    useEffect(() => {
        if (isOpen) dispatch(userProfileSetupActions.get_user_profile_setup_by_id(userProfileSetupId));
    }, [userProfileSetupId, isOpen]);

    return (
        <>
            <ListItemButton onClick={() => setIsOpen(true)}>View</ListItemButton>
            <Modal
                title="User Profile Setup"
                open={isOpen}
                onClose={() => (setIsOpen(false), onClose?.())}
                sx={{ minWidth: "600px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2} lg={3} xl={4}>
                        <LabelValue label="Name" value={data?.role_name} isLoading={loading} />
                    </Grid>
                    <Grid item xs={12} md={2} lg={3} xl={4}>
                        <LabelValue label="Description" value={data?.description} isLoading={loading} />
                    </Grid>
                    <Grid item xs={12} md={2} lg={3} xl={4}>
                        <LabelValue label="Is Active ?" value={data?.is_active ? "Yes" : "No"} isLoading={loading} />
                    </Grid>
                    <Grid item xs={12} md={2} lg={3} xl={4}>
                        <LabelValue label="Remarks" value={data?.remarks} isLoading={loading} />
                    </Grid>
                    {data?.menus?.length > 0 && !loading && (
                        <Grid item xs={12}>
                            <SimpleTreeView
                                aria-label="customized"
                                defaultExpandedItems={["main"]}
                                sx={{ overflowX: "hidden", minHeight: 270, flexGrow: 1 }}
                            >
                                <CustomTreeItem itemId="main" label="" onClick={() => {}}>
                                    {data?.menus?.map((menu) => (
                                        <CustomTreeItem itemId={menu.id} label={menu.display_name}>
                                            {menu?.children?.length > 0
                                                ? menu?.children?.map((subMenu) => (
                                                      <CustomTreeItem itemId={subMenu.id} label={subMenu.display_name}>
                                                          {subMenu?.children?.length ? (
                                                              <Grid container>
                                                                  {subMenu?.children?.map((permission) => (
                                                                      <Grid item xs={3}>
                                                                          <CheckRoundedIcon fontSize="0.8rem" />{" "}
                                                                          {permission.display_name}
                                                                      </Grid>
                                                                  ))}
                                                              </Grid>
                                                          ) : undefined}
                                                      </CustomTreeItem>
                                                  ))
                                                : undefined}
                                        </CustomTreeItem>
                                    ))}
                                </CustomTreeItem>
                            </SimpleTreeView>
                        </Grid>
                    )}
                    {/* <Grid item xs={12}>
                        {data?.menus?.map((d) => (
                            <Grid container>
                                <Grid item xs={12}>
                                    {d.display_name}
                                </Grid>
                                <Grid item xs={12} pl={2}>
                                    <Grid container>
                                        {d.children.map((d) => (
                                            <>
                                                <Grid item xs={12}>
                                                    <>{d.display_name}</>
                                                </Grid>
                                                <Grid item xs={12} pl={2}>
                                                    <Grid container>
                                                        {d.children.map((d) => (
                                                            <Grid item xs={1}>
                                                                <>{d.display_name}</>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            </>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid> */}
                </Grid>
            </Modal>
        </>
    );
}

ViewUserProfileSetupModal.propTypes = {
    userProfileSetupId: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};
