import Header from "@/components/header";
import Resume from "@/components/resume/Resume";
import React from "react";

export const metadata = {
  title: "CodeStoryBro",
  description:
    "Discover Botami,the most impressive portfolio template for work showcase, blog",
};

export default function page() {
  return (
    <>
      <div className="page-wrapper page-wrapper-2">
        <Header />
        <Resume />
      </div>
    </>
  );
}
