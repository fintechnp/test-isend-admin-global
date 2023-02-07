import React, { useState, useEffect, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Delete } from "App/components";
import Center from "App/components/Center/Center";
import FundingSourceFilter from "./FundingSourceFilter";
import Table, { TablePagination, TableSwitch } from "App/components/Table";

import { CountryName } from "App/helpers";
import fundingSourceActions from "Private/features/funding-sources/fundingSourceActions";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

const FundingSources = () => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: data, loading: isLoading } = useSelector((state) => state.get_funding_source_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_funding_source);

    const { success: isAddSuccess } = useSelector((state) => state.add_funding_source);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_funding_source);

    useEffect(() => {
        dispatch(fundingSourceActions.get_funding_sources(filterSchema));
        dispatch({ type: "DELETE_FUNDING_SOURCE_RESET" });
    }, [dispatch, filterSchema, isDeleting, isAddSuccess, isDeleteSuccess, isUpdateSuccess]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "fundingsource_id",
                maxWidth: 80,
            },
            {
                Header: "Payment Name",
                accessor: "payment_name",
                Cell: (data) => <Typography>{data.value ? data.value : "n/a"}</Typography>,
            },
            {
                Header: "Payment Value",
                accessor: "payment_value",
                Cell: (data) => <Typography>{data.value ? data.value : "n/a"}</Typography>,
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: (data) => <Typography>{data.value ? CountryName(data.value) : "n/a"}</Typography>,
            },
            {
                Header: "Currency",
                accessor: "currency",
                Cell: (data) => <Typography>{data.value ? data.value : "n/a"}</Typography>,
            },
            {
                Header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "is_active",
                width: 120,
                Cell: (data) => (
                    <TableSwitch
                        value={data?.value}
                        dataId={data.row.original.fundingsource_id}
                        handleStatus={handleStatus}
                    />
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessor: "show",
                Cell: ({ row }) => (
                    <Center>
                        <span {...row.getToggleRowExpandedProps({})}>
                            {row.isExpanded ? (
                                <Tooltip title="Hide Funding Source Details" arrow>
                                    <IconButton>
                                        <VisibilityOffOutlinedIcon
                                            sx={{
                                                fontSize: "20px",
                                                "&:hover": {
                                                    background: "transparent",
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Show Funding Source Details" arrow>
                                    <IconButton>
                                        <RemoveRedEyeOutlinedIcon
                                            sx={{
                                                fontSize: "20px",
                                                "&:hover": {
                                                    background: "transparent",
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </span>
                        <Tooltip title="Edit Funding Source" arrow>
                            <IconButton
                                onClick={() =>
                                    dispatch({
                                        type: "OPEN_UPDATE_FUNDING_SOURCE_MODAL",
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
                            id={row.original.fundingsource_id}
                            handleDelete={handleDelete}
                            loading={isDeleting}
                            tooltext="Delete Funding Source"
                        />
                    </Center>
                ),
            },
        ],
        [],
    );

    const sub_columns = [
        { key: "country", name: "Country", type: "country" },
        { key: "currency", name: "Currency", type: "currency" },
        { key: "payment_name", name: "Payment Name", type: "default" },
        { key: "payment_value", name: "Payment Value", type: "default" },
        { key: "description", name: "Description", type: "default" },
        { key: "is_active", name: "Status", type: "boolean" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

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
        dispatch(fundingSourceActions.delete_funding_source(id));
    };

    const handleStatus = useCallback((is_active, id) => {
        dispatch(fundingSourceActions.update_funding_source_status(id, { is_active: is_active }));
    }, []);

    let timeout;

    const handleOnSearch = useCallback(
        (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const searchValue = e.target.value;
                const updatedFilterSchema = {
                    ...filterSchema,
                    payment_name: searchValue,
                };
                setFilterSchema(updatedFilterSchema);
            }, 500);
        },
        [filterSchema],
    );

    useEffect(() => {
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const handleOnCountryChange = useCallback((e) => {
        const country = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            country: country,
        };
        setFilterSchema(updatedFilterSchema);
    }, []);

    const handleOnOrderChange = useCallback((e) => {
        const order = e.target.value;
        x;
        const updatedFilterSchema = {
            ...filterSchema,
            order_by: order,
        };
        setFilterSchema(updatedFilterSchema);
    }, []);

    return (
        <>
            <FundingSourceFilter
                state={filterSchema}
                onSearch={handleOnSearch}
                onCountryChange={handleOnCountryChange}
                onChangeOrder={handleOnOrderChange}
            />
            <Table
                columns={columns}
                title="Funding Sources"
                data={data?.data || []}
                loading={isLoading}
                rowsPerPage={8}
                totalPage={data?.pagination?.totalPage || 1}
                sub_columns={sub_columns}
                renderPagination={() => (
                    <TablePagination
                        paginationData={data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </>
    );
};

export default FundingSources;
