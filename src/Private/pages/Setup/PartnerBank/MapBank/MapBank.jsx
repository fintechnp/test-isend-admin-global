import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import actions from "../store/actions";
import payoutActions from "../../PayoutLocation/store/actions";
import Header from "./Header";
import Filter from "./Filter";
import Table, { TablePagination } from "./../../../../../App/components/Table";
import {
    CountryName,
    CurrencyName,
    ReferenceName,
} from "./../../../../../App/helpers";
import Map from "../../../../../App/components/Dialog/Unmap";

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

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    color: "border.main",
}));

const MapBank = () => {
    const { payment, country, currency, id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 15,
        country: country,
        currency: currency,
        payment_type: payment,
        search: "",
        sort_by: "location_name",
        order_by: "DESC",
    });

    const { response: payoutloaction_data, loading: g_loading } = useSelector(
        (state) => state.get_all_payout_location
    );
    const { loading: un_loading, success: un_success } = useSelector(
        (state) => state.unmapp_partner_bank
    );

    useEffect(() => {
        if (un_success) {
            navigate(-1);
        }
    }, [un_success]);

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
            Header: () => (
                <Box>
                    <Typography>Payemnt Type</Typography>
                </Box>
            ),
            accessor: "payment_type",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">
                        {ReferenceName(1, data.value)}
                    </StyledText>
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
                    <StyledText component="p">
                        {CountryName(data.value)}
                    </StyledText>
                    <Typography
                        sx={{ opacity: 0.6, fontSize: "12px", lineHeight: 1 }}
                    >
                        {CurrencyName(data?.row?.original?.currency)}
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
                    <Map
                        map={true}
                        title="Do you want to map this partner bank?"
                        information="You are going to map Partner Bank with Payout Location. Click Yes to confirm Mapping process."
                        success={un_success}
                        id={id}
                        map_id={row.original.tid}
                        handleMapUnmap={handleMap}
                        loading={un_loading}
                    />
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

    const handleSort = (e) => {
        const sort = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: sort,
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

    const handleMap = (id, map_id) => {
        dispatch(actions.map_partner_bank(id, { payout_location_id: map_id }));
    };

    return (
        <MapContainer>
            <Header title="Exchange Rate List" buttonText="Add Exchange Rate" />
            <Filter
                state={filterSchema}
                handleSearch={handleSearch}
                handleOrder={handleOrder}
                handleSort={handleSort}
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
