import React, { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "../Components/Topbar";
import "./Assignments.css";
import { useAuth } from "../Context/AuthContext";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const API_URL = `${API_BASE_URL}/api/subjects/assignments/`;

  const { token } = useAuth();

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAssignments(response.data.results);

      } catch (error) {
        console.log("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [token]);

  // FILTER
  const filtered = assignments.filter((a) => {
    if (filter === "all") return true;
    if (filter === "active") return !a.is_overdue;
    if (filter === "overdue") return a.is_overdue;
    return true;
  });

  return (
    <>
      <Topbar
        page="assignments"
        pageTitles={{ assignments: "Assignments" }}
      />

      <div className="assign-container">
        {loading ? (
          <h3>Loading assignments...</h3>
        ) : (
          <>
            {/* FILTER */}
            <div className="filter-row">
              {["all", "active", "overdue"].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${
                    filter === f ? "active" : ""
                  }`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* LIST */}
            <div className="assignment-list">
              {filtered.map((a) => (
                <div key={a.id} className="assignment-card">

                  {/* MAIN INFO */}
                  <div className="assignment-info">

                    <div className="title">
                      {a.title}
                    </div>

                    <div className="desc">
                      📝 {a.description || "No description"}
                    </div>

                    <div className="meta">
                      <span>📚 {a.subject_name}</span>

                      <span>
                        📅 {new Date(a.due_date).toLocaleString()}
                      </span>

                      <span>
                        🎯 Marks: {a.max_marks}
                      </span>
                    </div>

                    {/* EXTRA DETAILS */}
                    <div className="extra">

                      <p>
                        📌 Instructions: {a.instructions || "None"}
                      </p>

                      <p>
                        📊 Status: {a.status}
                      </p>

                      <p>
                        ⏳ Days Remaining: {a.days_remaining}
                      </p>

                      <p>
                        📅 Created:{" "}
                        {new Date(a.created_at).toLocaleString()}
                      </p>

                    </div>

                    {/* ATTACHMENT */}
                    {a.attachment && (
                      <div className="attachment">
                        📎{" "}
                        <a
                          href={a.attachment}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Attachment
                        </a>
                      </div>
                    )}

                  </div>

                  {/* STATUS */}
                  <div
                    className={`status ${
                      a.is_overdue ? "danger" : "success"
                    }`}
                  >
                    {a.is_overdue ? "🔴 Overdue" : "🟢 Active"}
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

export default Assignments;