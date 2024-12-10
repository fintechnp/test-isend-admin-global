import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import Spacer from "App/components/Spacer/Spacer";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import NoResults from "../../Transactions/components/NoResults";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import BeneficiaryFilterForm from "Private/components/Beneficiary/BeneficiaryFilterForm";

import { ReferenceName } from "App/helpers";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import apiEndpoints from "Private/config/apiEndpoints";
import { beneficiaryActions as actions } from "./store";
import { localStorageGet } from "App/helpers/localStorage";
import useListFilterStore from "App/hooks/useListFilterStore";
import { relatedTo as relatedToConstant, relatedToOptions } from "Private/data/b2b";

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "created_ts",
    order_by: "DESC",
};

export default function ListBeneficiary() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const agentInitialState = {
        label: "Agent",
        searchParamName: "Name",
        valueKey: "marketMakerId",
        apiEndpoint: apiEndpoints.marketMaker.getAll,
        shouldRenderPrevData: true,
        pageNumberQueryKey: "Page",
    };
    const [newField, setNewField] = useState(agentInitialState);

    const reference = localStorageGet("reference");

    const { response, loading } = useSelector((state) => state.get_all_beneficiary);
    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onQuickFilter,
        onRowsPerPageChange,
        reset,
        filterSchema,
    } = useListFilterStore({
        initialState,
    });

    const sortByOptions =
        response?.data?.length > 0
            ? Object.keys(response?.data[0])
                  ?.map((item) => {
                      return { value: item, key: item };
                  })
                  .filter((item) => item.key !== "f_serial_no")
            : [];

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

    useEffect(() => {
        dispatch(actions.get_all_beneficiary(filterSchema));
    }, [filterSchema]);

    const filterFields = [
        {
            type: fieldTypes.SELECT,
            name: "related_to",
            label: "Market Maker",
            options: relatedToOptions,
            defaultValue: relatedToConstant.AGENT,
            onChange: (event) => {
                const { value } = event.target;
                const isAgentSelected = value === relatedToConstant.AGENT;
                setNewField({
                    label: isAgentSelected ? "Agent" : "Business",
                    searchParamName: isAgentSelected ? "Name" : "BusinessName",
                    valueKey: isAgentSelected ? "marketMakerId" : "businessId",
                    apiEndpoint: isAgentSelected ? apiEndpoints.marketMaker.getAll : apiEndpoints.business.getAll,
                    shouldRenderPrevData: true,
                    pageNumberQueryKey: isAgentSelected ? "Page" : "PageNumber",
                });
            },
        },
        {
            type: fieldTypes.SEARCH_AUTOCOMPLETE_API,
            name: "related_id",
            labelKey: "name",
            ...newField,
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "beneficiary_id",
            label: "Beneficiary Id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "name",
            label: "Name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "mobile_number",
            label: "Mobile Number",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "country",
            label: "Country",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
    ];

    return (
        <PageContent
            documentTitle="B2B Beneficiary List"
            breadcrumbs={[
                {
                    label: "B2B",
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
                    onDelete={onDeleteFilterParams}
                    values={filterSchema}
                    fields={filterFields}
                    onReset={reset}
                />
                <PageContentContainer
                    title="Beneficiaries"
                    topRightContent={
                        <TableGridQuickFilter
                            onOrderByChange={onQuickFilter}
                            onSortByChange={onQuickFilter}
                            values={filterSchema}
                            disabled={loading}
                            sortByData={sortByOptions}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={response?.data ?? []} loading={loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}
