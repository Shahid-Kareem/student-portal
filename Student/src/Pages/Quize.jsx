import React, { useEffect, useState } from "react";
import Topbar from '../Components/Topbar';
import axios from "axios";
import "./Quize.css";
import { FaQuestionCircle, FaClock, FaUserGraduate, FaCheckCircle, FaPlayCircle, FaLock, FaEye } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Quize = () => {
  const [quizzes, setQuizzes]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");
  const navigate= useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { token } = useAuth();

  useEffect(() => {
    if (token) fetchQuizzes();
  }, [token]);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/subjects/quizzes/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const counts = {
    all:       quizzes.length,
    active:    quizzes.filter(q => q.status !== "completed").length,
    completed: quizzes.filter(q => q.status === "completed").length,
  };

  const filtered = quizzes.filter(q => {
    if (filter === "active")    return q.status !== "completed";
    if (filter === "completed") return q.status === "completed";
    return true;
  });

  const filters = [
    { key: "all",       label: "All" },
    { key: "active",    label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <>
      <Topbar page="quiz" pageTitles={{ quiz: "Quizzes" }} />

      <div className="quiz-page">



        {/* ── Filters ── */}
        <div className="quiz-filter-row">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              className={`quiz-filter-btn ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
              <span className="quiz-filter-count">{counts[key]}</span>
            </button>
          ))}
        </div>

        {/* ── List ── */}
        {loading ? (
          <div className="quiz-loading">
            <span className="quiz-spinner" />
            Loading quizzes…
          </div>
        ) : filtered.length === 0 ? (
          <div className="quiz-empty">
            <FaQuestionCircle />
            <p>No {filter === "all" ? "" : filter} quizzes found.</p>
          </div>
        ) : (
          <div className="quiz-list">
            {filtered.map((quiz) => {
              const done = quiz.status === "completed";
              return (
                <div key={quiz.id} className={`quiz-card ${done ? "card-done" : "card-active"}`}>

                  {/* accent bar */}
                  <div className={`quiz-accent ${done ? "accent-done" : "accent-active"}`} />

                  <div className="quiz-card-inner">

                    {/* LEFT — icon + title + teacher */}
                    <div className="quiz-left">
                      <div className={`quiz-icon ${done ? "icon-done" : "icon-active"}`}>
                        <FaQuestionCircle />
                      </div>
                      <div className="quiz-title-block">
                        <h3 className="quiz-title">{quiz.title}</h3>
                        <span className="quiz-teacher">
                          <FaUserGraduate /> {quiz.teacher_name}
                        </span>
                      </div>
                    </div>

                    {/* MIDDLE — meta chips */}
                    <div className="quiz-meta">
                      <span className="qchip qchip-marks">🏆 {quiz.total_marks} marks</span>
                      <span className="qchip qchip-pass">✅ Pass: {quiz.pass_marks}</span>
                      <span className="qchip qchip-questions">❓ {quiz.questions_count} Qs</span>
                      <span className="qchip qchip-time"><FaClock /> {quiz.time_limit} min</span>
                    </div>

                    {/* RIGHT — status + join button */}
                    <div className="quiz-right">
                      <span className={`quiz-status ${done ? "status-done" : "status-active"}`}>
                        {done ? <><FaCheckCircle /> Completed</> : <><FaPlayCircle /> Active</>}
                      </span>
                      <button
                        className={`join-btn ${done ? "join-btn-done" : "join-btn-active"}`}
                        disabled={done}
                        title={done ? "Already completed" : "Join this quiz"}
                        onClick={() => navigate(`/quizzes/${quiz.id}`)}
                      >
                        {done ? <><FaLock /> Done</> : <><FaEye /> View Details</>}
                      </button>
                    </div>

                  </div>

                  {/* Instructions (if any) */}
                  {quiz.instructions && (
                    <div className="quiz-instructions">
                      <span>📋 Instructions:</span> {quiz.instructions}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </>
  );
};

export default Quize;
