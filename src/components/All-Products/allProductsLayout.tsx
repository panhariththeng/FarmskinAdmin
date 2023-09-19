import React from "react";
import Sidenav from "@/app/sidenav/sidenav";
import ListProduct from "@/components/listProduct/page";

const allsProductLayout = () => {
  return (
    <>
      <Sidenav>
        <div>
          <ListProduct />
        </div>
      </Sidenav>
    </>
  );
};

export default allsProductLayout;
