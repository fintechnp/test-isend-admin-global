import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import MuiIconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo } from "react";

import { Delete } from "App/components";
import Column from "App/components/Column/Column";
import withPermission from "Private/HOC/withPermission";
import AddPaymentRules from "./components/AddPaymentRules";
import ViewPaymentRule from "./components/ViewPaymentRule";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import { TablePagination, TableSwitch } from "App/components/Table";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/actions";
import PartnerType from "App/data/PartnerType";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import { CountryName, FormatNumber } from "App/helpers";
import useListFilterStore from "App/hooks/useListFilterStore";

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
}));

const StyledAction = styled(Typography)(({ theme, value }) => ({
    display: "inline-flex",
    height: "32px",
    opacity: 0.8,
    padding: "3px 8px",
    fontSize: "1rem",
    borderRadius: "16px",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "capitalize",
    color: stringToColor(value),
    background: alpha(stringToColor(value), 0.1),
}));

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "rule_name",
    order_by: "DESC",
};

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 9) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

const PaymentRules = (props) => {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const { response: paymentRules, loading: l_loading } = useSelector((state) => state.get_payment_rules);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_payment_rules);
    const { success: a_success } = useSelector((state) => state.add_payment_rules);
    const { success: u_success } = useSelector((state) => state.update_payment_rules);
    const { success: v_success } = useSelector((state) => state.update_payment_rules_status);

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        onPageChange,
        onDeleteFilterParams,
        onFilterSubmit,
        onQuickFilter,
        onRowsPerPageChange,
        reset,
        filterSchema,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch(actions.get_all_payment_rules(filterSchema));
        dispatch({ type: "ADD_PAYMENT_RULES_RESET" });
        dispatch({ type: "UPDATE_PAYMENT_RULES_RESET" });
        dispatch({ type: "DELETE_PAYMENT_RULES_RESET" });
        dispatch({ type: "UPDATE_PAYMENT_RULES_STATUS_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success, v_success]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "tid",
            },
            {
                header: "Rule Name",
                accessorKey: "rule_name",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "13px" }}>
                            {getValue() ? getValue() : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "10px", opacity: 0.7 }}>
                            {row?.original?.send_country ? CountryName(row?.original?.send_country) : "null"} to{" "}
                            {row?.original?.payout_country ? CountryName(row?.original?.payout_country) : "null"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: "Sending/Payout Partner",
                accessorKey: "sending_agent",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "4px", fontSize: "13px" }}>
                            {getValue() ? getValue() : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {row?.original?.payout_agent ? row?.original?.payout_agent : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right">
                        <Typography>Amount</Typography>
                    </Box>
                ),
                accessorKey: "amount",
                cell: ({ getValue }) => (
                    <Box textAlign="right">
                        {can(permissions.EDIT_PAYMENT_RULE) ? (
                            <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                                {getValue() ? FormatNumber(getValue()) : "N/A"}
                            </StyledName>
                        ) : (
                            <>{!!getValue() ? "Active" : "Inactive"}</>
                        )}
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>Transactions</Typography>
                    </Box>
                ),
                accessorKey: "no_of_transactions",
                cell: ({ getValue }) => (
                    <Box textAlign="center">
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {getValue() ? getValue() : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>Days</Typography>
                    </Box>
                ),
                accessorKey: "no_of_days",
                cell: ({ getValue }) => (
                    <Box textAlign="center">
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {getValue() ? getValue() : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>C. Action</Typography>
                    </Box>
                ),
                accessorKey: "compliance_action",
                cell: ({ getValue }) => (
                    <Box textAlign="center">
                        <StyledAction component="p" value={getValue() ? getValue() : "Null"}>
                            {getValue() ? getValue() : "N/A"}
                        </StyledAction>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right">
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessorKey: "is_active",
                cell: ({ getValue, row }) => (
                    <SwitchWrapper textAlign="right">
                        <TableSwitch value={getValue()} data={row?.original} handleStatus={handleStatus} />
                    </SwitchWrapper>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessorKey: "show",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ViewPaymentRule data={row?.original} onClose={onClose} />
                                <HasPermission permission={permissions.EDIT_PAYMENT_RULE}>
                                    <AddPaymentRules update={true} update_data={row?.original} enablePopoverAction />
                                </HasPermission>
                                <HasPermission permission={permissions.DELETE_PAYMENT_RULE}>
                                    <Delete
                                        id={row.original.tid}
                                        handleDelete={handleDelete}
                                        loading={d_loading}
                                        tooltext="Delete Payment Rules"
                                        enablePopoverAction
                                    />
                                </HasPermission>
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    const sub_columns = [
        { key: "tid", name: "Id", type: "default" },
        { key: "sending_agent", name: "Sending Partner", type: "default" },
        { key: "send_country", name: "Country", type: "country" },
        { key: "send_currency", name: "Sending Currency", type: "currency" },
        { key: "payout_agent", name: "Payout Partner", type: "default" },
        { key: "payout_country", name: "Payout Country", type: "country" },
        { key: "amount", name: "Amount", type: "number" },
        {
            key: "no_of_transactions",
            name: "No of Transactions",
            type: "default",
        },
        { key: "no_of_days", name: "No of Days", type: "default" },
        {
            key: "compliance_action",
            name: "Compliance Action",
            type: "default",
        },
        { key: "is_active", name: "Status", type: "boolean" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_payment_rules_status({ is_active: is_active }, id));
    }, []);

    const sortData = [
        { key: "None", value: "" },
        { key: "Rule Name", value: "rule_name" },
        { key: "Amount", value: "amount" },
        { key: "Created Date", value: "created_ts" },
    ];

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
        {
            type: fieldTypes.PARTNER_SELECT,
            name: "agent_id",
            label: "Payout Partner",
            partnerType: PartnerType.PAY,
        },
    ];

    const handleDelete = (id) => {
        dispatch(actions.delete_payemnt_rules(id));
    };

    return (
        <PageContent
            documentTitle="Payment Rules"
            breadcrumbs={[
                {
                    label: "Compliance",
                },
                {
                    label: "Payment Rules",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Payment Rules"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    values={filterSchema}
                    fields={filterFields}
                />
                <PageContentContainer
                    title="Payment Rules"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                sortByData={sortData}
                                values={filterSchema}
                                disabled={l_loading}
                            />
                            <HasPermission permission={permissions.CREATE_PAYMENT_RULE}>
                                <AddPaymentRules update={false} />
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={paymentRules?.data || []} loading={l_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={paymentRules?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_PAYMENT_RULE] })(PaymentRules);
