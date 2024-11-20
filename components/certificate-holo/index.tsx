import React, { FC, useState } from 'react';
import './Holo.scss'

interface Props {
    user: {
        type: string;
        certId: string;
        name: string;
    }
}

export const CertificateHolo: FC<Props> = ({ user }) => {
    if (!user) return
    const { type, certId, name } = user

    const [hoverStyles, setHoverStyles] = useState("");

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const posX = e.type === "mousemove" ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const posY = e.type === "mousemove" ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
    const width = card.offsetWidth;
    const height = card.offsetHeight;

    const px = Math.abs(Math.floor((100 / width) * posX) - 100);
    const py = Math.abs(Math.floor((100 / height) * posY) - 100);
    const pa = (50 - px) + (50 - py);

    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const pxSpark = 50 + (px - 50) / 7;
    const pySpark = 50 + (py - 50) / 7;
    const pOpc = 20 + Math.abs(pa) * 1.5;

    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;

    const gradPos = `background-position: ${lp}% ${tp}%;`;
    const sparkPos = `background-position: ${pxSpark}% ${pySpark}%; opacity: ${pOpc / 100};`;
    const transformStyle = `transform: rotateX(${ty}deg) rotateY(${tx}deg);`;

    const style = `
      .card:hover:before { ${gradPos} }
      .card:hover:after { ${sparkPos} }
    `;

    setHoverStyles(style);
    card.style.transform = transformStyle;
  };

  const handleMouseOut = (card) => {
    setHoverStyles("");
    card.style.transform = "";
  };

  return (
    <main id="app">
      <section className="cards">
        <div
            key={name}
            className={`card cert`}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onTouchMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseOut={(e) => handleMouseOut(e.currentTarget)}
            onTouchEnd={(e) => handleMouseOut(e.currentTarget)}
            onTouchCancel={(e) => handleMouseOut(e.currentTarget)}
        />
        </section>
        <style>{hoverStyles}</style>
    </main>
  );
}