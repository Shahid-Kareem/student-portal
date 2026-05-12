import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Topbar from '../Components/Topbar';

import "./QuizDetail.css";

import {
  FaUserGraduate,
  FaClock,
  FaClipboardQuestion,
  FaBook,
} from "react-icons/fa6";

const Quizdetail = () => {
  const { id } = useParams();

  const { token } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      fetchQuizDetail();
    }
  }, [id, token]);

  const fetchQuizDetail = async () => {
    try {
      console.log("Quiz ID:", id);
      console.log("Token:", token);

      const response = await axios.get(
        `${API_BASE_URL}/api/subjects/quizzes/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Quiz Response:", response.data);

      setQuiz(response.data);

    } catch (error) {
      console.log("ERROR:", error);

      console.log("Status:", error.response?.status);

      console.log("Error Data:", error.response?.data);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="quiz-loading">Loading Quiz...</div>;
  }

  if (!quiz) {
    return <div className="quiz-loading">Quiz not found</div>;
  }

  return (
    <>
    <Topbar page="quiz" pageTitles={{ quiz: "Quizzes" }} />
    
    <div className="quiz-detail">

      <div className="quiz-detail-header">
        <h2>
          <FaClipboardQuestion />
          {quiz.title}
        </h2>

        <p>{quiz.description}</p>
      </div>

      <div className="quiz-info-grid">

        <div className="info-card">
          <FaUserGraduate />
          <div>
            <h4>Teacher</h4>
            <p>{quiz.teacher_name}</p>
          </div>
        </div>

        <div className="info-card">
          <FaBook />
          <div>
            <h4>Total Marks</h4>
            <p>{quiz.total_marks}</p>
          </div>
        </div>

        <div className="info-card">
          <FaBook />
          <div>
            <h4>Pass Marks</h4>
            <p>{quiz.pass_marks}</p>
          </div>
        </div>

        <div className="info-card">
          <FaClock />
          <div>
            <h4>Time Limit</h4>
            <p>{quiz.time_limit} min</p>
          </div>
        </div>

      </div>

      <div className="quiz-extra">

        <div>
          <strong>Quiz Type:</strong> {quiz.quiz_type}
        </div>

        <div>
          <strong>Status:</strong> {quiz.status}
        </div>

        <div>
          <strong>Questions:</strong> {quiz.questions_count}
        </div>

        <div>
          <strong>Teacher ID:</strong> {quiz.teacher}
        </div>

      </div>

      {quiz.instructions && (
        <div className="quiz-instructions">
          <h4>Instructions</h4>
          <p>{quiz.instructions}</p>
        </div>
      )}

      <div className="quiz-action">
        <button className="start-btn">
          Start Quiz
        </button>
      </div>

    </div>
    </>
  );
};

export default Quizdetail;