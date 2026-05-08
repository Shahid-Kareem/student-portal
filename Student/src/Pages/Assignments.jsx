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
      if (!token) { setLoading(false); return; }
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
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

  const filtered = assignments.filter((a) => {
    if (filter === "active") return !a.is_overdue;
    if (filter === "overdue") return a.is_overdue;
    return true;
  });

  const counts = {
    all: assignments.length,
    active: assignments.filter((a) => !a.is_overdue).length,
    overdue: assignments.filter((a) => a.is_overdue).length,
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "overdue", label: "Overdue" },
  ];

  return (
    <>
      <Topbar page="assignments" pageTitles={{ assignments: "Assignments" }} />

      <div className="assign-container">
        {loading ? (
          <div className="assign-loading">
            <span className="spinner" />
            Loading assignments…
          </div>
        ) : (
          <>

            {/* Filters */}
            <div className="filter-row">
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  className={`filter-btn ${filter === key ? "active" : ""} filter-${key}`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                  <span className="filter-count">{counts[key]}</span>
                </button>
              ))}
            </div>

            {/* List */}
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <p>No {filter === "all" ? "" : filter} assignments found.</p>
              </div>
            ) : (
              <div className="assignment-list">
                {filtered.map((a) => (
                  <div
                    key={a.id}
                    className={`assignment-card ${a.is_overdue ? "card-overdue" : "card-active"}`}
                  >
                    <div className="card-inner">
                      <div className="card-title-row">
                        <h3 className="card-title">{a.title}</h3>
                        <span className={`status-badge ${a.is_overdue ? "danger" : "success"}`}>
                          {a.is_overdue ? "Overdue" : "Active"}
                        </span>
                      </div>

                      <div className="meta-chips">
                        <span className="chip chip-subject">{a.subject_name}</span>
                        <span className={`chip ${a.is_overdue ? "chip-danger" : "chip-due"}`}>
                          Due {new Date(a.due_date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </span>
                        <span className="chip chip-marks">{a.max_marks} Marks</span>
                        {!a.is_overdue && a.days_remaining != null && (
                          <span className="chip chip-days">{a.days_remaining}d left</span>
                        )}
                      </div>

                      <div className="card-footer-row">
                        <span className="footer-meta capitalize">{a.status}</span>
                        <span className="footer-sep">·</span>
                        <span className="footer-meta">
                          {new Date(a.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        {a.attachment && (
                          <a className="attachment-btn" href={a.attachment} target="_blank" rel="noreferrer">Attachment</a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Assignments;
