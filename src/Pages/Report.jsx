import React from "react";
import "./Report.css";
import Card from "../Components/Card";
import CardHeader from "../Components/CardHeader";
import ProgressBar from "../Components/ProgressBar";
import { reportCard } from "../Data/Reportcard";

const GradeChip = ({ g }) => (
  <div className="rc-grade-chip">{g}</div>
);

const Report = () => {

  // ✅ calculate average
  const calculateAverage = (subjects) => {
    const total = subjects.reduce((sum, s) => sum + s.marks, 0);
    return total / subjects.length;
  };

  // ✅ progress + term color
  const getProgressColor = (pct, hasFail) => {
    if (pct >= 90) return "var(--accent3)";
    if (pct >= 80) return "var(--accent)";
    if (pct >= 75) return "var(--accent2)";
    if (pct >= 70) return "var(--darkorange)";
    if (pct >= 65) return "var(--lightblue)";
    if (pct >= 60) return "var(--muted)";
    if (pct >= 50) return "var(--warn)";
    return "var(--danger)";
 
  };

  // ✅ subject color
  const getSubjectColor = (marks) => {
    if (marks >= 90) return "var(--accent3)";
    if (marks >= 80) return "var(--accent)";
    if (marks >= 75) return "var(--accent2)";
    if (marks >= 70) return "var(--darkorange)";
    if (marks >= 65) return "var(--lightblue)";
    if (marks >= 60) return "var(--muted)";
    if (marks >= 50) return "var(--warn)";
    return "var(--danger)";
  };

  return (
    <div className="rc-page">

      {/* TERM CARDS */}
      <div className="rc-stack">
        {reportCard.map((t, ti) => {

          const avg = calculateAverage(t.subjects);
          const avgDisplay = avg.toFixed(1);

          // 🔥 detect fail
          const hasFail = t.subjects.some(s => s.marks < 50);

          // 🔥 ONE color for whole term
          const termColor = getProgressColor(avg, hasFail);

          return (
            <Card key={ti}>

              {/* HEADER */}
              <div className="rc-header-row">
                <div>
                  <div className="rc-term">{t.term}</div>
                  <div className="rc-subtext">
                    Class Rank: {t.rank} / 38 students
                  </div>
                </div>

                {/* ✅ SAME COLOR AS PROGRESS */}
                <div className="rc-gpa-box">
                  <div className="rc-gpa" style={{ color: termColor }}>
                    {avgDisplay}%
                  </div>
                  <div className="rc-subtext">Term Average</div>
                </div>
              </div>

              {/* SUBJECT GRID */}
              <div className="rc-subject-grid">
                {t.subjects.map((s, si) => {

                  const g =
                    s.marks >= 90 ? "A+" :
                    s.marks >= 85 ? "A"  :
                    s.marks >= 80 ? "A-" :
                    s.marks >= 75 ? "B+" :
                    s.marks >= 70 ? "B"  :
                    s.marks >= 65 ? "B-" :
                    s.marks >= 60 ? "C+" :
                    s.marks >= 55 ? "C"  :
                    s.marks >= 50 ? "D"  :
                    "F";

                  return (
                    <div key={si} className="rc-subject-card">

                      <div className="rc-subject-name">
                        {s.name}
                      </div>

                      {/* ✅ SUBJECT COLOR BASED ON MARKS */}
                      <div
                        className="rc-marks"
                        style={{ color: getSubjectColor(s.marks) }}
                      >
                        {s.marks}
                      </div>

                      <GradeChip g={g} />
                    </div>
                  );
                })}
              </div>

              {/* PROGRESS BAR */}
              <div className="rc-progress">
                <ProgressBar
                  pct={avg}
                  color={termColor} // ✅ SAME COLOR
                  height={5}
                />
              </div>

            </Card>
          );
        })}
      </div>

      {/* CHART */}
      <Card>
        <CardHeader title="📊 Term-over-Term Subject Progress" />

        <div className="rc-chart-scroll">
          <div className="rc-chart">

            {reportCard[2].subjects.map((s, i) => {
              const prev = reportCard[1].subjects[i]?.marks || 0;
              const prev2 = reportCard[0].subjects[i]?.marks || 0;
              const diff = s.marks - prev;

              return (
                <div key={i} className="rc-bar-group">

                  <div className={`rc-diff ${diff >= 0 ? "rc-up" : "rc-down"}`}>
                    {diff >= 0 ? "+" : ""}{diff}
                  </div>

                  <div className="rc-bars">

                    <div
                      className="rc-bar"
                      style={{ height: `${(prev2 / 100) * 80}px` }}
                      title={`T1: ${prev2}`}
                    />

                    <div
                      className="rc-bar rc-bar-t2"
                      style={{ height: `${(prev / 100) * 80}px` }}
                      title={`T2: ${prev}`}
                    />

                    <div
                      className="rc-bar rc-bar-t3"
                      style={{ height: `${(s.marks / 100) * 80}px` }}
                      title={`T3: ${s.marks}`}
                    />

                  </div>

                  <div className="rc-label">{s.name}</div>

                </div>
              );
            })}

          </div>
        </div>

        {/* LEGEND */}
        <div className="rc-legend">
          <div><span className="dot t1" /> Term 1</div>
          <div><span className="dot t2" /> Term 2</div>
          <div><span className="dot t3" /> Term 3</div>
        </div>

      </Card>

    </div>
  );
};

export default Report;