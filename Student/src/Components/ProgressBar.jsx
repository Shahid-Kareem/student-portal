import React from "react";

const ProgressBar = ({ pct, color = "var(--accent3)", height = 6 }) => {
  return (
    <div
      style={{
        height,
        background: "#e9edf4",
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: color,
          borderRadius: 99,
          transition: "width 1s ease",
        }}
      />
    </div>
  );
};

export default ProgressBar;