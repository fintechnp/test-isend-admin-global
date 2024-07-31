import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import OrganizationStakeholderStatusBadge from "../Stakeholder/components/OrganizationStakeholderStatusBadge";

import Row from "App/components/Row/Row";
import { businessActions } from "./store";
import getFlagUrl from "App/helpers/getFlagUrl";
import buildRoute from "App/helpers/buildRoute";
import { booleanOptions } from "App/data/Boolean";
import routePaths from "Private/config/routePaths";
import useCountries from "App/hooks/useCountries";
import apiEndpoints from "Private/config/apiEndpoints";
import useListFilterStore from "App/hooks/useListFilterStore";
import { businessStatusOptions } from "./data/businessStatus";

const initialState = {
    PageNumber: 1,
    PageSize: 10,
};

export default function ListBusiness() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { getCurrencyName } = useCountries();

    const {
        closeFilter,
        filterSchema,
        isFilterOpen,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
        openFilter,
        reset,
    } = useListFilterStore({ initialState, pageNumberKeyName: "PageNumber", pageSizeKeyName: "PageSize" });

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
                cell: ({ row, getValue }) => {
                    return (
                        <Row gap="8px">
                            <BadgeAvatar
                                avatarDimension={20}
                                smallAvatarDimension={0}
                                avatarUrl={getFlagUrl(row.original.registeredCountryIs02Code)}
                                TooltipProps={{
                                    title: row.original.registeredCountryName,
                                    arrow: true,
                                    placement: "top",
                                }}
                            />
                            <Typography fontWeight={500}>{getValue()}</Typography>
                        </Row>
                    );
                },
            },
            {
                header: "Business Type",
                accessorKey: "businessType",
                cell: ({ getValue }) => <>{getValue() ?? "-"}</>,
            },
            {
                header: "Registration Number/Date",
                accessorKey: "registrationNo",
                cell: ({ row, getValue }) => (
                    <Column>
                        <Typography>{getValue()}</Typography>
                        <Typography>{row.original.registeredDate}</Typography>
                    </Column>
                ),
            },
            {
                header: "Currency",
                accessorKey: "currency",
                cell: ({ getValue }) => <>{getCurrencyName(getValue())}</>,
            },
            {
                header: "Contact Number",
                accessorKey: "phoneNo",
            },
            {
                header: "Is Self Registered ?",
                accessorKey: "isSelfRegistered",
                cell: ({ getValue }) => <>{getValue() ? "Yes" : "No"}</>,
            },
            {
                header: "Status",
                accessorKey: "statusId",
                cell: ({ getValue, row }) => (
                    <OrganizationStakeholderStatusBadge statusId={getValue()} label={row.original.status} />
                ),
            },

            {
                header: "Actions",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.ViewBusiness, row?.original?.businessId));
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

    const filterFields = [
        {
            type: fieldTypes.SEARCH_AUTOCOMPLETE_API,
            label: "Agent",
            name: "MarketMakerId",
            apiEndpoint: apiEndpoints.marketMaker.getAll,
            searchParamName: "Name",
            labelKey: "name",
            valueKey: "marketMakerId",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Business Name",
            name: "BusinessName",
        },
        {
            type: fieldTypes.DATE,
            label: "From Date",
            name: "FromDate",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            label: "To Date",
            name: "ToDate",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.SELECT,
            label: "Status",
            name: "Status",
            options: businessStatusOptions,
        },
        {
            type: fieldTypes.SELECT,
            label: "Is Self Registered ?",
            name: "IsSelfRegistered",
            options: booleanOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Businesses"
            breadcrumbs={[
                {
                    label: "Businesses",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <FilterForm
                title="Search Businesses"
                open={isFilterOpen}
                onClose={closeFilter}
                onSubmit={onFilterSubmit}
                onReset={reset}
                fields={filterFields}
                values={filterSchema}
                onDelete={onDeleteFilterParams}
            />
            <PageContentContainer title="Businesses">
                <TanstackReactTable columns={columns} title="Business" data={response?.data ?? []} loading={loading} />
            </PageContentContainer>
            <TablePagination
                paginationData={response?.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
        </PageContent>
    );
}
