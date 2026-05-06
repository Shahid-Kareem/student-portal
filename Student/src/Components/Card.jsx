import React from "react";

const Card = ({ children, style = {} }) => {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 22,
        boxShadow: "var(--shadow)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;