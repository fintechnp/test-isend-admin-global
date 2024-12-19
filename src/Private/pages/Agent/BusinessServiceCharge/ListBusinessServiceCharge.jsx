import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Modal from "App/components/Modal/Modal";
import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import BusinessChargeModal from "Private/components/BusinessCharge/BusinessChargeModal";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import apiEndpoints from "Private/config/apiEndpoints";
import { businessChargeActions as actions } from "./store";
import useListFilterStore from "App/hooks/useListFilterStore";
import { relatedTo as relatedToConstant, relatedToOptions } from "Private/data/b2b";

const initialState = {
    Page: 1,
    PageSize: 10,
};
export default function ListBusinessServiceCharge() {
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
    const [openModal, setOpenModal] = useState(false);
    const [selectedCharge, setSelectedCharge] = useState(null);

    const { response, loading } = useSelector((state) => state.get_all_business_charge);

    const { success: updateStatusSuccess } = useSelector((state) => state.update_business_charge_status);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onQuickFilter,
        onRowsPerPageChange,
        filterSchema,
        reset,
    } = useListFilterStore({ initialState });

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Type",
                accessorKey: "relatedTo",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Sending Country",
                accessorKey: "sendingCountry",
            },

            {
                header: "Receiving Country",
                accessorKey: "receivingCountry",
            },

            {
                header: "Status",
                accessorKey: "isActive",
                cell: ({ getValue, row }) => {
                    return (
                        <Switch
                            defaultChecked={getValue() === 1 ? true : false}
                            onChange={(e) => {
                                dispatch(actions.update_business_charge_status(row?.original?.serviceChargeId));
                            }}
                        />
                    );
                },
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                setSelectedCharge(row?.original);
                                setOpenModal(true);
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
                        <IconButton
                            onClick={() => {
                                navigate(
                                    buildRoute(
                                        routePaths.agent.updateBusinessServiceCharge,
                                        row?.original?.serviceChargeId,
                                    ),
                                );
                            }}
                        >
                            <EditOutlinedIcon
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
        dispatch(actions.get_all_business_charge(filterSchema));
    }, [filterSchema]);

    useEffect(() => {
        if (updateStatusSuccess) {
            dispatch(actions.get_all_business_charge(filterSchema));
        }
    }, [updateStatusSuccess]);

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
            name: "RelatedId",
            labelKey: "name",
            ...newField,
        },
    ];

    return (
        <>
            <PageContent
                documentTitle="Business Service Charge List"
                breadcrumbs={[
                    {
                        label: "B2B",
                    },
                    {
                        label: "Business Service Charge",
                    },
                ]}
                topRightEndContent={
                    <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
                }
            >
                <Column gap="16px">
                    <FilterForm
                        title="Search Business Service Charge"
                        open={isFilterOpen}
                        fields={filterFields}
                        onClose={closeFilter}
                        onReset={reset}
                        onDelete={onDeleteFilterParams}
                        onSubmit={onFilterSubmit}
                        values={filterSchema}
                    />
                    <PageContentContainer
                        title="Business Charge"
                        topRightContent={
                            <Button
                                onClick={() => {
                                    navigate(routePaths.agent.addBusinessServiceCharge);
                                }}
                            >
                                Add Service Charge
                            </Button>
                        }
                    >
                        <TanstackReactTable columns={columns} data={response?.data ?? []} loading={loading} />
                    </PageContentContainer>
                </Column>
                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </PageContent>
            <Modal
                title="Business Service Charge Detail"
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
                sx={{
                    width: "60%",
                }}
            >
                <BusinessChargeModal data={selectedCharge} />
            </Modal>
        </>
    );
}
