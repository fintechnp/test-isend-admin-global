import PageContent from "App/components/Container/PageContent";
import React, { useEffect, useMemo, useState } from "react";

import { businessActions } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "App/components";
import { Grid, IconButton } from "@mui/material";
import NoResults from "../Transactions/components/NoResults";
import Spacer from "App/components/Spacer/Spacer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BusinessFilterForm from "Private/components/Business/BusinessFilterForm";
import { TablePagination } from "App/components/Table";
import { useNavigate } from "react-router-dom";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";

const initialState = {
    PageNumber: 1,
    PageSize: 10,
};

export default function ListBusiness({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading } = useSelector((state) => state.get_all_business);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Type",
                accessorKey: "businessType",
            },
            {
                header: "Country of Registration",
                accessorKey: "registeredCountryName",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Status",
                accessorKey: "status",
            },

            {
                header: "Actions",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.viewBusiness, row?.original?.businessId));
                            }}
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
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    useEffect(() => {
        dispatch(businessActions.get_all_business(filterSchema));
    }, [filterSchema]);

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            Page: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            PageSize: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };
    return (
        <PageContent title={title}>
            {loading && (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            )}
            <BusinessFilterForm setFilterSchema={setFilterSchema} />

            {!loading && response?.data && response?.data?.length === 0 ? (
                <Grid item xs={12}>
                    <NoResults text="No Businesses Found" />
                </Grid>
            ) : (
                <>
                    <Spacer />
                    <TanstackReactTable
                        columns={columns}
                        title="Business"
                        data={response?.data ?? []}
                        loading={loading}
                        renderPagination={() => (
                            <TablePagination
                                paginationData={response?.pagination}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        )}
                    />
                </>
            )}
        </PageContent>
    );
}
