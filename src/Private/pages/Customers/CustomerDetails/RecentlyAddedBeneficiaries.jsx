import Box from "@mui/material/Box";
import React, { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate, useParams } from "react-router-dom";

import { Block } from "App/components";
import Row from "App/components/Row/Row";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import ActiveBlockedStatusBadge from "App/components/Badge/ActiveBlockedStatusBadge";

import { ReferenceName } from "App/helpers";
import buildRoute from "App/helpers/buildRoute";
import actions from "../Beneficiary/store/actions";
import routePaths from "Private/config/routePaths";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";
import { getBeneficiaryFullName } from "App/helpers/getFullName";
import getFlagUrl from "App/helpers/getFlagUrl";
import PhoneIcon from "App/components/Icon/PhoneIcon";

const initialState = {
    page_number: 1,
    page_size: 5,
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

function RecentlyAddedBeneficiaries() {
    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { response: customersData, loading: isLoading } = useSelector((state) => state.get_beneficiary_by_customer);

    const { success: b_success, loading: b_loading } = useSelector((state) => state.block_unblock_beneficiary);

    useEffect(() => {
        dispatch({ type: "CREATE_BENEFICIARY_RESET" });
        dispatch({ type: "UPDATE_BENEFICIARY_RESET" });
        dispatch({ type: "GET_BENEFICIARY_BYID_RESET" });
        dispatch({ type: "BLOCK_UNBLOCK_BENEFICIARY_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_beneficiary_by_customer(id, initialState));
        dispatch({ type: "BLOCK_UNBLOCK_BENEFICIARY_RESET" });
    }, [dispatch, b_success]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
                maxWidth: 50,
            },
            {
                header: "Name",
                accessorKey: "first_name",
                cell: ({ row }) => (
                    <Row alignItems="center" gap="8px">
                        <BadgeAvatar
                            avatarDimension={28}
                            smallAvatarDimension={14}
                            altAvatarText={getBeneficiaryFullName(row.original)}
                            smallAvatarUrl={getFlagUrl(row.original.country_iso2)}
                            disableCustomStyle
                            avatarSx={{
                                fontSize: 12,
                            }}
                        />
                        <Box>
                            <Typography fontWeight={500}>
                                {getBeneficiaryFullName(row.original)} ({row.original.beneficiary_id})
                            </Typography>
                            <Row alignItems="center" gap="4px">
                                <PhoneIcon />
                                <Typography variant="body2">
                                    +{row.original.phone_country_code} - {row?.original?.mobile_number}
                                </Typography>
                            </Row>
                        </Box>
                    </Row>
                ),
            },
            {
                header: "Collection",
                accessorKey: "payment_type",
                cell: ({ getValue, row }) => {
                    return (
                        <>
                            <Typography>{ReferenceName(referenceTypeId.paymentType, getValue())}</Typography>
                            <Typography color="text.secondary">
                                {row?.original?.bank_name ? row?.original?.bank_name : ""}
                            </Typography>
                        </>
                    );
                },
            },
            {
                header: "Status",
                accessorKey: "is_active",
                maxWidth: 100,
                cell: ({ getValue }) => <ActiveBlockedStatusBadge status={getValue() ? "active" : "blocked"} />,
            },
            {
                header: "Relation",
                accessorKey: "relation",
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
                                        navigate(
                                            buildRoute(routePaths.ViewCustomerBeneficiary, {
                                                id: row.original.customer_id,
                                                bene_id: row.original.tid,
                                            }),
                                        )
                                    }
                                >
                                    View
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() =>
                                        navigate(
                                            buildRoute(routePaths.EditCustomerBeneficiary, {
                                                id: row.original.customer_id,
                                                bene_id: row.original.tid,
                                            }),
                                        )
                                    }
                                >
                                    Edit
                                </ListItemButton>
                                <Block
                                    name="Beneficiary"
                                    destroyOnUnmount
                                    enableReinitialize
                                    initialValues={{
                                        id: row.original.tid,
                                        is_active: row?.original?.is_active,
                                    }}
                                    onSubmit={handleBlock}
                                    loading={b_loading}
                                    status={row?.original?.is_active}
                                    onClose={onClose}
                                    enablePopoverAction
                                />
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    const handleBlock = (data) => {
        dispatch(
            actions.block_unblock_beneficiary(data?.id, {
                is_active: !data?.is_active,
            }),
        );
    };

    return <TanstackReactTable columns={columns} data={customersData?.data ?? []} loading={isLoading} />;
}

export default RecentlyAddedBeneficiaries;
