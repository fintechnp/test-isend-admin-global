import React, { useEffect, useState, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import { FormatDate } from "./../../../../App/helpers";
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
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "",
    order_by: "ASC",
};

function Remarks() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: remarksData, loading } = useSelector(
        (state) => state.get_transaction_remarks
    );

    const { success } = useSelector(
        (state) => state.create_transaction_remarks
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_transaction_remarks(id, filterSchema));
        }
    }, [dispatch, id, success, filterSchema]);

    useEffect(() => {
        dispatch({ type: "CREATE_TRANSACTION_REMARKS_RESET" });
        dispatch({ type: "GET_TRANSACTION_REMARKS_BYID_RESET" });
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Remarks",
                accessor: "remarks",
                minWidth: 300,
                Cell: (data) => {
                    return (
                        <>
                            <Typography
                                component="p"
                                sx={{ fontSize: "14px", lineHeight: 1.2 }}
                            >
                                {data?.value ? data?.value : ""}
                            </Typography>
                        </>
                    );
                },
            },
            {
                Header: "Remarked By",
                accessor: "created_by",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
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
        ],
        []
    );

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
                data={remarksData?.data || []}
                loading={loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={remarksData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </CustomerWrapper>
    );
}

export default Remarks;
