import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Delete } from "App/components";
import Table, { TablePagination, TableSwitch } from "App/components/Table";

import bannerActions from "Private/features/banners/bannerActions";
import TextButton from "App/components/Button/TextButton";
import Modal from "App/components/Modal/Modal";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

const initialState = {
    page_number: 1,
    page_size: 15,
};

const Banners = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: data, loading: isLoading } = useSelector((state) => state.get_banner_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_banner);

    const { success: isAddSuccess } = useSelector((state) => state.add_banner);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_banner);

    const [image, setImage] = useState({
        type: "", // mobile, web
        url: "",
    });

    useEffect(() => {
        dispatch(bannerActions.get_banners(filterSchema));
        dispatch({ type: "DELETE_BANNER_RESET" });
    }, [dispatch, filterSchema, isDeleting, isAddSuccess, isDeleteSuccess, isUpdateSuccess]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "banner_id",
            },
            {
                header: "Banner Name",
                accessorKey: "banner_name",
            },
            {
                header: "Mobile Banner Image",
                accessorKey: "link",
                cell: ({ row }) => (
                    <img
                        src={row?.original?.link}
                        style={{ height: "30px", width: "auto", cursor: "pointer" }}
                        alt="banner_mobile"
                        onClick={() =>
                            setImage({
                                type: "mobile",
                                url: row?.original?.link,
                            })
                        }
                    />
                ),
            },
            {
                header: "Web Banner Image",
                accessorKey: "weblink",
                cell: ({ row }) => (
                    <img
                        src={row?.original?.weblink}
                        style={{ height: "30px", width: "auto", cursor: "pointer" }}
                        alt="banner_web"
                        onClick={() =>
                            setImage({
                                type: "web",
                                url: row?.original?.weblink,
                            })
                        }
                    />
                ),
            },
            {
                header: "Status",
                accessorKey: "is_active",
                width: 120,
                cell: ({ row }) => (
                    <TableSwitch
                        value={row?.original?.is_active}
                        dataId={row?.original?.banner_id}
                        handleStatus={handleStatus}
                    />
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessorKey: "show",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Tooltip title="Edit Banner" arrow>
                            <IconButton
                                onClick={() =>
                                    dispatch({
                                        type: "OPEN_UPDATE_BANNER_MODAL",
                                        payload: row.original,
                                    })
                                }
                            >
                                <EditOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Delete
                            id={row.original.banner_id}
                            handleDelete={handleDelete}
                            loading={isDeleting}
                            tooltext="Delete Banner"
                        />
                    </Box>
                ),
            },
        ],
        [],
    );

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_number: 1,
            page_size: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleDelete = (id) => {
        dispatch(bannerActions.delete_banner(id));
    };

    const handleStatus = useCallback((is_active, id) => {
        dispatch(bannerActions.update_banner_status(id, { is_active: is_active }));
    }, []);

    return (
        <>
            <Modal open={!!image?.url} onClose={() => setImage(undefined)}>
                <Box sx={{ padding: (theme) => theme.spacing(3, 2) }}>
                    {image?.type === "web" ? (
                        <img src={image?.url} style={{ width: "600px", height: "200px" }} />
                    ) : image?.type === "mobile" ? (
                        <img src={image?.url} style={{ width: "350px", height: "175px" }} />
                    ) : (
                        ""
                    )}
                </Box>
            </Modal>
            <TanstackReactTable
                columns={columns}
                title="Banners"
                data={data?.data || []}
                loading={isLoading}
                totalPage={data?.pagination?.totalPage || 1}
            />
            <TablePagination
                paginationData={data?.pagination}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
};

export default Banners;
