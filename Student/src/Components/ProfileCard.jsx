import React from "react";
import Avatar from "./Avatar";
import Tag from "./Tag";
import "./ProfileCard.css";

const ProfileCard = ({ student }) => {
  return (
    <div className="profile-card">
      
      <div className="profile-left">

        <div className="avatar-wrapper">
          <Avatar initials={student.name.split(" ").map(n => n[0]).join("")}
          size={72}
          />
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
        <div><span>Section</span>{student.section}</div>
        <div><span>Enrolled</span>{student.enrolled}</div>
        <div><span>Board</span>{student.board}</div>
      </div>

    </div>
  );
};

export default ProfileCard;