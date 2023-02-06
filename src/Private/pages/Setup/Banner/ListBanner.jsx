import React from "react";

import Banners from "Private/components/banners/Banners";
import PageContent from "App/components/Container/PageContent";
import Button from "App/components/Button/Button";

export default function ListBanner() {
  return (
    <PageContent
      title="Banners"
      topRightEndContent={
        <>
          <Button>
            AddBanner
          </Button>
        </>
      }
    >
      <Banners />
    </PageContent>
  );
}
