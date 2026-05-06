import React from "react";

const Avatar = ({
  initials,
  size = 40,
  gradient = "135deg, #4f7cf7, #9333ea",
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size >= 60 ? size / 2 : 10,
        background: `linear-gradient(${gradient})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontWeight: 700,
        fontSize: size * 0.28,
        flexShrink: 0,
        color: "#fff",
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;