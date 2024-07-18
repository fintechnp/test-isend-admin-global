import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Row from "App/components/Row/Row";
import Button from "App/components/Button/Button";
import { TablePagination } from "App/components/Table";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import LoadingBackdrop from "App/components/Loading/LoadingBackdrop";
import MarketMakerStatusBadge from "./components/MarketMakerStatusBade";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import getFlagUrl from "App/helpers/getFlagUrl";
import buildRoute from "App/helpers/buildRoute";
import useCountries from "App/hooks/useCountries";
import routePaths from "Private/config/routePaths";
import { CountryNameById, CurrencyName } from "App/helpers";
import useListFilterStore from "App/hooks/useListFilterStore";
import { MarketMakerActions as marketMakerActions } from "./store/index";
import Column from "App/components/Column/Column";

const initialState = {
    Page: 1,
    PageSize: 10,
};

export default function ListMarketMaker() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { getCountryById, isLoading: isLoadingCountries } = useCountries();

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
                cell: ({ row, getValue }) => {
                    const country = getCountryById(row.original.registeredCountryId);

                    return (
                        <Row gap="8px">
                            <BadgeAvatar
                                avatarDimension={20}
                                smallAvatarDimension={0}
                                avatarUrl={getFlagUrl(country.iso2)}
                                TooltipProps={{
                                    title: country.country,
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
            },
            {
                header: "Registration Number/Date",
                accessorKey: "registrationNo",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue()}</Typography>
                        <Typography>{row.original.registeredDate}</Typography>
                    </Column>
                ),
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
            type: fieldTypes.TEXTFIELD,
            label: "Agent Name",
            name: "name",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            label: "Country",
            name: "countryId",
            props: {
                valueKey: "country_id",
            },
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
