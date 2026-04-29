import React from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import GradeChip from "./GradeChip";
import ProgressBar from "./ProgressBar";

const SubjectPerformanceCard = ({ subjects, setPage }) => {
  return (
    <Card>
      <CardHeader
        title="📚 Subject Performance"
        action="Full Report →"
        onAction={() => setPage("grades")}
      />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Subject", "Teacher", "Marks", "Grade", "Progress"].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {subjects.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.teacher}</td>
              <td>{s.marks}/{s.total}</td>
              <td><GradeChip g={s.grade} /></td>
              <td>
                <ProgressBar
                  pct={(s.marks / s.total) * 100}
                  color={s.color}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default SubjectPerformanceCard;