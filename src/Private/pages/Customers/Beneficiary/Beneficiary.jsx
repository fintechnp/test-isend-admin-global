import Box from '@mui/material/Box'
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect,  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate, useParams } from "react-router-dom";

import { Block } from "App/components";
import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import PhoneIcon from "App/components/Icon/PhoneIcon";
import { TablePagination } from "App/components/Table";
import FilterForm from "App/components/Filter/FilterForm";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import ActiveBlockedStatusBadge from "App/components/Badge/ActiveBlockedStatusBadge";

import actions from "./store/actions";
import {  ReferenceName } from "App/helpers";
import buildRoute from "App/helpers/buildRoute";
import getFlagUrl from "App/helpers/getFlagUrl";
import routePaths from "Private/config/routePaths";
import { permissions } from "Private/data/permissions";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";
import { getBeneficiaryFullName } from "App/helpers/getFullName";

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const sortData = [
    { key: "None", value: "" },
    { key: "Name", value: "first_name" },
    { key: "Country", value: "country" },
    { key: "Payment Type", value: "payment_type" },
];

function Beneficiary() {
    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const methods = useListFilterStore({ initialState });

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        filterSchema,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onQuickFilter,
        onRowsPerPageChange,
        reset,
    } = methods;

    const { response: customersData, loading: isLoading } = useSelector((state) => state.get_beneficiary_by_customer);

    const { success: b_success, loading: b_loading } = useSelector((state) => state.block_unblock_beneficiary);

    useEffect(() => {
        dispatch({ type: "CREATE_BENEFICIARY_RESET" });
        dispatch({ type: "UPDATE_BENEFICIARY_RESET" });
        dispatch({ type: "GET_BENEFICIARY_BYID_RESET" });
        dispatch({ type: "BLOCK_UNBLOCK_BENEFICIARY_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_beneficiary_by_customer(id, filterSchema));
        dispatch({ type: "BLOCK_UNBLOCK_BENEFICIARY_RESET" });
    }, [dispatch, filterSchema, b_success]);


    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
                maxWidth: 50,
            },
            {
                header: "Name",
                accessorKey: "first_name",
                cell: ({ row }) => (
                    <Row alignItems="center" gap="8px">
                        <BadgeAvatar
                            avatarDimension={28}
                            smallAvatarDimension={14}
                            altAvatarText={getBeneficiaryFullName(row.original)}
                            smallAvatarUrl={getFlagUrl(row.original.country_iso2)}
                            disableCustomStyle
                            avatarSx={{
                                fontSize: 12,
                            }}
                        />
                        <Box>
                            <Typography fontWeight={500}>
                                {getBeneficiaryFullName(row.original)} ({row.original.beneficiary_id})
                            </Typography>
                            <Row alignItems="center" gap="4px">
                                <PhoneIcon />
                                <Typography variant="body2">
                                    +{row.original.phone_country_code} - {row?.original?.mobile_number}
                                </Typography>
                            </Row>
                        </Box>
                    </Row>
                ),
            },
            {
                header: "Collection",
                accessorKey: "payment_type",
                cell: ({ getValue, row }) => {
                    return (
                        <>
                            <Typography>{ReferenceName(referenceTypeId.paymentType, getValue())}</Typography>
                            <Typography color="text.secondary">
                                {row?.original?.bank_name ? row?.original?.bank_name : ""}
                            </Typography>
                        </>
                    );
                },
            },
            {
                header: "Status",
                accessorKey: "is_active",
                maxWidth: 100,
                cell: ({ getValue }) => <ActiveBlockedStatusBadge status={getValue() ? "active" : "blocked"} />,
            },
            {
                header: "Relation",
                accessorKey: "relation",
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ListItemButton
                                    onClick={() =>
                                        navigate(
                                            buildRoute(routePaths.ViewCustomerBeneficiary, {
                                                id: row.original.customer_id,
                                                bene_id: row.original.tid,
                                            }),
                                        )
                                    }
                                >
                                    View
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() =>
                                        navigate(
                                            buildRoute(routePaths.EditCustomerBeneficiary, {
                                                id: row.original.customer_id,
                                                bene_id: row.original.tid,
                                            }),
                                        )
                                    }
                                >
                                    Edit
                                </ListItemButton>
                                <Block
                                    name="Beneficiary"
                                    destroyOnUnmount
                                    enableReinitialize
                                    initialValues={{
                                        id: row.original.tid,
                                        is_active: row?.original?.is_active,
                                    }}
                                    onSubmit={handleBlock}
                                    loading={b_loading}
                                    status={row?.original?.is_active}
                                    onClose={onClose}
                                    enablePopoverAction
                                />
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    const handleBlock = (data) => {
        dispatch(
            actions.block_unblock_beneficiary(data?.id, {
                is_active: !data?.is_active,
            }),
        );
    };

    const filterFields = [
        {
            type: "textfield",
            label: "Search",
            name: "search",
        },
    ];

    return (
        <PageContent
            documentTitle="Customer Beneficiaries"
            breadcrumbs={[
                {
                    label: "Customers",
                    link: routePaths.ListCustomer,
                },
                {
                    label: id,
                    link: buildRoute(routePaths.ViewCustomer, id),
                },
                {
                    label: "Beneficiaries",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Beneficiaries"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="Beneficiaries"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={isLoading}
                                sortByData={sortData}
                                values={filterSchema}
                            />
                            <HasPermission permission={permissions.CREATE_CUSTOMER}>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate(buildRoute(routePaths.CreateCustomerBeneficiary, id))}
                                >
                                    Create Beneficiary
                                </Button>
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={customersData?.data ?? []} loading={isLoading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={customersData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default Beneficiary;
