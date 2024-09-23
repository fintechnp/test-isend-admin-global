import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import AddCampaignAttributeModal from "./AddCampaignAttributeModal";
import EditCampaignAttributeModal from "./EditCampaignAttributeModal";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import attributeFamilyActions from "Private/features/attributeFamily/attributeFamilyActions";

function ListCampaignAttribute() {
    const dispatch = useDispatch();
    const { response: attributeFamiliesData, loading: isLoading } = useSelector(
        (state) => state.get_attribute_family_list,
    );
    const { success: a_success } = useSelector((state) => state.add_attribute_family);
    const { success: u_success } = useSelector((state) => state.update_attribute_family);
    const { success: d_success } = useSelector((state) => state.delete_attribute_family);

    const handleDelete = (attributeFamilyId) => {
        dispatch(attributeFamilyActions.delete_attribute_family(attributeFamilyId));
    };

    useEffect(() => {
        dispatch(attributeFamilyActions.get_attribute_family_list());
        dispatch(attributeFamilyActions.delete_attribute_family_reset());
    }, [a_success, u_success, d_success]);

    const columns = useMemo(() => [
        {
            header: "Attribute Name",
            accessorKey: "attributeName",
        },
        {
            header: "Attribute Type Value Name",
            accessorKey: "attributeTypeValueName",
        },
        {
            header: "Attribute Type Value",
            accessorKey: "attributeTypeValue",
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
                            {/* <HasPermission permission={permissions.DELETE_CAMPAIGN_ATTRIBUTE_FAMILY}>
                                <ListItemButton
                                    onClick={() => {
                                        handleDelete(row.original.attributeFamilyId);
                                    }}
                                >
                                    Delete
                                </ListItemButton>
                            </HasPermission> */}
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
                    <TanstackReactTable
                        loading={isLoading}
                        columns={columns}
                        data={attributeFamiliesData?.data?.data ?? []}
                    />
                </PageContentContainer>
            </Column>

            <AddCampaignAttributeModal />
            <EditCampaignAttributeModal />
        </PageContent>
    );
}
export default withPermission({ permission: [permissions.READ_CAMPAIGN_ATTRIBUTE_FAMILY] })(ListCampaignAttribute);
