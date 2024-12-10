import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import { useConfirm } from "App/core/mui-confirm";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import AddCampaignAttributeModal from "./AddCampaignAttributeModal";
import EditCampaignAttributeModal from "./EditCampaignAttributeModal";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import dateUtils from "App/utils/dateUtils";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import attributeFamilyActions from "Private/features/attributeFamily/attributeFamilyActions";

function ListCampaignAttribute() {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const { response: attributeFamiliesData, loading: isLoading } = useSelector(
        (state) => state.get_attribute_family_list,
    );

    const { success: a_success } = useSelector((state) => state.add_attribute_family);
    const { success: u_success } = useSelector((state) => state.update_attribute_family);
    const { success: d_success } = useSelector((state) => state.delete_attribute_family);

    const handleCampaignAttribute = (attributeFamilyId) => {
        confirm({
            description: "Are you sure you want to delete this attribute ?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(attributeFamilyActions.delete_attribute_family(attributeFamilyId));
        });
    };

    const attributeFamilyDataSN = attributeFamiliesData?.data?.data?.map((item, index) => {
        return {
            f_serial_no: index + 1,
            ...item,
        };
    });
    useEffect(() => {
        dispatch(attributeFamilyActions.get_attribute_family_list());
        dispatch(attributeFamilyActions.delete_attribute_family_reset());
    }, [a_success, u_success, d_success]);

    const columns = useMemo(() => [
        { header: "S.N", accessorKey: "f_serial_no" },
        {
            header: "Attribute Name",
            accessorKey: "attributeName",
        },
        {
            header: "Attribute Type Value Name",
            accessorKey: "attributeTypeValueName",
        },
        {
            header: "Created At/By",
            accessorKey: "createdTs",
            cell: ({ getValue, row }) => (
                <Column>
                    <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                    <Typography>{row?.original?.createdBy ? row.original.createdBy : ""}</Typography>
                </Column>
            ),
        },
        {
            header: "Updated At/By",
            accessorKey: "updatedTs",
            cell: ({ getValue, row }) => (
                <Column>
                    <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                    <Typography>{row?.original?.updatedBy ? row.original.updatedBy : ""}</Typography>
                </Column>
            ),
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <PopoverButton>
                    {({ onClose }) => (
                        <>
                            <HasPermission permission={permissions.EDIT_CAMPAIGN_ATTRIBUTE_FAMILY}>
                                <ListItemButton
                                    onClick={() => {
                                        dispatch(attributeFamilyActions.open_update_modal(row.original));
                                    }}
                                >
                                    Edit
                                </ListItemButton>
                            </HasPermission>
                            <HasPermission permission={permissions.DELETE_CAMPAIGN_ATTRIBUTE_FAMILY}>
                                <ListItemButton
                                    onClick={() => {
                                        handleCampaignAttribute(row.original.attributeFamilyId, onClose());
                                    }}
                                >
                                    Delete
                                </ListItemButton>
                            </HasPermission>
                        </>
                    )}
                </PopoverButton>
            ),
        },
    ]);

    return (
        <PageContent
            documentTitle="Campaign Attribute Family"
            breadcrumbs={[
                {
                    label: "Campaign Attribute Family",
                },
            ]}
        >
            <Column gap="16px">
                <PageContentContainer
                    title="Campaign Attribute Family"
                    topRightContent={
                        <HasPermission permission={permissions.CREATE_CAMPAIGN_ATTRIBUTE_FAMILY}>
                            <Button
                                variant="contained"
                                onClick={() => dispatch(attributeFamilyActions.open_add_modal())}
                            >
                                Add Attribute Family
                            </Button>
                        </HasPermission>
                    }
                >
                    <TanstackReactTable loading={isLoading} columns={columns} data={attributeFamilyDataSN ?? []} />
                </PageContentContainer>
            </Column>

            <AddCampaignAttributeModal />
            <EditCampaignAttributeModal />
        </PageContent>
    );
}
export default withPermission({ permission: [permissions.READ_CAMPAIGN_ATTRIBUTE_FAMILY] })(ListCampaignAttribute);
