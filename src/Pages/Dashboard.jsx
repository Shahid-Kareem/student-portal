import React, { useState } from "react";
import {activities} from '../Data/Activities';
import {assignments} from '../Data/Assignments';
import {attendance} from '../Data/Attendance';
import {exams} from '../Data/Exams';
import {fees} from '../Data/Fees';
import {library} from '../Data/Library';
import {notices} from '../Data/Notices';
import {reportCard} from '../Data/Reportcard';
import {schedule} from '../Data/Schedule';
import {student} from '../Data/Student';
import {subjects} from '../Data/Subjects';
import {teachers} from '../Data/Teachers';
import "./Dashboard.css";
import Avatar from "../Components/Avatar";
import Tag from "../Components/Tag";
import Card from "../Components/Card";
import CardHeader from '../Components/CardHeader';
import GradeChip from '../Components/GradeChip';
import ProgressBar from '../Components/ProgressBar';



const Dashboard = ({ setPage }) => {

  const avg = Math.round(
    subjects.reduce((a, s) => a + (s.marks / s.total) * 100, 0) /
      subjects.length
  );

  return (
    <div className="dashboard">

      {/* Profile */}
      <div className="profile-card">
        <div className="profile-left">
          <div className="avatar-wrapper">
            <Avatar initials="AK" size={72} />
            <span className="online-dot"></span>
          </div>

          <div>
            <h2>{student.name}</h2>
            <p className="muted">
              {student.grade} · Roll No. {student.roll} · {student.school}
            </p>

            <div className="tags">
              <Tag color="blue">🏅 Honor Roll</Tag>
              <Tag color="teal">♟ Chess Club</Tag>
              <Tag color="purple">🎨 Art Society</Tag>
            </div>
          </div>
        </div> 

        <div className="profile-right">
          <div><span>Guardian</span>{student.guardian}</div>
          <div><span>Section</span>Grade 10-B</div>
          <div><span>Enrolled</span>Aug 2020</div>
          <div><span>Board</span>Federal</div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        {[
          { label: "Overall Score", val: `${avg}%`, icon: "📊" },
          { label: "Attendance Rate", val: "91%", icon: "✅" },
          { label: "Pending Tasks", val: "3", icon: "📝" },
          { label: "Exams", val: "7", icon: "🏆" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="icon">{s.icon}</div>
            <h3>{s.val}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Subjects */}
      <div className="grid-2">
        <Card>
          <CardHeader title="📚 Subject Performance" />

          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td className="muted">{s.teacher}</td>
                  <td>{s.marks}/{s.total}</td>
                  <td><GradeChip g={s.grade} /></td>
                  <td>
                    <ProgressBar pct={(s.marks / s.total) * 100} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Notices */}
        <Card>
          <CardHeader title="🔔 Notices" />

          <div className="notices">
            {notices.slice(0, 3).map((n, i) => (
              <div key={i} className="notice">
                <h4>{n.title}</h4>
                <p className="muted">{n.date}</p>
                <p>{n.body.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
