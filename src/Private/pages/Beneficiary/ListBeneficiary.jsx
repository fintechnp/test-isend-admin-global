import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import { ReferenceName } from "App/helpers";
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
import { localStorageGet } from "App/helpers/localStorage";

const initialState = {
    page_number: 1,
    page_size: 10,
};
export default function ListBeneficiary() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reference = localStorageGet("reference");
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading } = useSelector((state) => state.get_all_beneficiary);

    const sortByOptions =
        response?.data?.length > 0 &&
        Object.keys(response?.data[0])
            ?.map((item) => {
                return { value: item, label: item };
            })
            .filter((item) => item.label !== "f_serial_no");

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Beneficiary  Name",
                accessorKey: "name",
                cell: ({ getValue, row }) => (
                    <Typography>
                        {row?.original?.beneficiary_type_id === 1
                            ? `${row?.original?.first_name} ${row?.original?.last_name}`
                            : getValue()}
                    </Typography>
                ),
            },
            {
                header: "Beneficiary Type",
                accessorKey: "beneficiary_type",
            },
            {
                header: "Agent/Business",
                accessorKey: "related_to",
            },
            {
                header: "Country",
                accessorKey: "registered_country",
                cell: ({ getValue, row }) => (
                    <Typography>
                        {row?.original?.beneficiary_type_id === 1 ? row?.original?.identity_issue_country : getValue()}
                    </Typography>
                ),
            },

            {
                header: "Currency",
                accessorKey: "currency",
            },

            {
                header: "Delivery Method",
                accessorKey: "payment_type_id",
                cell: ({ getValue }) => <Typography>{ReferenceName(1, getValue())}</Typography>,
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
                                navigate(
                                    buildRoute(routePaths.agent.viewB2bBeneficiary, row?.original?.beneficiary_id),
                                );
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

            <BeneficiaryFilterForm sortByOptions={sortByOptions} setFilterSchema={setFilterSchema} />
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
