import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CableIcon from "@mui/icons-material/Cable";

import actions from "../store/actions";
import payoutActions from "../../PayoutLocation/store/actions";
import Header from "./Header";
import Filter from "./Filter";
import Table, { TablePagination } from "./../../../../../App/components/Table";

const MapContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    payout_country: "",
    payout_currency: "",
    payment_type: "",
    search: "",
    sort_by: "country",
    order_by: "ASC",
};

const MapBank = () => {
    const { payment, country, currency } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 15,
        payout_country: country,
        payout_currency: currency,
        payment_type: payment,
        search: "",
        sort_by: "country",
        order_by: "ASC",
    });

    const { response: payoutloaction_data, loading: g_loading } = useSelector(
        (state) => state.get_all_payout_location
    );

    useEffect(() => {
        if (country && currency) {
            dispatch(payoutActions.get_all_payout_location(filterSchema));
        }
    }, [dispatch, filterSchema, country, currency]);

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "payout_location_id",
            maxWidth: 50,
        },
        {
            Header: "Location Name",
            accessor: "location_name",
            width: 180,
            maxWidth: 280,
            Cell: (data) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                        {data.value}
                    </StyledName>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Payemnt Type</Typography>
                </Box>
            ),
            accessor: "payment_type",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Country/Currency</Typography>
                </Box>
            ),
            accessor: "country",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
                    <Typography
                        sx={{ opacity: 0.6, fontSize: "12px", lineHeight: 1 }}
                    >
                        {data?.row?.original?.currency}
                    </Typography>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Location Code</Typography>
                </Box>
            ),
            accessor: "location_code",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
                    <Typography
                        sx={{ opacity: 0.6, fontSize: "12px", lineHeight: 1 }}
                    >
                        {data?.row?.original?.receiving_currency}
                    </Typography>
                </Box>
            ),
        },
        {
            Header: "",
            accessor: "show",
            Cell: ({ row }) => (
                <Box
                    sx={{
                        fontSize: "18px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <Tooltip title="Map" arrow>
                        <Button
                            size="small"
                            variant="outlined"
                            endIcon={<CableIcon sx={{ fontSize: "16px" }} />}
                        >
                            Map
                        </Button>
                    </Tooltip>
                </Box>
            ),
        },
    ]);

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

    const handleOrder = (e) => {
        const order = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            order_by: order,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleAgentType = (e) => {
        const payment = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            agent_type: payment,
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

    const handleMapUnmap = (id) => {
        dispatch(actions.delete_corridor(id));
    };

    return (
        <MapContainer>
            <Header title="Exchange Rate List" buttonText="Add Exchange Rate" />
            <Filter
                handleSearch={handleSearch}
                handleOrder={handleOrder}
                handleAgentType={handleAgentType}
            />
            <Table
                columns={columns}
                title="Exchange Rate Details"
                data={payoutloaction_data?.data || []}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={payoutloaction_data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MapContainer>
    );
};

export default MapBank;
