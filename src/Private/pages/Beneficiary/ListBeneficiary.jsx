import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import buildRoute from "App/helpers/buildRoute";
import Spacer from "App/components/Spacer/Spacer";
import routePaths from "Private/config/routePaths";
import { TablePagination } from "App/components/Table";
import NoResults from "../Transactions/components/NoResults";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { beneficiaryActions as actions } from "./store";
import BeneficiaryFilterForm from "Private/components/Beneficiary/BeneficiaryFilterForm";

const initialState = {
    page_number: 1,
    page_size: 10,
};
export default function GetAllBeneficiary() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading } = useSelector((state) => state.get_all_beneficiary);
    console.log("🚀 ~ file: GetAllBeneficiary.jsx:31 ~ GetAllBeneficiary ~ response:", response);

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
                accessorKey: "beneficiary_type",
            },
            {
                header: "Country of Registration",
                accessorKey: "registered_country",
            },

            {
                header: "Currency",
                accessorKey: "currency",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Payment Type",
                accessorKey: "payment_type_id",
            },

            {
                header: "Actions",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.getByIdB2bBeneficiary, row?.original?.businessId));
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
            page_size: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    useEffect(() => {
        dispatch(actions.get_all_beneficiary(filterSchema));
    }, [filterSchema]);

    return (
        <PageContent title="B2B Beneficiary List">
            {loading && (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            )}

            <BeneficiaryFilterForm setFilterSchema={setFilterSchema} />
            {!loading && response?.data && response?.data?.length === 0 ? (
                <Grid item xs={12}>
                    <NoResults text="No Beneficiary Found" />
                </Grid>
            ) : (
                <>
                    <Spacer />
                    <TanstackReactTable
                        columns={columns}
                        title="Beneficiary"
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
