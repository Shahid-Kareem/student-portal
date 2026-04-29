import React from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import "./AttendanceCard.css";

const AttendanceCard = ({ setPage, attendance }) => {

  const total = attendance.present + attendance.absent + attendance.late;
  const pct = total > 0 ? Math.round((attendance.present / total) * 100) : 0;

  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <Card>
      <CardHeader
        title="✅ Attendance"
        action="History →"
        onAction={() => setPage("attendance")}
      />

      <div className="attendance-chart">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" className="circle-bg" />

          <circle
            cx="60"
            cy="60"
            r="50"
            className="circle-progress"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />

          <text x="60" y="56" textAnchor="middle" className="percent-text">
            {pct}%
          </text>

          <text x="60" y="72" textAnchor="middle" className="term-text">
            This Term
          </text>
        </svg>
      </div>

      <div className="attendance-stats">
        {[
          [attendance.present, "Present", "success"],
          [attendance.absent, "Absent", "danger"],
          [attendance.late, "Late", "warn"]
        ].map(([n, l, c]) => (
          <div key={l} className="stat-box">
            <div className={`stat-number ${c}`}>{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AttendanceCard;