import React from "react";

const CardHeader = ({ title, action, onAction }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "var(--text)",
        }}
      >
        {title}
      </div>

      {action && (
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--accent)",
            cursor: "pointer",
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 6,
            background: "rgba(79,124,247,0.08)",
          }}
          onClick={onAction}
        >
          {action}
        </span>
      )}
    </div>
  );
};

export default CardHeader;