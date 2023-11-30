import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import buildRoute from "App/helpers/buildRoute";
import Button from "App/components/Button/Button";
import Spacer from "App/components/Spacer/Spacer";
import { TablePagination } from "App/components/Table";
import { CountryNameById, CurrencyName } from "App/helpers";
import PageContent from "App/components/Container/PageContent";
import LoadingBackdrop from "App/components/Loading/LoadingBackdrop";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import MarketMakerFilterForm from "Private/components/MarketMaker/MarketMakerFilterForm";

import routePaths from "Private/config/routePaths";
import { MarketMakerActions as marketMakerActions } from "./store/index";

const initialState = {
    Page: 1,
    PageSize: 10,
};

export default function ListMarketMaker({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const {
        response: marketMakerDetails,
        loading: m_maker_loading,
        success,
    } = useSelector((state) => state.get_all_market_maker);

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
                header: "Contact Person",
                accessorKey: "contactPerson.name",
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue, row }) => {
                    return (
                        <Switch
                            defaultChecked={getValue()}
                            onChange={(e) => {
                                dispatch(marketMakerActions.update_market_maker_status(row?.original?.marketMakerId));
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
                                navigate(buildRoute(routePaths.agent.viewMarketMaker, row?.original?.marketMakerId));
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
                                navigate(buildRoute(routePaths.agent.updateMarketMaker, row?.original?.marketMakerId));
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

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            Page: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            PageSize: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleFilterSubmit = (data) => {
        setFilterSchema({ ...filterSchema, ...data });
    };

    const handleFilterReset = () => {
        setFilterSchema(initialState);
    };

    return (
        <PageContent
            title="Agents"
            topRightEndContent={
                <Button
                    onClick={() => {
                        navigate(routePaths.agent.addMarketMaker);
                    }}
                >
                    Add Agent
                </Button>
            }
        >
            <MarketMakerFilterForm
                isProcessing={m_maker_loading}
                onSubmit={handleFilterSubmit}
                onReset={handleFilterReset}
            />
            <Spacer />
            <TanstackReactTable
                columns={columns}
                title="Agent"
                data={marketMakerDetails?.data ?? []}
                loading={m_maker_loading}
                renderPagination={() => (
                    <TablePagination
                        paginationData={marketMakerDetails?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
            <LoadingBackdrop open={isTogglingStatus} />
        </PageContent>
    );
}
