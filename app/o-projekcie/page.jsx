import About from "@/components/about";
import Header from "@/components/header";
import React from "react";

export const metadata = {
  title: "O projekcie CodeStoryBro",
  description: "Dowiedz się więcej o projekcie CodeStoryBro i podejściu do mentoringu.",
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
