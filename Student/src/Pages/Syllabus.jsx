import React, { useEffect, useState } from "react";
import {useAuth} from '../Context/AuthContext';
import axios from "axios";
import "./Syllabus.css";

import { FaBookOpen } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import Topbar from "../Components/Topbar";

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
        const response = await axios.get(
        `${API_BASE_URL}/api/subjects/syllabus/`,
         {
           headers: {
               Authorization: `Bearer ${token}`,
            },
        }
        );


      setSyllabus(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return  <p className="syllabus-loading">Loading Syllabus...</p>; 
  // }

  return (
  <>
    {/* Always visible */}
    <Topbar page="syllabus" pageTitles={{ syllabus: "Syllabus" }} />

    <div className="syllabus-page">

      {loading ? (
        <p className="syllabus-loading">Loading Syllabus...</p>
      ) : (
        <>
          <div className="syllabus-header">
            <h1>
              <FaBookOpen /> Syllabus
            </h1>
            <p>View Semester Syllabus and Course Progress</p>
          </div>

          <div className="syllabus-grid">
            {syllabus.map((item) => (
              <div className="syllabus-card" key={item.id}>
                <div className="syllabus-top">
                  <h2>{item.title}</h2>

                  <span
                    className={`status-badge ${
                      item.status === "draft"
                        ? "draft"
                        : item.status === "published"
                        ? "published"
                        : "completed"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3>{item.subject_name}</h3>

                <p className="syllabus-description">
                  {item.description || "No description available."}
                </p>

                <div className="syllabus-info">
                  <div className="info-box">
                    <FaCalendarDays />
                    <span>{item.total_weeks} Weeks</span>
                  </div>

                  <div className="info-box">
                    <FaClipboardList />
                    <span>{item.units_count} Units</span>
                  </div>

                  <div className="info-box">
                    <FaCircleCheck />
                    <span>{item.completed_units} Completed</span>
                  </div>

                  <div className="info-box">
                    <FaUserGraduate />
                    <span>{item.created_by_name}</span>
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width:
                          item.units_count > 0
                            ? `${
                                (item.completed_units / item.units_count) * 100
                              }%`
                            : "0%",
                      }}
                    ></div>
                  </div>

                  <p className="progress-text">
                    {item.completed_units} / {item.units_count} Units Completed
                  </p>
                </div>

                <div className="syllabus-footer">
                  <small>
                    Created:{" "}
                    {new Date(item.created_at).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </>
);

};

export default Syllabus;