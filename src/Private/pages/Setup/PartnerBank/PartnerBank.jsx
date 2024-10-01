import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Chip, ListItemButton, Tooltip, Typography } from "@mui/material";

import { Delete } from "App/components";
import Unmap from "App/components/Dialog/Unmap";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import withPermission from "Private/HOC/withPermission";
import AddPartnerBank from "./components/AddPartnerBank";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import ExportUpload from "Private/components/reports/ExportUpload";
import HasPermission from "Private/components/shared/HasPermission";
import ViewPartnerBankModal from "./components/ViewPartnerBankModal";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/actions";
import dateUtils from "App/utils/dateUtils";
import PartnerType from "App/data/PartnerType";
import { permissions } from "Private/data/permissions";
import apiEndpoints from "Private/config/apiEndpoints";
import PartnerActions from "./../Partner/store/actions";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";

const MapWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
}));

const filter = {
    page_number: 1,
    page_size: 100,
    agent_type: "PAY",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "bank_name",
    order_by: "DESC",
};

const PartnerBank = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const country = JSON.parse(localStorage.getItem("country"));
    const currencyOptions = country.map((c) => ({ label: c.currency_name, value: c.currency }));

    const { response: partnerbank_data, loading: g_loading } = useSelector((state) => state.get_all_partner_bank);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_partner_bank);
    const { loading: un_loading, success: un_success } = useSelector((state) => state.unmapp_partner_bank);
    const { success: a_success } = useSelector((state) => state.create_partner_bank);
    const { success: u_success } = useSelector((state) => state.update_partner_bank);
    const { is_open } = useSelector((state) => state.get_partner_bank_by_id);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onPageChange,
        onDeleteFilterParams,
        onFilterSubmit,
        onQuickFilter,
        onRowsPerPageChange,
        reset,
        filterSchema,
    } = useListFilterStore({ initialState });

    React.useEffect(() => {
        dispatch(PartnerActions.get_payout_partner(filter));
    }, [dispatch, a_success, u_success]);

    useEffect(() => {
        dispatch(actions.get_all_partner_bank(filterSchema));
        dispatch({ type: "UPDATE_PARTNER_BANK_RESET" });
        dispatch({ type: "CREATE_PARTNER_BANK_RESET" });
        dispatch({ type: "DELETE_PARTNER_BANK_RESET" });
        dispatch({ type: "MAP_PARTNER_BANK_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success, un_success]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Bank Name",
                accessorKey: "bank_name",
                cell: ({ getValue, row }) => <>{getValue() ? getValue() : "-"}</>,
            },
            {
                header: "Ex. Bank Code",
                accessorKey: "external_bank_code",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>Code1: {getValue() ? getValue() : "-"}</Typography>
                        <Typography>
                            Code2: {row?.original?.external_bank_code1 ? row?.original?.external_bank_code1 : "-"}
                        </Typography>
                        <Typography>
                            Code3: {row?.original?.external_bank_code2 ? row?.original?.external_bank_code2 : "-"}
                        </Typography>
                    </Column>
                ),
            },
            {
                header: "Payment Type",
                accessorKey: "payment_type",
                cell: ({ getValue, row }) => <>{getValue() ? ReferenceName(1, getValue()) : "-"}</>,
            },
            {
                header: "Country/Currency",
                accessorKey: "country",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? CountryName(getValue()) : "-"}</Typography>
                        <Typography>{row?.original?.currency ? CurrencyName(row?.original?.currency) : "-"}</Typography>
                    </Column>
                ),
            },
            {
                header: "Created At/By",
                accessorKey: "created_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                        <Typography>{row.original.created_by ? `By: ${row.original.created_by}` : ""}</Typography>
                    </Column>
                ),
            },
            {
                header: "Updated At/By",
                accessorKey: "updated_ts",
                cell: ({ row, getValue }) => {
                    return (
                        <Column>
                            <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                            <Typography>{row.original.updated_by ? `By: ${row.original.updated_by}` : ""}</Typography>
                        </Column>
                    );
                },
            },
            {
                header: "Map Status",
                accessorKey: "is_mapped",
                cell: ({ getValue, row }) => (
                    <MapWrapper sx={{}}>
                        {getValue() ? (
                            row.original.location_name
                        ) : (
                            <Chip
                                sx={{
                                    background: (theme) => theme.palette.surface.dangerSecond,
                                    color: (theme) => theme.palette.error.main,
                                }}
                                label="Not Mapped"
                            />
                        )}
                    </MapWrapper>
                ),
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ListItemButton
                                    onClick={() => {
                                        onClose();
                                        dispatch(actions.get_partner_bank_byid(row?.original?.partner_bank_id));
                                    }}
                                >
                                    View
                                </ListItemButton>
                                <HasPermission permission={permissions.EDIT_PARTNER_BANK}>
                                    <AddPartnerBank update={true} update_data={row?.original} enablePopoverAction />

                                    {/* {row?.original?.is_mapped ? (
                                        <Unmap
                                            success={un_success}
                                            id={row.original.tid} 
                                            handleMapUnmap={handleUnmap}
                                            loading={un_loading}
                                            title="Do you want to unmap this partner bank?"
                                            information="You have to remap after unmapping this. Make sure before unmapping."
                                            enablePopoverAction
                                        />
                                    ) : (
                                        <ListItemButton
                                            onClick={() =>
                                                navigate(
                                                    `/setup/partner-bank/map/${row?.original?.payment_type}/${row?.original?.country}/${row?.original?.currency}/${row?.original?.tid}`,
                                                ) 
                                            }
                                        >
                                            Map Partner Bank 
                                        </ListItemButton>
                                    )} */}
                                </HasPermission>
                                <HasPermission permission={permissions.DELETE_DELIVERY_ROUTE}>
                                    <Delete
                                        id={row.original.tid}
                                        handleDelete={handleDelete}
                                        loading={d_loading}
                                        tooltext="Delete Parnter Bank"
                                        enablePopoverAction
                                    />
                                </HasPermission>
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [un_success],
    );

    const handleUnmap = useCallback((id) => {
        dispatch(actions.map_partner_bank(id, { payout_location_id: 0 }));
    }, []);

    const handleDelete = (id) => {
        dispatch(actions.delete_partner_bank(id));
    };

    const handleCloseDialog = () => {
        dispatch(PartnerActions.get_payout_partner(filter));
        dispatch({ type: "GET_PAYOUT_LOCATION_DETAILS_RESET" });
    };

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "bank_name",
            label: "Bank Name",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "country",
            label: "Country",
        },
        {
            type: fieldTypes.SELECT,
            name: "currency",
            label: "Currency",
            options: currencyOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "is_active",
            label: "Status",
            options: [
                {
                    label: "Active",
                    value: true,
                },
                {
                    label: "Inactive",
                    value: false,
                },
            ],
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "bank_code",
            label: "Ex. Bank Code",
        },
        {
            type: fieldTypes.PARTNER_SELECT,
            name: "agent_id",
            label: "All Partner",
            PartnerType: PartnerType.PAY,
        },
    ];

    const sortByData = [
        { key: "None", value: "" },
        { key: "Payout Agent", value: "agent_id" },
        { key: "Bank Name", value: "bank_name" },
    ];

    return (
        <PageContent
            documentTitle="Partner Banks"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Partnter Banks",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Partner Bank"
                    open={isFilterOpen}
                    fields={filterFields}
                    values={filterSchema}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onClose={closeFilter}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="Partner Banks"
                    topRightContent={
                        <>
                            {/* <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                values={filterSchema}
                                disabled={g_loading}
                                sortByData={sortByData}
                            /> */}
                            <ExportUpload
                                columns={columns}
                                data={partnerbank_data?.data}
                                paginationData={partnerbank_data?.pagination}
                                apiEndpoint={apiEndpoints.GetParnterBanks}
                                filename="Partner Banks"
                            />
                            <AddPartnerBank update={false} handleCloseDialog={handleCloseDialog} />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={partnerbank_data?.data || []} loading={g_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={partnerbank_data?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
            <ViewPartnerBankModal open={is_open} />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_PARTNER_BANK] })(PartnerBank);
