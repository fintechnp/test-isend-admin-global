import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import buildRoute from "App/helpers/buildRoute";
import Button from "App/components/Button/Button";
import Spacer from "App/components/Spacer/Spacer";
import { TablePagination } from "App/components/Table";
import { CountryName, CurrencyName } from "App/helpers";
import NoResults from "../Transactions/components/NoResults";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import routePaths from "Private/config/routePaths";
import { MarketMakerActions as marketMakerAcions } from "./store/index";

const initialState = {
    Page: 1,
    PageSize: 10,
};

export default function MarketMaker({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const {
        response: marketMakerDetails,
        loading: m_maker_loading,
        success,
    } = useSelector((state) => state.get_all_market_maker);

    useEffect(() => {
        dispatch(marketMakerAcions?.get_all_market_maker(filterSchema));
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
                header: "Brand Name",
                accessorKey: "brandName",
            },
            {
                header: "Registration Number",
                accessorKey: "registrationNo",
            },
            {
                header: "country",
                accessorKey: "address.country",
                cell: ({ row }) => {
                    return <Typography>{CountryName(row?.original?.address?.country)}</Typography>;
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
                    console.log(getValue(), "sdsdasd");
                    return (
                        <Switch
                            defaultChecked={getValue()}
                            onChange={(e) => {
                                dispatch(marketMakerAcions.update_market_maker_status(row?.original?.marketMakerId));
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
        console.clear();
        console.log({ e: e.target.value, newPage });
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
    return (
        <PageContent
            title={title}
            documentTitle="Market Maker"
            topRightEndContent={
                <Button
                    onClick={() => {
                        navigate(routePaths.agent.addMarketMaker);
                    }}
                >
                    Add Market Maker
                </Button>
            }
        >
            {m_maker_loading && (
                <Grid item xs={12}>
                    <Loading loading={m_maker_loading} />
                </Grid>
            )}
            {!m_maker_loading && marketMakerDetails?.data && marketMakerDetails?.data?.length === 0 && (
                <Grid item xs={12}>
                    <NoResults text="No Market Maker Found" />
                </Grid>
            )}

            <Spacer />
            <TanstackReactTable
                columns={columns}
                title="Market Maker"
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
        </PageContent>
    );
}
