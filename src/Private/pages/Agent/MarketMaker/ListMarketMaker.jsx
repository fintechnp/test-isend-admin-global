import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import buildRoute from "App/helpers/buildRoute";
import Button from "App/components/Button/Button";
import { TablePagination } from "App/components/Table";
import FilterForm from "App/components/Filter/FilterForm";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import LoadingBackdrop from "App/components/Loading/LoadingBackdrop";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import routePaths from "Private/config/routePaths";
import { CountryNameById, CurrencyName } from "App/helpers";
import useListFilterStore from "App/hooks/useListFilterStore";
import { MarketMakerActions as marketMakerActions } from "./store/index";
import MarketMakerStatusBadge from "./components/MarketMakerStatusBade";

const initialState = {
    Page: 1,
    PageSize: 10,
};

export default function ListMarketMaker() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

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
    } = useListFilterStore({
        initialState,
        pageNumberKeyName: "Page",
        pageSizeKeyName: "PageSize",
    });

    const { response: marketMakerDetails, loading: isLoading } = useSelector((state) => state.get_all_market_maker);

    const { loading: isTogglingStatus } = useSelector((state) => state.update_market_maker_status);

    useEffect(() => {
        dispatch(marketMakerActions?.get_all_market_maker(filterSchema));
    }, [filterSchema]);

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
                header: "Business Type",
                accessorKey: "businessType",
            },
            {
                header: "Registration Number",
                accessorKey: "registrationNo",
            },
            {
                header: "Registered country",
                accessorKey: "registeredCountryId",
                cell: ({ getValue }) => {
                    return <Typography>{CountryNameById(getValue())}</Typography>;
                },
            },

            {
                header: "Currency",
                accessorKey: "currencyId",
                cell: ({ row }) => {
                    return <Typography>{CurrencyName(row?.original?.currencyId)}</Typography>;
                },
            },
            {
                header: "Contact No",
                accessorKey: "contactNo",
            },
            {
                header: "Registered Date",
                accessorKey: "registeredDate",
            },

            {
                header: "Status",
                accessorKey: "status",
                cell: ({ getValue, row }) => (
                    <MarketMakerStatusBadge statusId={getValue()} label={row.original.status_value} />
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
                                    onClick={() =>
                                        navigate(buildRoute(routePaths.ViewAgent, row.original.marketMakerId))
                                    }
                                >
                                    View
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() =>
                                        navigate(buildRoute(routePaths.EditAgent, row.original.marketMakerId))
                                    }
                                >
                                    Edit
                                </ListItemButton>
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: "textfield",
            label: "Agent Name",
            name: "name",
        },
    ];

    return (
        <PageContent
            documentTitle="Agents"
            breadcrumbs={[
                {
                    label: "Agents",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <FilterForm
                title="Search Agents"
                open={isFilterOpen}
                onClose={closeFilter}
                onSubmit={onFilterSubmit}
                onReset={reset}
                fields={filterFields}
                values={filterSchema}
                onDelete={onDeleteFilterParams}
            />
            <PageContentContainer
                title="Agents"
                topRightContent={
                    <Button variant="contained" onClick={() => navigate(routePaths.CreateAgent)}>
                        Create Agent
                    </Button>
                }
            >
                <TanstackReactTable
                    columns={columns}
                    title="Agent"
                    data={marketMakerDetails?.data ?? []}
                    loading={isLoading}
                />
            </PageContentContainer>
            <TablePagination
                paginationData={marketMakerDetails?.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
            <LoadingBackdrop open={isTogglingStatus} />
        </PageContent>
    );
}
