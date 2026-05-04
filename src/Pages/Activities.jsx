import React from "react";
import Topbar from '../Components/Topbar';
import { activities } from "../Data/Activities";
import "./Activities.css";
import Card from "../Components/Card";
import CardHeader from "../Components/CardHeader";

const Activities = () => {
  return (
    <>
    <Topbar 
        page="activities" 
        pageTitles={{ activities: "Activities & Awards" }} 
      />
    <div className="activities-page">

      {/* TOP CARDS */}
      <div className="activities-top-grid">
        {activities.slice(0, 3).map((a, i) => (
          <div key={i} className="activities-main-card">

            <div className="activities-bg-icon">{a.icon}</div>
            <div className="activities-icon">{a.icon}</div>

            <div className="activities-title">{a.name}</div>

            <div className="activities-meta">
              Role: {a.role} · Since {a.since}
            </div>

            <div className="activities-badge">
              🏅 {a.achievement}
            </div>

          </div>
        ))}
      </div>

      {/* MIDDLE CARDS */}
      <div className="activities-mid-grid">
        {activities.slice(3).map((a, i) => (
          <div key={i} className="activities-small-card">

            <div
              className="activities-avatar"
              style={{ background: `${a.color}20`, color: a.color }}
            >
              {a.icon}
            </div>

            <div className="activities-info">
              <div className="activities-name">{a.name}</div>

              <div className="activities-role">
                {a.role} · Since {a.since}
              </div>

              <div className="activities-achievement" style={{ color: a.color }}>
                🏅 {a.achievement}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ACHIEVEMENTS (NOW FULLY DYNAMIC) */}
      <Card>
        <CardHeader title="🏆 All Achievements & Awards" />

        <div className="activities-award-grid">

          {activities.map((a, i) => {
            // extract year from achievement string (last word if numeric year exists)
            const yearMatch = a.achievement.match(/\d{4}/);
            const year = yearMatch ? yearMatch[0] : a.since;

            return (
              <div
                key={i}
                className="activities-award-card"
                style={{ borderLeftColor: a.color }}
              >
                <div className="activities-award-year">{year}</div>
                <div className="activities-award-text">
                  {a.achievement}
                </div>
              </div>
            );
          })}

        </div>
      </Card>

    </div>
    </>
  );
};

export default Activities;