import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

const MenuContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
    background: theme.palette.background.dark,
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
    search: "",
    sort_by: "",
    order_by: "DESC",
};

const ServiceCharge = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: servicecharge_data, loading: g_loading } = useSelector((state) => state.get_all_service_charge);

    useEffect(() => {
        dispatch(actions.get_all_service_charge(filterSchema));
        dispatch({ type: "GET_SENDING_PARTNER_RESET" });
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {row?.index ? row?.index + 1 : "1"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Partner Name",
                accessorKey: "agent_name",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {row?.original?.agent_name ? row?.original?.agent_name : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center" sx={{}}>
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
                        <Tooltip title="Partner Details" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/setup/service-charge/${row?.original?.agent_name}/${row?.original?.sending_agent_id}`,
                                    )
                                }
                            >
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
                    </Box>
                ),
            },
        ],
        [],
    );

    const sortData = [
        { key: "None", value: "" },
        { key: "Partner Id", value: "sending_agent_id" },
        { key: "Partner Name", value: "agent_name" },
    ];
    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const handleSearch = useCallback(
        (value) => {
            const updatedFilterSchema = {
                ...filterSchema,
                search: value,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema],
    );

    const handleSort = (e) => {
        const sort = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: sort,
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
        <PageContent
            documentTitle="Partnerwise Service Charge"
            breadcrumbs={[{ label: "Setup" }, { label: "Partnerwise Service Charge" }]}
        >
            <PageContentContainer
                title="Partnerwise Service Charge"
                topRightContent={
                    <>
                        <Filter
                            state={filterSchema}
                            sortData={sortData}
                            orderData={orderData}
                            handleSearch={handleSearch}
                            handleOrder={handleOrder}
                            handleSort={handleSort}
                        />
                        <Header buttonText="Add Service Charge" />
                    </>
                }
            >
                <TanstackReactTable columns={columns} data={servicecharge_data?.data || []} loading={g_loading} />
                <TablePagination
                    paginationData={servicecharge_data?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </PageContentContainer>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_SERVICE_CHARGE] })(ServiceCharge);
