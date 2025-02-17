import React from "react";
import { useDispatch } from "react-redux";

import Button from "App/components/Button/Button";
import Banners from "Private/components/banners/Banners";
import withPermission from "Private/HOC/withPermission";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";
import AddBannerModal from "Private/components/banners/AddBannerModal";
import EditBannerModal from "Private/components/banners/EditBannerModal";

import { permissions } from "Private/data/permissions";
import PageContentContainer from "App/components/Container/PageContentContainer";

function ListBanner() {
    const dispatch = useDispatch();

    return (
        <PageContent
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Banners",
                },
            ]}
        >
            <PageContentContainer
                title="Banners"
                topRightContent={
                    <>
                        <HasPermission permission={[permissions.CREATE_BANNER]}>
                            <Button onClick={() => dispatch({ type: "OPEN_ADD_BANNER_MODAL" })}>Add Banner</Button>
                        </HasPermission>
                    </>
                }
            >
                <HasPermission permission={[permissions.CREATE_BANNER]}>
                    <AddBannerModal />
                </HasPermission>
                <HasPermission permission={[permissions.EDIT_BANNER]}>
                    <EditBannerModal />
                </HasPermission>
                <Banners />
            </PageContentContainer>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_BANNER] })(ListBanner);
