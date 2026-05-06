import React from "react";
import Avatar from "./Avatar";
import {student} from '../Data/Student';
import "./Topbar.css";

const Topbar = ({ page, pageTitles }) => {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="topbar">

      {/* LEFT */}
      <div>
        <div className="topbar-title">
          {pageTitles[page]}
        </div>

        <div className="topbar-date">
          {today}
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">

        <div className="topbar-semester">
          📆 Spring 2026
        </div>

        {["🔔", "✉️"].map((ic, i) => (
          <div key={i} className="topbar-icon">
            {ic}

            {i === 0 && (
              <div className="topbar-notification-dot" />
            )}
          </div>
        ))}

        <Avatar initials={student.name.split(" ").map(n => n[0]).join("")}
         size={36}
          />

      </div>
    </header>
  );
};

export default Topbar;