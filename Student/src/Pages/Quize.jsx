import React, { useEffect, useState } from "react";
import Topbar from '../Components/Topbar';
import axios from "axios";
import "./Quize.css";

import {
  FaQuestionCircle,
  FaClock,
  FaCheckCircle,
  FaUserGraduate,
} from "react-icons/fa";

import { useAuth } from "../Context/AuthContext";

const Quize = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // GET TOKEN FROM AUTH CONTEXT
  const { token } = useAuth();

  useEffect(() => {

    if (token) {
      fetchQuizzes();
    }

  }, [token]);

  const fetchQuizzes = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/api/subjects/quizzes/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuizzes(response.data);

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="quiz-loading">
        Loading quizzes...
      </div>
    );
  }

  return (
    <>
    <Topbar page="quiz" pageTitles={{ quiz: "Quizzes" }} />

    <div className="quiz-page">

      {/* HEADER */}
      <div className="quiz-header">

        <h2>
          <FaQuestionCircle />
          Quizzes
        </h2>

        <p>
          Track quiz performance and details
        </p>

      </div>

      {/* STATS */}
      <div className="quiz-stats">

        <div className="quiz-stat-card">
          <h3>{quizzes.length}</h3>
          <p>Total Quizzes</p>
        </div>

        <div className="quiz-stat-card success">

          <h3>
            {
              quizzes.filter(
                (q) => q.status === "completed"
              ).length
            }
          </h3>

          <p>Completed</p>

        </div>

      </div>

      {/* QUIZ LIST */}
      <div className="quiz-list">

        {quizzes.map((quiz) => (
          <div className="quiz-card" key={quiz.id}>

            <div className="quiz-top">

              <div className="quiz-icon">
                <FaQuestionCircle />
              </div>

              <div className="quiz-info">

                <h3>{quiz.title}</h3>

                <p className="teacher">
                  <FaUserGraduate />
                  {quiz.teacher_name}
                </p>

              </div>

              <div className={`status ${quiz.status}`}>

                <FaCheckCircle />

                {quiz.status}

              </div>

            </div>

            <div className="quiz-body">

              <div className="quiz-item">
                <span>Total Marks</span>
                <strong>{quiz.total_marks}</strong>
              </div>

              <div className="quiz-item">
                <span>Pass Marks</span>
                <strong>{quiz.pass_marks}</strong>
              </div>

              <div className="quiz-item">
                <span>Questions</span>
                <strong>{quiz.questions_count}</strong>
              </div>

              <div className="quiz-item">

                <span>
                  <FaClock />
                  Time Limit
                </span>

                <strong>
                  {quiz.time_limit} min
                </strong>

              </div>

            </div>

            {quiz.instructions && (
              <div className="instructions">

                <span>Instructions:</span>

                <p>{quiz.instructions}</p>

              </div>
            )}

          </div>
        ))}

      </div>

    </div>
    </>
  );
};

export default Quize;