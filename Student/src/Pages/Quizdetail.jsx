import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Topbar from '../Components/Topbar';
import "./Quizdetail.css";

import { FaUserGraduate, FaClock, FaBook, FaShieldAlt, FaListOl, FaTag, FaArrowLeft, FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";

const Quizdetail = () => {
  const { id }       = useParams();
  const { token }    = useAuth();
  const navigate     = useNavigate();

  const [quiz, setQuiz]       = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) fetchQuizDetail();
  }, [id, token]);

  const fetchQuizDetail = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/subjects/quizzes/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuiz(res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Topbar page="quiz" pageTitles={{ quiz: "Quizzes" }} />
        <div className="qd-loading">
          <span className="qd-spinner" />
          Loading Quiz Details…
        </div>
      </>
    );
  }

  if (!quiz) {
    return (
      <>
        <Topbar page="quiz" pageTitles={{ quiz: "Quizzes" }} />
        <div className="qd-loading">Quiz not found.</div>
      </>
    );
  }

  const done       = quiz.status === "completed";
  const passPct    = quiz.total_marks
    ? Math.round((quiz.pass_marks / quiz.total_marks) * 100)
    : 0;

  const infoCards = [
    { icon: <FaUserGraduate />, label: "Teacher",      value: quiz.teacher_name,          color: "var(--qd-purple)" },
    { icon: <FaBook />,         label: "Total Marks",  value: quiz.total_marks,            color: "#2563eb" },
    { icon: <FaShieldAlt />,    label: "Pass Marks",   value: `${quiz.pass_marks} (${passPct}%)`, color: "var(--qd-success)" },
    { icon: <FaClock />,        label: "Time Limit",   value: `${quiz.time_limit} min`,    color: "#d97706" },
    { icon: <FaListOl />,       label: "Questions",    value: quiz.questions_count,        color: "#0891b2" },
    { icon: <FaTag />,          label: "Quiz Type",    value: quiz.quiz_type,              color: "#7c3aed" },
  ];

  return (
    <>
      <Topbar page="quiz" pageTitles={{ quiz: "Quizzes" }} />

      <div className="qd-page">

        {/* ── Back ── */}
        <button className="qd-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Quizzes
        </button>

        {/* ── Hero Header ── */}
        <div className="qd-hero">
          <div className="qd-hero-left">
            <div className="qd-hero-icon">
              <FaClipboardQuestion />
            </div>
            <div className="qd-hero-text">
              <div className="qd-hero-meta">
                <span className={`qd-status-badge ${done ? "badge-done" : "badge-active"}`}>
                  {done ? <><FaCheckCircle /> Completed</> : <><FaPlayCircle /> Active</>}
                </span>
                <span className="qd-subject-chip">{quiz.subject_name ?? "General"}</span>
              </div>
              <h1 className="qd-title">{quiz.title}</h1>
              {quiz.description && (
                <p className="qd-description">{quiz.description}</p>
              )}
            </div>
          </div>

          {/* Start button in hero */}
          <div className="qd-hero-action">
            <button
              className={`qd-start-btn ${done ? "btn-done" : "btn-active"}`}
              disabled={done}
            >
              {done
                ? <><FaCheckCircle /> Already Completed</>
                : <><FaPlayCircle /> Join Quiz</>}
            </button>
            <p className="qd-start-hint">
              {done ? "You have already taken this quiz." : `${quiz.time_limit} min · ${quiz.questions_count} questions`}
            </p>
          </div>
        </div>

        {/* ── Info Cards Grid ── */}
        <div className="qd-info-grid">
          {infoCards.map(({ icon, label, value, color }, i) => (
            <div className="qd-info-card" key={i}>
              <div className="qd-info-icon" style={{ color, background: `${color}18` }}>
                {icon}
              </div>
              <div className="qd-info-text">
                <span className="qd-info-label">{label}</span>
                <strong className="qd-info-value capitalize">{value}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* ── Instructions ── */}
        {quiz.instructions && (
          <div className="qd-instructions">
            <div className="qd-section-title">📋 Instructions</div>
            <p className="qd-instructions-text">{quiz.instructions}</p>
          </div>
        )}

        {/* ── Bottom Action Bar ── */}
        <div className="qd-action-bar">
          <div className="qd-action-info">
            <span>⏱ {quiz.time_limit} minutes</span>
            <span className="qd-dot">·</span>
            <span>❓ {quiz.questions_count} questions</span>
            <span className="qd-dot">·</span>
            <span>🏆 {quiz.total_marks} marks</span>
          </div>
          {/* <button
            className={`qd-start-btn ${done ? "btn-done" : "btn-active"}`}
            disabled={done}
          >
            {done
              ? <><FaCheckCircle /> Completed</>
              : <><FaPlayCircle /> Start Quiz Now</>}
          </button> */}
        </div>

      </div>
    </>
  );
};

export default Quizdetail;
