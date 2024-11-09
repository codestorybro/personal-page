import { socialMediaData } from "@/data/socials";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function PersonalInfo() {
  return (
    <div className="col-12">
      <div className="bostami-parsonal-info-area bostami-parsonal-info-2-area">
        <div className="bostami-parsonal-info-wrap">
          <div className="bostami-parsonal-info-img">
            <Image
              width={240}
              height={240}
              src="/assets/img/logo.png"
              alt="profile"
            />
          </div>

          <h4 className="bostami-parsonal-info-name">
            Siema 👋
          </h4>

          <ul className="bostami-parsonal-info-social-link mb-30">
            {socialMediaData.map((elm, i) => (
              <li key={i}>
                <a style={{ color: elm.color }} href={elm.href} target="_blank">
                  <i className={elm.className}></i>
                </a>
              </li>
            ))}
              <li key='x-unique-id'>
                <a href="https://x.com/codestorybro" target="_blank">
                  <Image
                    width={20}
                    height={20}
                    src="/assets/img/x-twitter-brands-solid.svg"
                    alt="x-icon"
                  />
                </a>
              </li>

          </ul>

          <div className="bostami-parsonal-info-btn">
          <Link
              href='/o-projekcie'
              className="btn-2 circle"
            >
              <span>O projekcie</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
