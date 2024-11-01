import Header from "@/components/header";
import Portfolio from "@/components/portfolio";
import React from "react";

export const metadata = {
  title: "Portfolio-2 || Bostami - Professional portfolio NextJS Template",
  description:
    "Discover Botami,the most impressive portfolio template for work showcase, blog",
};

export default function page() {
  return (
    <>
      <div className="page-wrapper page-wrapper-2">
        <Header />
        <Portfolio />
      </div>
    </>
  );
}
