import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo } from "react";

import Column from "App/components/Column/Column";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/actions";
import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import { TableSwitch } from "App/components/Table";

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));

const ListApplicationConfig = () => {
    const dispatch = useDispatch();

    const { loading, response } = useSelector((state) => state.get_application_config);
    const { success: updateSuccess } = useSelector((state) => state.update_application_config);

    const handleApplicationConfig = useCallback(
        (data) => {
            dispatch(actions.update_application_config(data));
        },
        [updateSuccess],
    );

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
                cell: ({ row }) => <>{row.index + 1}</>,
            },
            {
                header: "Promo Enabled",
                accessorKey: "isPromoEnabled",
                cell: ({ row, getValue }) => (
                    <SwitchWrapper>
                        <TableSwitch
                            value={getValue()}
                            data={row.original}
                            handleStatus={() =>
                                handleApplicationConfig({
                                    isPromoEnabled: !getValue(),
                                    isReferralEnabled: row.original.isReferralEnabled,
                                })
                            }
                        />
                    </SwitchWrapper>
                ),
            },
            {
                header: "Referral Enabled",
                accessorKey: "isReferralEnabled",
                cell: ({ row, getValue }) => (
                    <SwitchWrapper>
                        <TableSwitch
                            value={getValue()}
                            data={row.original}
                            handleStatus={() =>
                                handleApplicationConfig({
                                    isPromoEnabled: row.original.isPromoEnabled,
                                    isReferralEnabled: !getValue(),
                                })
                            }
                        />
                    </SwitchWrapper>
                ),
            },
            {
                header: "Created At/By",
                accessorKey: "createdTs",
                cell: ({ getValue, row }) => {
                    return (
                        <Column>
                            <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                            <Typography>By: {row.original.createdBy ? row.original.createdBy : "-"}</Typography>
                        </Column>
                    );
                },
            },
            {
                header: "Updated At/By",
                accessorKey: "updatedTs",
                cell: ({ getValue, row }) => {
                    return (
                        <Column>
                            <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                            <Typography>By: {row.original.updatedBy ? row.original.updatedBy : "-"}</Typography>
                        </Column>
                    );
                },
            },
        ],
        [],
    );

    useEffect(() => {
        dispatch(actions.get_application_config());
    }, [dispatch]);

    return (
        <PageContent
            documentTitle="Application Config"
            breadcrumbs={[{ label: "Setup" }, { label: "Application Config" }]}
        >
            <Column gap="16px">
                <PageContentContainer title="Application Config">
                    <TanstackReactTable
                        columns={columns || []}
                        data={isEmpty(response.data) ? [] : [{ ...response.data }]}
                        loading={loading}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
};

export default ListApplicationConfig;
