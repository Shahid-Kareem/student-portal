import React from "react";
import "./ExamCard.css";

const ExamCard = ({ exam }) => {
  const { subject, type, day, mon, duration, marks, room, status, score, color } = exam;

  return (
    <div className="exam-card" style={{ borderLeft: `3px solid ${color}` }}>

      <div className="exam-top">

        {/* DATE BOX */}
        <div className="date-box" style={{ background: `${color}22` }}>
          <div className="date-day" style={{ color }}>{day}</div>
          <div className="date-mon">{mon}</div>
        </div>

        {/* INFO */}
        <div className="exam-info">
          <div className="exam-subject">{subject}</div>
          <div className="exam-type">{type}</div>
        </div>

        {/* SCORE (only for completed) */}
        {status === "done" && (
          <div className="exam-score">{score}</div>
        )}
      </div>

      {/* DETAILS */}
      <div className="exam-details">
        <div><span>⏱</span>{duration}</div>
        <div><span>📝</span>{marks} Marks</div>
        <div><span>📍</span>{room}</div>
      </div>

    </div>
  );
};

export default ExamCard;