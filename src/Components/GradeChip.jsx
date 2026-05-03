import React from "react";

const GradeChip = ({ marks, total }) => {

  // ✅ 1. Convert to percentage
  const percentage = total
    ? (Number(marks) / Number(total)) * 100
    : 0;

  // ✅ 2. Grade logic (based on percentage)
  const getGrade = () => {
    if (percentage >= 90) return "A+";
    else if (percentage >= 80) return "A";
    else if (percentage >= 75) return "B+";
    else if (percentage >= 70) return "B";
    else if (percentage >= 65) return "C+";
    else if (percentage >= 60) return "C";
    else if (percentage >= 50) return "D";
    else return "F";
  };

  // ✅ 3. Color mapping
  const getColor = (grade) => {
    switch (grade) {
      case "A+": return "var(--accent3)";
      case "A": return "var(--accent)";
      case "B+": return "var(--accent2)";
      case "B": return "var(--accent4)";
      case "C+": return "var(--lightblue)";
      case "C": return "var(--muted)";
      case "D": return "var(--darkorange)";
      default: return "var(--accent5)";
    }
  };

  const grade = getGrade();
  const color = getColor(grade);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 99,
        fontSize: "0.75rem",
        fontWeight: 700,
        fontFamily: "Plus Jakarta Sans, sans-serif",
        background: `${color}22`,
        color: color,
      }}
    >
      {grade}
    </span>
  );
};

export default GradeChip;