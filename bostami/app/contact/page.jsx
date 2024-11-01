import Contact from "@/components/homes/contact";
import Header from "@/components/homes/header";
import React from "react";

export const metadata = {
  title: "Contact-2 || Bostami - Professional portfolio NextJS Template",
  description:
    "Discover Botami,the most impressive portfolio template for work showcase, blog",
};

export default function page() {
  return (
    <>
      <div className="page-wrapper page-wrapper-2">
        <Header />
        <Contact />
      </div>
    </>
  );
}
