import React from "react";
import { useDispatch } from "react-redux";

import Button from "App/components/Button/Button";
import Banners from "Private/components/banners/Banners";
import PageContent from "App/components/Container/PageContent";
import AddBannerModal from "Private/components/banners/AddBannerModal";
import EditBannerModal from "Private/components/banners/EditBannerModal";

export default function ListBanner() {
  const dispatch = useDispatch();

  return (
    <PageContent
      title="Banners"
      topRightEndContent={
        <>
          <Button onClick={() => dispatch({ type: "OPEN_ADD_BANNER_MODAL" })}>
            AddBanner
          </Button>
        </>
      }
    >
      <AddBannerModal />
      <EditBannerModal />
      <Banners />
    </PageContent>
  );
}
