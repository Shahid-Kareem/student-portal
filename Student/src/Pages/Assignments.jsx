import React, { useEffect, useState } from "react";
import Topbar from "../Components/Topbar";
import "./Assignments.css";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const API_URL =
    "http://192.168.1.14:8001/api/subjects/assignments/";

  // 🔐 YOUR JWT TOKEN (TESTING ONLY)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc4MTM4NjE3LCJpYXQiOjE3NzgwNTIyMTcsImp0aSI6IjYyNWFlMGI0YjFmNTQzNmViYWUyNTgzODU5MDM1OGZlIiwidXNlcl9pZCI6MX0.jjvaYe1aeAQtGlgWWVJUspSzk4t_z3LOZiJ2WDJ4BL0";

  // ✅ FETCH FROM API WITH AUTH
  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or API error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API DATA:", data);

        setAssignments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // STATUS MAP
  const statusMap = {
    done: ["✅ Submitted", "success"],
    progress: ["⏳ In Progress", "warn"],
    late: ["🔴 Overdue", "danger"],
    pending: ["📋 Not Started", "muted"]
  };

  // SAFE FILTER
  const safeAssignments = Array.isArray(assignments)
    ? assignments
    : [];

  const filtered =
    filter === "all"
      ? safeAssignments
      : safeAssignments.filter((a) => a.status === filter);

  const stats = [
    {
      label: "Total",
      value: safeAssignments.length,
      key: "all",
      icon: "📝"
    },
    {
      label: "Submitted",
      value: safeAssignments.filter((a) => a.status === "done")
        .length,
      key: "done",
      icon: "✅",
      color: "success"
    },
    {
      label: "Pending",
      value: safeAssignments.filter(
        (a) => a.status === "pending"
      ).length,
      key: "pending",
      icon: "📋",
      color: "muted"
    },
    {
      label: "Overdue",
      value: safeAssignments.filter((a) => a.status === "late")
        .length,
      key: "late",
      icon: "🔴",
      color: "danger"
    }
  ];

  const icons = {
    Mathematics: "📊",
    Biology: "🧬",
    "Computer Sci.": "💻",
    English: "✍️",
    Chemistry: "⚗️",
    Urdu: "📝",
    Physics: "⚡",
    "Pakistan Studies": "🗺️"
  };

  return (
    <>
      <Topbar
        page="assignments"
        pageTitles={{ assignments: "Assignments" }}
      />

      <div className="assign-container">
        {loading ? (
          <h3>Loading assignments...</h3>
        ) : (
          <>
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
                    <div
                      className={`stat-value ${s.color}`}
                    >
                      {s.value}
                    </div>
                    <div className="stat-label">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FILTER BUTTONS */}
            <div className="filter-row">
              {[
                "all",
                "done",
                "progress",
                "pending",
                "late"
              ].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${
                    filter === f ? "active" : ""
                  }`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* LIST */}
            <div className="assignment-list">
              {filtered.map((a, i) => {
                const [text, colorKey] =
                  statusMap[a.status] || [
                    "Unknown",
                    "muted"
                  ];

                return (
                  <div
                    key={a.id || i}
                    className="assignment-card"
                  >
                    <div className="subject-icon">
                      {icons[a.subject] || "📄"}
                    </div>

                    <div className="assignment-info">
                      <div className="title">
                        {a.title}
                      </div>

                      <div className="meta">
                        <span>📚 {a.subject}</span>
                        <span>
                          📅 {a.due_date || a.due}
                        </span>
                        <span
                          className={`priority ${a.priority}`}
                        >
                          ⚑ {a.priority || "normal"} priority
                        </span>
                      </div>
                    </div>

                    <div
                      className={`status ${colorKey}`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Assignments;