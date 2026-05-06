import React from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import "./RecentNotices.css";

const RecentNotices = ({ notices, setPage }) => {

  const colors = {
    exam: "var(--danger)",
    event: "var(--accent3)",
    holiday: "var(--accent)",
    fee: "var(--warn)",
    meeting: "var(--accent2)"
  };

  return (
    <div className="notice">
          <Card>
      <CardHeader
        title="🔔 Recent Notices"
        action="All Notices →"
        onAction={() => setPage("notices")}
      />

      <div className="notices-grid">
        {notices.slice(0, 3).map((n, i) => (
          <div
            key={i}
            className="notice-card"
            style={{ borderLeft: `3px solid ${colors[n.type]}` }}
          >
            <div className="notice-title">{n.title}</div>
            <div className="notice-date">{n.date}</div>
            <div className="notice-body">
              {n.body.slice(0, 90)}...
            </div>
          </div>
        ))}
      </div>
    </Card>
    </div>

  );
};

export default RecentNotices;