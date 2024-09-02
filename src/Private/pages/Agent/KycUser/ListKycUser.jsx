import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useMemo, useState } from "react";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import apiEndpoints from "Private/config/apiEndpoints";
import { localStorageGet } from "App/helpers/localStorage";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";
import PopoverButton from "App/components/Button/PopoverButton";
import { KycUserActions as actions } from "Private/pages/Agent/KycUser/store";
import { relatedTo as relatedToConstant, relatedToOptions } from "Private/data/b2b";

const initialState = {
    page_number: 1,
    page_size: 10,
};

export default function ListKycUser() {
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

    const { response, loading } = useSelector((state) => state.get_all_kyc_user);

    const statusOptions = localStorageGet("reference")
        ?.find((item) => item?.reference_type === referenceTypeId.balanceRequestStatus)
        ?.reference_data?.map((referenceItem) => {
            return {
                label: referenceItem.name,
                value: +referenceItem.value,
            };
        });

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onRowsPerPageChange,
        onFilterSubmit,
        onPageChange,
        onDeleteFilterParams,
        filterSchema,
        reset,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch(actions.get_all_kyc_user(filterSchema));
    }, [filterSchema]);

    const filterFields = [
        {
            type: fieldTypes.SELECT,
            name: "RelatedTo",
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
            name: "marketMakerId",
            labelKey: "name",
            ...newField,
        },
        {
            name: "statusId",
            type: fieldTypes.SELECT,
            label: "Status",
            options: statusOptions,
        },
    ];

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Name",
                accessorKey: "fullName",
            },
            {
                header: "Date of Birth",
                accessorKey: "dateOfBirth",
            },
            {
                header: "Gender",
                accessorKey: "genderName",
            },
            {
                header: "Identity No",
                accessorKey: "identityNo",
            },
            {
                header: "Identity Issued Country",
                accessorKey: "identityIssuedCountry.country",
            },
            {
                header: "Mobile Number",
                accessorKey: "mobileNumber",
            },

            {
                header: "Remarks",
                accessorKey: "remarks",
            },
            {
                header: "Status",
                accessorKey: "statusName",
            },
            {
                header: "Actions",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <ListItemButton
                                onClick={() => {
                                    navigate(buildRoute(routePaths.agent.viewKycUser, row?.original?.kycId));
                                    onClose();
                                }}
                            >
                                View
                            </ListItemButton>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    return (
        <PageContent
            documentTitle="Kyc Users"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "B2B",
                },
                {
                    label: "KYC USERS",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                    title="Search KYC Users"
                    onReset={() => {
                        reset();
                        setNewField(agentInitialState);
                    }}
                />
                <PageContentContainer title="KYC USERS">
                    <TanstackReactTable
                        columns={columns}
                        title="KYC USERS"
                        data={response?.data ?? []}
                        loading={loading}
                    />
                </PageContentContainer>
            </Column>
            <TablePagination
                paginationData={response?.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
        </PageContent>
    );
}
