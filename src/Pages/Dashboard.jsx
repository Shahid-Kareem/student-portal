import React from "react";
import { notices } from '../Data/Notices';
import { student } from '../Data/Student';
import { subjects } from '../Data/Subjects';
import {attendance} from '../Data/Attendance';
import "./Dashboard.css";

import Avatar from "../Components/Avatar";
import Tag from "../Components/Tag";
import Card from "../Components/Card";
import CardHeader from '../Components/CardHeader';
import GradeChip from '../Components/GradeChip';
import ProfileCard from "../Components/ProfileCard";
import ProgressBar from '../Components/ProgressBar';
import Topbar from '../Components/Topbar';
import AttendanceCard from "../Components/AttendanceCard";
import RecentNotices from '../Components/RecentNotices';

const Dashboard = ({ setPage }) => {

  // Safe average calculation
  const avg = subjects.length
    ? Math.round(
        subjects.reduce((a, s) => a + (s.marks / s.total) * 100, 0) /
        subjects.length
      )
    : 0;

  return (
    <div className="dashboard">

      {/* ✅ FIXED TOPBAR */}
      <Topbar 
        page="dashboard" 
        pageTitles={{ dashboard: "Dashboard" }} 
      />

      {/* Profile */}
      <ProfileCard student={student} />


      {/* Stats */}
      <div className="stats">
        {[
          {label:"Overall Score",val:`${avg}%`,icon:"📊",color:"var(--accent)",bg:"rgba(79,124,247,0.12)",delta:"▲ 3.2% from last term",up:true},
          {label:"Attendance Rate",val:"91%",icon:"✅",color:"var(--accent3)",bg:"rgba(16,185,129,0.12)",delta:"▼ 1% from last month",up:false},
          {label:"Pending Tasks",val:"3",icon:"📝",color:"var(--accent2)",bg:"rgba(147,51,234,0.12)",delta:"2 due this week",up:true},
          {label:"Exams This Month",val:"7",icon:"🏆",color:"var(--accent4)",bg:"rgba(245,158,11,0.12)",delta:"Next: Biology — Apr 24",up:true},
   
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="icon">{s.icon}</div>
            <h3 style={{color: s.color}}>{s.val}</h3>
            <div className="label">
              {s.label}
            </div>
            <div className="deltaa" style={{color:s.up?"var(--success)":"var(--danger)"}}>
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Subjects + Notices */}
      <div className="grid-2">

        {/* Subjects */}
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
                      <ProgressBar
                        pct={(s.marks / s.total) * 100}
                        color={
                          (s.marks / s.total) * 100 >= 80
                          ? "var(--success)"
                          : (s.marks / s.total) * 100 >= 50
                          ? "var(--warn)"
                          : "var(--danger)"
                        }
                      />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
         <AttendanceCard setPage={setPage} attendance={attendance} />
      </div>
      <RecentNotices notices={notices} />

    </div>
  );
};

export default Dashboard;