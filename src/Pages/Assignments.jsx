import React, { useState } from "react";
import Topbar from '../Components/Topbar';
import { assignments } from "../Data/Assignments";
import "./Assignments.css";

const Assignments = () => {
  const [filter, setFilter] = useState("all");

  const statusMap = {
    done: ["✅ Submitted", "success"],
    progress: ["⏳ In Progress", "warn"],
    late: ["🔴 Overdue", "danger"],
    pending: ["📋 Not Started", "muted"],
  };

  const filtered =
    filter === "all"
      ? assignments
      : assignments.filter((a) => a.status === filter);

  const stats = [
    {
      label: "Total",
      value: assignments.length,
      key: "all",
      icon: "📝",
    },
    {
      label: "Submitted",
      value: assignments.filter((a) => a.status === "done").length,
      key: "done",
      icon: "✅",
      color: "success",
    },
 
    {
        label: "Pending",
        value: assignments.filter((a)=>a.status==="pending").length,
        key: "pending",
        icon:"📋",
        color: "muted",
    },
    {
      label: "Overdue",
      value: assignments.filter((a) => a.status === "late").length,
      key: "late",
      icon: "🔴",
      color: "danger",
    },
  ];
   const icons = {"Mathematics":"📊","Biology":"🧬","Computer Sci.":"💻","English":"✍️","Chemistry":"⚗️","Urdu":"📝","Physics":"⚡","Pakistan Studies":"🗺️"};

  return (
    <>
    <Topbar 
        page="assignments" 
        pageTitles={{ assignments: "Assignments" }} 
      />
    <div className="assign-container">

      {/* STATS */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div
            key={s.key}
            className="stat-card"
            onClick={() => setFilter(s.key)}
          >
            <div className="stat-icon">{s.icon}</div>
            <div>
              <div className={`stat-value ${s.color}`}>
                {s.value}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER BUTTONS */}
      <div className="filter-row">
        {["all", "done", "progress", "pending", "late"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all"
              ? "All"
              : f === "done"
              ? "Submitted"
              : f === "progress"
              ? "In Progress"
              : f === "pending"
              ? "Not Started"
              : "Overdue"}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="assignment-list">
        {filtered.map((a, i) => {
          const [text, colorKey] = statusMap[a.status];

          return (
            <div key={i} className="assignment-card">

               <div className="subject-icon">
               {icons[a.subject] || "📄"}
               </div>

              <div className="assignment-info">
                <div className="title">{a.title}</div>

                <div className="meta">
                  <span>📚 {a.subject}</span>
                  <span>📅 {a.due}</span>
                  <span className={`priority ${a.priority}`}>
                    ⚑ {a.priority} priority
                  </span>
                </div>
              </div>

              <div className={`status ${colorKey}`}>
                {text}
              </div>

            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Assignments;