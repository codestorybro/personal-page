import Header from "@/components/header";
import PersonalInfo from "@/components/personal-info";
import React from "react";

export const metadata = {
  title: "Home-2 || Bostami - Professional portfolio NextJS Template",
  description:
    "Discover Botami, the most impressive portfolio template for work showcase, blog",
};
export default function Home() {
  return (
    <>
      <div className="page-wrapper page-wrapper-2">
        <Header />
        <div className="bostami-page-area z-index-3">
          <div className="container">
            <PersonalInfo />
          </div>
        </div>
      </div>
    </>
  );
}
