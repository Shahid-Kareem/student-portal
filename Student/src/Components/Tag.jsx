import React from "react";

const Tag = ({ children, color = "blue" }) => {
  const styles = {
    blue: {
      borderColor: "rgba(79,124,247,0.35)",
      color: "var(--accent)",
      background: "rgba(79,124,247,0.08)",
    },
    purple: {
      borderColor: "rgba(147,51,234,0.35)",
      color: "var(--accent2)",
      background: "rgba(147,51,234,0.08)",
    },
    teal: {
      borderColor: "rgba(16,185,129,0.35)",
      color: "var(--accent3)",
      background: "rgba(16,185,129,0.08)",
    },
    orange: {
      borderColor: "rgba(245,158,11,0.35)",
      color: "var(--accent4)",
      background: "rgba(245,158,11,0.08)",
    },
    red: {
      borderColor: "rgba(239,68,68,0.35)",
      color: "var(--danger)",
      background: "rgba(239,68,68,0.08)",
    },
  };

  return (
    <span
      style={{
        padding: "3px 11px",
        borderRadius: "99px",
        fontSize: "0.72rem",
        fontWeight: 600,
        border: "1px solid",
        display: "inline-block",
        ...styles[color],
      }}
    >
      {children}
    </span>
  );
};

export default Tag;