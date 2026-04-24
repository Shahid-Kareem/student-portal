import React from "react";

const GradeChip = ({ g }) => {
  const styles = {
    "grade-A": {
      background: "rgba(16,185,129,0.12)",
      color: "#059669",
    },
    "grade-B": {
      background: "rgba(79,124,247,0.12)",
      color: "#3b6fe0",
    },
    "grade-C": {
      background: "rgba(245,158,11,0.12)",
      color: "#d97706",
    },
    "grade-D": {
      background: "rgba(239,68,68,0.12)",
      color: "#dc2626",
    },
  };

  const key = g.startsWith("A")
    ? "grade-A"
    : g.startsWith("B")
    ? "grade-B"
    : g.startsWith("C")
    ? "grade-C"
    : "grade-D";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 99,
        fontSize: "0.75rem",
        fontWeight: 700,
        fontFamily: "Plus Jakarta Sans, sans-serif",
        ...styles[key],
      }}
    >
      {g}
    </span>
  );
};

export default GradeChip;