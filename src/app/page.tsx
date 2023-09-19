import React from "react";
import Sidenav from "./sidenav/sidenav";
import Link from "next/link";
import Add_Product from "@/app/add-product/page";
import All_Products from "@/app/all-products/page";
import Ordered from "@/app/ordered/page";

const page = () => {
  return (
    <div>
      <Sidenav />
    </div>
  );
};

export default page;
