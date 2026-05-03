import React, { useState } from "react";
import Topbar from '../Components/Topbar';
import { exams } from "../Data/Exams";
import ExamCard from "../Components/ExamCard";
import "./Exams.css";

const Exams = () => {
  const [tab, setTab] = useState("upcoming");

  const shown = exams.filter(e => e.status === tab);

  const stats = [
    {
      label: "Upcoming",
      value: exams.filter(e => e.status === "upcoming").length,
      color: "var(--accent)",
      icon: "🗓",
      key: "upcoming"
    },
    {
      label: "Completed",
      value: exams.filter(e => e.status === "done").length,
      color: "var(--success)",
      icon: "✅",
      key: "done"
    },
    {
      label: "This Month",
      value: exams.length,
      color: "var(--warn)",
      icon: "📅",
      key: "upcoming"
    }
  ];

  return (
    <>
        <Topbar 
        page="exams" 
        pageTitles={{ exams: "Examinations" }} 
      />
      <div className="exams-container">
      {/* STATS */}
      <div className="exam-stats">
        {stats.map((s) => (
          <div key={s.label} className="stat-card" onClick={() => setTab(s.key)}>
            <div className="stat-icon">{s.icon}</div>
            <div>
              <div className="stat-value" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="exam-tabs">
        {["upcoming", "done"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t === "upcoming" ? "📅 Upcoming" : "✅ Completed"}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="exam-grid">
        {shown.map((e, i) => (
          <ExamCard key={i} exam={e} />
        ))}
      </div>

    </div>
    </>
  
  );
};

export default Exams;