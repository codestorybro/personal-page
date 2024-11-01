import About from "@/components/about";
import Header from "@/components/header";
import React from "react";

export const metadata = {
  title: "About || Bostami - Professional portfolio NextJS Template",
  description:
    "Discover Botami,the most impressive portfolio template for work showcase, blog",
};

export default function page() {
  return (
    <>
      <div className="page-wrapper page-wrapper-2">
        <Header />
        <div className="bostami-page-area z-index-3">
          <div className="container">
            <About />
          </div>
        </div>
      </div>
    </>
  );
}
