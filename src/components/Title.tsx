import React from "react";

export interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <div className="flex title-container">
      <img src="/smoothies.png" alt="A selection of three fruity smoothies" />
      <h1>{text}</h1>
    </div>
  );
}
