import React, { useEffect, useState, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import actions from "./store/actions";
import Image from "./components/Image";
import LargeImage from "./components/LargeImage";
import Header from "./components/Header";
import Filter from "./components/Filter";
import { FormatDate, ReferenceName } from "./../../../../App/helpers";
import { Delete } from "./../../../../App/components";
import Table, { TablePagination } from "./../../../../App/components/Table";

const CustomerWrapper = styled("div")(({ theme }) => ({
    margin: "12px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
    background: theme.palette.background.dark,
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "13px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "",
    order_by: "ASC",
};

function Documents(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: Documents, loading } = useSelector(
        (state) => state.get_documents
    );

    const { success } = useSelector((state) => state.upload_documents);
    const { success: del_success, loading: d_loading } = useSelector(
        (state) => state.delete_documents
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_documents(id, filterSchema));
            dispatch({ type: "DELETE_DOCUMENTS_RESET" });
            dispatch({ type: "UPLOAD_DOCUMENTS_RESET" });
            dispatch({ type: "GET_DOCUMENTS_BYID_RESET" });
        }
    }, [dispatch, id, success, del_success, filterSchema]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Image",
                accessor: "document",
                minWidth: 250,
                Cell: (data) => {
                    return (
                        <>
                            <Typography
                                component="p"
                                sx={{ fontSize: "14px", lineHeight: 1.2 }}
                            >
                                {data?.value ? (
                                    <Image document={data?.value} />
                                ) : (
                                    <Image document="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" />
                                )}
                            </Typography>
                        </>
                    );
                },
            },
            {
                Header: "Type",
                accessor: "type",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {data?.value ? ReferenceName(2, data?.value) : ""}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{ fontSize: "13px", opacity: 0.9 }}
                        >
                            {data?.row.original?.side
                                ? ReferenceName(48, data?.row.original?.side)
                                : ""}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Name",
                accessor: "name",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {data?.value ? data?.value : ""}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Created By</Typography>
                    </Box>
                ),
                accessor: "created_by",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {data.value ? data?.value : ""}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Created At</Typography>
                    </Box>
                ),
                accessor: "created_ts",
                maxWidth: 150,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {data.value ? FormatDate(data.value) : "N/A"}
                        </StyledName>
                    </Box>
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <LargeImage
                            side={row.original.side}
                            title={row.original.type}
                            image={row.original?.document}
                        />
                        <Delete
                            fontSize="25px"
                            loading={d_loading}
                            id={row.original.tid}
                            handleDelete={handleDelete}
                            tooltext="Delete Documents"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const handleDelete = (doc_id) => {
        dispatch(actions.delete_documents(id, doc_id));
    };

    const handleSearch = useCallback(
        (e) => {
            const searchValue = e.target.value;
            const updatedFilterSchema = {
                ...filterSchema,
                search: searchValue,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema]
    );

    const handleSort = (e) => {
        const type = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: type,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleOrder = (e) => {
        const order = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            order_by: order,
        };
        setFilterSchema(updatedFilterSchema);
    };

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

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <CustomerWrapper>
                <Header />
                <Filter
                    state={filterSchema}
                    handleSearch={handleSearch}
                    handleSort={handleSort}
                    handleOrder={handleOrder}
                />
                <Table
                    columns={columns}
                    data={Documents?.data || []}
                    loading={loading}
                    rowsPerPage={8}
                    renderPagination={() => (
                        <TablePagination
                            paginationData={Documents?.pagination}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                />
            </CustomerWrapper>
        </>
    );
}

export default Documents;
