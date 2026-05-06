import React, { useState } from "react";
import "./Teachers.css";
import Topbar  from '../Components/Topbar';
import { teachers } from "../Data/Teachers";

const colors = [
  "var(--accent)",
  "var(--accent3)",
  "var(--accent2)",
  "var(--accent4)",
  "var(--accent5)",
];

function Teachers() {
  const [msgTarget, setMsgTarget] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [sent, setSent] = useState(false);

  const sendMsg = () => {
    if (!msgText.trim()) return;
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setMsgTarget(null);
      setMsgText("");
    }, 2000);
  };

  return (
    <>
     <Topbar 
      page="teachers"
      pageTitles={{ teachers: "My Teachers" }}
    />
    <div className="teachers">
      
      {/* Modal */}
      {msgTarget && (
        <div
          className="modal-overlay"
          onClick={() => {
            setMsgTarget(null);
            setMsgText("");
          }}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>✉ Message {msgTarget.name}</h3>
            <p className="modal-sub">
              {msgTarget.subject} · {msgTarget.email}
            </p>

            <textarea
              placeholder="Type your message..."
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setMsgTarget(null)}
              >
                Cancel
              </button>

              <button
                className="btn-send"
                onClick={sendMsg}
              >
                {sent ? "✓ Sent!" : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="teachers-grid">
        {teachers.map((t, i) => (
          <div key={t.id} className="teacher-card">
            
            <div className="teacher-header">
              <div
                className="avatar"
                style={{ color: colors[i % colors.length] }}
              >
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>

              <div>
                <h4>{t.name}</h4>
                <span className="subject">{t.subject}</span>
              </div>
            </div>

            <div className="info">
              <p>📍 {t.room}</p>
              <p>🗂 {t.cabin}</p>
              <p>⏰ {t.available}</p>
              <p>✉️ {t.email}</p>
            </div>

            <button
              className="message-btn"
              onClick={() => setMsgTarget(t)}
            >
              ✉ Send Message
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Teachers;