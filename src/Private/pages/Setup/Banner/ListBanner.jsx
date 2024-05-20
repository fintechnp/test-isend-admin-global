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

function ListBanner() {
    const dispatch = useDispatch();

    return (
        <PageContent
            title="Banners"
            topRightEndContent={
                <HasPermission permission={[permissions.CREATE_BANNER]}>
                    <Button onClick={() => dispatch({ type: "OPEN_ADD_BANNER_MODAL" })}>AddBanner</Button>
                </HasPermission>
            }
        >
            <HasPermission permission={[permissions.CREATE_BANNER]}>
                <AddBannerModal />
            </HasPermission>
            <HasPermission permission={[permissions.EDIT_BANNER]}>
                <EditBannerModal />
            </HasPermission>
            <Banners />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_BANNER] })(ListBanner);
