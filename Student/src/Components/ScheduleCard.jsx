import React, { useState } from "react";
import { schedule } from "../Data/Schedule";
import { subjects } from "../Data/Subjects";
import Card from "./Card";
import CardHeader from "./CardHeader";
import ProgressBar from "./ProgressBar";
import "./ScheduleCard.css";

function ScheduleCard() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [active, setActive] = useState("Wednesday");

  const dayClasses = schedule[active] || [];

  const ignoreSubjects = [
    "Break",
    "Zuhr & Lunch",
    "Jumu'ah Prayer"
  ];

  const getWeeklySummary = () => {
    const summary = {};

    Object.values(schedule).forEach((day) => {
      day.forEach((cls) => {
        if (ignoreSubjects.includes(cls.subject)) return;

        if (summary[cls.subject]) {
          summary[cls.subject].count++;
        } else {
          summary[cls.subject] = {
            count: 1,
            color: cls.color
          };
        }
      });
    });

    return summary;
  };

  const weeklySummary = getWeeklySummary();

  return (
    <div className="schedule-container">

      {/* DAYS */}
      <div className="days">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setActive(d)}
            className={`day-btn ${active === d ? "active" : ""}`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="schedule-grid">

        {/* LEFT: CLASSES */}
        <Card>
          <CardHeader title={`📅 ${active}'s Classes`} />

          {dayClasses.map((c, i) => (
            <div key={i} className="class-row">

              <div className="time">{c.time}</div>

              <div
                className="dot"
                style={{ background: c.color }}
              />

              <div>
                <div className="subject">{c.subject}</div>
                <div className="meta">
                  {c.room}{c.teacher ? ` · ${c.teacher}` : ""}
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* RIGHT SIDE */}
        <div className="right-side">

          {/* WEEKLY SUMMARY */}
          <Card>
            <div className="section-title">📊 Weekly Summary</div>

            {Object.entries(weeklySummary).map(([subject, data], i) => (
              <div key={i} className="summary-row">

                <div className="summary-top">
                  <span>{subject}</span>
                  <span className="muted">
                    {data.count} periods/wk
                  </span>
                </div>

                <ProgressBar
                  pct={(data.count / 5) * 100}
                  color={data.color}
                  height={5}
                />

              </div>
            ))}
          </Card>

          {/* ROOM GUIDE */}
          <Card>
            <div className="section-title">🏫 Room Guide</div>

            {dayClasses.map((cls, i) => (
              <div key={i} className="room-row">

                <span className="room">{cls.room}</span>

                <span className="muted">
                  {cls.subject}
                </span>

              </div>
            ))}
          </Card>

        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;