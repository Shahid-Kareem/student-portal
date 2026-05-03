import React from "react";

const NoticeCard = ({ notice, isOpen, onClick }) => {

  const typeColor = {
    exam: "var(--danger)",
    event: "var(--accent3)",
    holiday: "var(--accent)",
    fee: "var(--warn)",
    meeting: "var(--accent2)"
  };

  const typeLabel = {
    exam: "📋 Exam",
    event: "🎉 Event",
    holiday: "🌙 Holiday",
    fee: "💰 Fee",
    meeting: "👥 Meeting"
  };

  const color = typeColor[notice.type];

  return (
    <div
      className={`notice-card ${isOpen ? "active" : ""}`}
      onClick={onClick}
      style={{ borderLeft: `3px solid ${color}` }}
    >

      {/* HEADER */}
      <div className="notice-header">

        <div className="notice-title">
          {notice.title}
        </div>

        <span
          className="notice-badge"
          style={{
            background: `${color}22`,
            color: color
          }}
        >
          {typeLabel[notice.type]}
        </span>

      </div>

      {/* DATE */}
      <div className="notice-date">
        {notice.date}
      </div>

      {/* EXPANDABLE BODY */}
      {isOpen && (
        <div className="notice-body">
          {notice.body}
        </div>
      )}

    </div>
  );
};

export default NoticeCard;