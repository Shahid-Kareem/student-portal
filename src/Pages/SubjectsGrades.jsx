import React from "react";
import { subjects } from "../Data/Subjects";
import { reportCard } from "../Data/ReportCard";
import Topbar from '../Components/Topbar';
import Card from "../Components/Card";
import CardHeader from "../Components/CardHeader";
import ProgressBar from "../Components/ProgressBar";
import GradeChip from "../Components/GradeChip";
import "./SubjectsGrades.css";

const PageGrades = () => {

  // ✅ Average
  const avg = (
    subjects.reduce((a, s) => a + s.marks, 0) / subjects.length
  ).toFixed(1);

  // ✅ Highest score
  const highest = subjects.reduce((max, s) =>
    s.marks > max.marks ? s : max
  , subjects[0]);

  // ✅ Grade distribution function
  const getCount = (min, max) =>
    subjects.filter(s => s.marks >= min && s.marks <= max).length;

    return (
  <>
    <Topbar 
      page="subjects"
      pageTitles={{ subjects: "Subjects & Grades" }}
    />

    <div className="grades-container">

      {/* TOP STATS */}
      <div className="stats-grid">
        {[
          {
            label: "Term Average",
            val: `${avg}%`,
            color: "var(--accent)"
          },
          {
            label: "Highest Score",
            val: `${highest.marks}% (${highest.name})`,
            color: "var(--accent3)"
          },
          {
            label: "Class Rank",
            val: "—",
            color: "var(--accent2)"
          },
          {
            label: "Subjects",
            val: `${subjects.length} Total`,
            color: "var(--accent4)"
          },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>
              {s.val}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grades-grid">

        {/* SUBJECTS */}
        <Card>
          <CardHeader title="📚 Subject-wise Grades" />

          {subjects.map((s, i) => {
            const pct = (s.marks / s.total) * 100;

            return (
              <div key={i} className="subject-row">

                <div className="subject-top">

                  <div className="subject-info">
                    <div className="subject-name">{s.name}</div>
                    <div className="subject-teacher">{s.teacher}</div>
                  </div>

                  <div className="subject-marks">
                    {s.marks}/{s.total}
                  </div>

                  <GradeChip marks={s.marks} total={s.total} />

                  <div
                    className="subject-percentage"
                    style={{ color: s.color }}
                  >
                    {pct}%
                  </div>
                </div>

                <ProgressBar pct={pct} color={s.color} height={5} />
              </div>
            );
          })}
        </Card>

        {/* RIGHT SIDE */}
        <div className="right-side">

          {/* DISTRIBUTION */}
          <Card>
            <CardHeader title="📈 Grade Distribution" />

            {[
              ["A+ (90–100)", "var(--accent3)", getCount(90, 100)],
              ["A (80–89)", "var(--accent)", getCount(80, 89)],
              ["B+ (75–79)", "var(--accent2)", getCount(75, 79)],
              ["B (70–74)", "var(--accent4)", getCount(70, 74)],
              ["C+ (65-69)", "var(--lightblue)", getCount(65,69)],
              ["C (60-64)", "var(--muted)", getCount(60,64)],
              ["D (50-59)", "var(--darkorange)", getCount(50,59)],
              ["F (Below 50)", "var(--accent5)", getCount(1,49)]

            ].map(([label, color, count]) => (
              <div key={label} className="dist-row">

                <div className="dist-top">
                  <span>{label}</span>
                  <span style={{ color }}>
                    {count} subject{count !== 1 ? "s" : ""}
                  </span>
                </div>

                <ProgressBar
                  pct={(count / subjects.length) * 100}
                  color={color}
                />
              </div>
            ))}
          </Card>

          {/* TERM COMPARISON */}
          <Card>
            <CardHeader title="🏆 Term Comparison" />

            {reportCard.map((t, i) => (
              <div key={i} className="term-row">

                <div className="term-top">
                  <span className="muted">{t.term}</span>
                  <span className="term-score">{t.gpa}%</span>
                </div>

                <ProgressBar
                  pct={t.gpa}
                  color={i === reportCard.length - 1 ? "var(--accent3)" : "var(--accent)"}
                  height={5}
                />
              </div>
            ))}
          </Card>

        </div>
      </div>
    </div>
  </>
);
};


export default PageGrades;