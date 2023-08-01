import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import Button from "App/components/Button/Button";
import Spacer from "App/components/Spacer/Spacer";
import { CountryName, CurrencyName } from "App/helpers";
import NoResults from "../Transactions/components/NoResults";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import routePaths from "Private/config/routePaths";

import { MarketMakerActions as marketMakerAcions } from "./store/index";
import buildRoute from "App/helpers/buildRoute";

export default function MarketMaker({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { response: marketMakerDetails, loading: m_maker_loading } = useSelector(
        (state) => state.get_all_market_maker,
    );

    useEffect(() => {
        dispatch(marketMakerAcions?.get_all_market_maker());
    }, []);

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
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.viewMarketMaker, row?.original?.MarketMaker));
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
            />
        </PageContent>
    );
}
