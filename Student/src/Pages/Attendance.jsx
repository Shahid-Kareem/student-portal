import React from "react";
import "./Attendance.css";
import { attendance } from "../Data/Attendance";
import Topbar from '../Components/Topbar';
import Card from "../Components/Card";
import CardHeader from "../Components/CardHeader";
import ProgressBar from "../Components/ProgressBar";

const Attendance = () => {

  const attended = attendance.present + attendance.late;
  const pct = Math.round((attended / attendance.total) * 100);

  return (
    <>
    <Topbar 
        page="attendance" 
        pageTitles={{ attendance: "Attendance Record" }} 
      />
    
    <div className="att-wrap">

      {/* Top Stats */}
      <div className="att-grid">
        {[
          ["Total Days", attendance.total, "var(--text)", "📅"],
          [`Present (${pct}%)`, attendance.present, "var(--success)", "✅"],
          ["Absent", attendance.absent, "var(--danger)", "❌"],
          ["Late", attendance.late, "var(--warn)", "⏰"]
        ].map(([label, value, color, icon]) => (
          <div key={label} className="att-card">
            <div className="att-icon">{icon}</div>
            <div>
              <div className="att-value" style={{ color }}>{value}</div>
              <div className="att-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly + Subject */}
      <div className="att-two-col">

        {/* Monthly */}
        <Card>
          <CardHeader title="📅 Monthly Attendance " />
          <div className="att-monthly">
            {attendance?.monthly?.map((m, i) => {

              const raw = m.p ?? Math.round((m.present / m.total) * 100);
              const p = Math.min(Math.max(raw, 0), 100);

              const color =
                p >= 80 ? "var(--success)" :
                p >= 60 ? "var(--warn)" :
                "var(--danger)";

              return (
                <div key={i}>
                  <div className="att-row">
                    <span>{m.month}</span>
                    <span className="att-percent" style={{ color }}>{p}%</span>
                  </div>
                  <ProgressBar pct={p} color={color} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Subject-wise */}
        <Card>
          <CardHeader title="📚 Subject-wise Attendance" />
          {attendance?.bySubject?.map((s, i) => {

            const total = s.present + s.absent + s.late;
            const attended = s.present + s.late;

            let p = Math.round((attended / total) * 100);
            p = Math.min(Math.max(p, 0), 100);

            const color =
              p >= 95 ? "var(--success)" :
              p >= 88 ? "var(--accent)" :
              "var(--warn)";

            return (
              <div key={i} className="att-subject-row">
                <div className="att-row">
                  <span className="att-subject-name">{s.name}</span>
                  <div className="att-stats">
                    <span className="att-p">{s.present}P</span>
                    <span className="att-a">{s.absent}A</span>
                    <span className="att-l">{s.late}L</span>
                    <span className="att-percent">{p}%</span>
                  </div>
                </div>
                <ProgressBar pct={p} color={color} />
              </div>
            );
          })}
        </Card>
      </div>

      {/* Logs */}
      <Card>
        <CardHeader title="📋 Absence Log" />
        <table className="att-table">
          <thead>
            <tr>
              {["Date","Day","Subject","Type","Status"].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>

          <tbody>
            {attendance?.logs?.length > 0 ? (
              attendance.logs.map((log, i) => (
                <tr key={i}>
                  <td>{log.date}</td>
                  <td>{log.day}</td>
                  <td>{log.subject}</td>
                  <td>{log.type}</td>
                  <td>
                    <span
                      className={`att-status ${
                        log.status.includes("Late")
                          ? "att-late"
                          : log.status === "Absent"
                          ? "att-absent"
                          : "att-other"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="att-no-data">
                  No attendance records available
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </Card>

    </div>
    </>
  );
};

export default Attendance;