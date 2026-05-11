import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Fees.css";
import Topbar from "../Components/Topbar.jsx";
import { useAuth } from "../Context/AuthContext";

function Fees() {
  const [fees, setFees] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedMonth, setExpandedMonth] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${API_BASE_URL}/api/accounts/my-fees/`;

  const { token } = useAuth();

  // MONTH NAMES
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // GET MONTH NAME
  const getMonthName = (month) => {
    return monthNames[month - 1] || "Unknown";
  };

  // FETCH API
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFees(res.data.invoices || []);
        setStudent(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFees();
    }
  }, [token]);

  // GROUP FEES BY MONTH-YEAR
  const groupedFees = fees.reduce((acc, fee) => {
    const key = `${fee.month}-${fee.year}`;

    if (!acc[key]) {
      acc[key] = {
        month: fee.month,
        year: fee.year,
        fees: [],
        totalAmount: 0,
        totalPaid: 0,
        totalDue: 0,
        allPaid: true,
      };
    }

    acc[key].fees.push(fee);

    acc[key].totalAmount += Number(fee.fee_amount);
    acc[key].totalPaid += Number(fee.amount_paid);
    acc[key].totalDue += Number(fee.amount_due);

    if (fee.status !== "paid") {
      acc[key].allPaid = false;
    }

    return acc;
  }, {});

  // SORT MONTHS
  const sortedMonths = Object.values(groupedFees).sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }

    return b.month - a.month;
  });

  // TOGGLE MONTH
  const toggleMonth = (key) => {
    setExpandedMonth(expandedMonth === key ? null : key);
  };

  // CALCULATIONS
  const paid = fees
    .filter((f) => f.status === "paid")
    .reduce((a, f) => a + Number(f.amount_paid), 0);

  const unpaid = fees
    .filter((f) => f.status === "unpaid")
    .reduce((a, f) => a + Number(f.amount_due), 0);

  const nextDue = fees.find((f) => f.status === "unpaid");

  const totalAmount = fees.reduce((a, f) => a + Number(f.fee_amount), 0);
  const paidPct = totalAmount > 0 ? Math.round((paid / totalAmount) * 100) : 0;

  return (
    <>
      <Topbar
        page="fee"
        pageTitles={{ fee: "Fee & Payments" }}
      />

      <div className="fee">

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading Fee & Payments...</p>
          </div>
        ) : (
          <>

            {/* ── SUMMARY ── */}
            <div className="fee-summary">

              {/* STUDENT INFO */}
              <div className="fee-card student">
                <div className="card-icon">👨‍🎓</div>
                <div className="card-content">
                  <h3>Student Info</h3>
                  <p><strong>Name:</strong> {student?.student_name || "—"}</p>
                  <p><strong>Class:</strong> {student?.student_class || "—"}</p>
                  <p><strong>Section:</strong> {student?.student_section || "—"}</p>
                  <p><strong>ID:</strong> {student?.student || "—"}</p>
                </div>
              </div>

              {/* TOTAL DUE */}
              <div className="fee-card total-due">
                <div className="card-icon">💳</div>
                <div className="card-content">
                  <h3>Due Ammount</h3>
                  <p className="big-amount">
                    PKR {Number(student?.total_amount_due || 0).toLocaleString()}
                  </p>
                  {nextDue && (
                    <p className="next-due">📅 Next due: {getMonthName(nextDue.month)} {nextDue.year}</p>
                  )}
                </div>
              </div>

              {/* SUMMARY */}
              <div className="fee-card summary">
                <div className="card-icon">📊</div>
                <div className="card-content">
                  <h3>Payment Summary</h3>
                  <div className="summary-stats">
                    <div className="stat">
                      <span className="stat-value">{fees.length}</span>
                      <span className="stat-label">Total</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value paid">{fees.filter(f => f.status === "paid").length}</span>
                      <span className="stat-label">Paid</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value unpaid">{fees.filter(f => f.status === "unpaid").length}</span>
                      <span className="stat-label">Unpaid</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value" style={{ color: "var(--portal-purple)" }}>{paidPct}%</span>
                      <span className="stat-label">Cleared</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ── MONTHLY DETAILS ── */}
            <div className="fee-table-box">
              <h3>📅 Monthly Fee Details</h3>

              <div className="months-accordion">

                {sortedMonths.map((monthGroup) => {

                  const key = `${monthGroup.month}-${monthGroup.year}`;

                  const isExpanded =
                    expandedMonth === key;

                  return (
                    <div
                      key={key}
                      className={`month-card ${
                        monthGroup.allPaid
                          ? "paid"
                          : "unpaid"
                      }`}
                    >

                      {/* HEADER */}

                      <div
                        className="month-header"
                        onClick={() => toggleMonth(key)}
                      >

                        {/* LEFT */}
                        <div className="month-left">

                          <div className="month-badge">
                            {getMonthName(
                              monthGroup.month
                            ).slice(0, 3)}
                          </div>

                          <div className="month-title">

                            <h4>
                              {getMonthName(
                                monthGroup.month
                              )}{" "}
                              {monthGroup.year}
                            </h4>

                            <span className="fee-count">
                              {
                                monthGroup.fees.length
                              }{" "}
                              fee type
                              {monthGroup.fees.length > 1
                                ? "s"
                                : ""}
                            </span>

                          </div>

                        </div>

                        {/* RIGHT */}
                        <div className="month-right">

                          <div className="amount-badges">

                            <span className="badge total">
                              💰{" "}
                              {monthGroup.totalAmount.toLocaleString()}
                            </span>

                            <span className="badge paid">
                              ✅{" "}
                              {monthGroup.totalPaid.toLocaleString()}
                            </span>

                            {monthGroup.totalDue > 0 && (
                              <span className="badge due">
                                ⚠️{" "}
                                {monthGroup.totalDue.toLocaleString()}
                              </span>
                            )}

                          </div>

                          <span
                            className={`month-status ${
                              monthGroup.allPaid
                                ? "paid"
                                : "unpaid"
                            }`}
                          >
                            {monthGroup.allPaid
                              ? "Fully Paid"
                              : "Pending"}
                          </span>

                          <span
                            className={`chevron ${
                              isExpanded ? "open" : ""
                            }`}
                          >
                            ▼
                          </span>

                        </div>

                      </div>

                      {/* DETAILS */}

                      {isExpanded && (

                        <div className="month-details">

                          <table className="fee-table">

                            <thead>
                              <tr>
                                <th>Fee Type</th>
                                <th>Amount</th>
                                <th>Paid</th>
                                <th>Due</th>
                                <th>Status</th>
                                <th>Due Date</th>
                              </tr>
                            </thead>

                            <tbody>

                              {monthGroup.fees.map((f) => (

                                <tr key={f.id}>

                                  <td>
                                    <span className="fee-type-name">
                                      {f.fee_type_name}
                                    </span>
                                  </td>

                                  <td className="amount-col">
                                    PKR{" "}
                                    {Number(
                                      f.fee_amount
                                    ).toLocaleString()}
                                  </td>

                                  <td className="paid-col">
                                    PKR{" "}
                                    {Number(
                                      f.amount_paid
                                    ).toLocaleString()}
                                  </td>

                                  <td
                                    className={`due-col ${
                                      Number(
                                        f.amount_due
                                      ) > 0
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    PKR{" "}
                                    {Number(
                                      f.amount_due
                                    ).toLocaleString()}
                                  </td>

                                  <td>
                                    <span
                                      className={`status-badge ${f.status}`}
                                    >
                                      {f.status === "paid"
                                        ? "✓ Paid"
                                        : "○ Unpaid"}
                                    </span>
                                  </td>

                                  <td className="due-date-col">
                                    {f.due_date
                                      ? new Date(
                                          f.due_date
                                        ).toLocaleDateString(
                                          "en-GB",
                                          {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          }
                                        )
                                      : "—"}
                                  </td>

                                </tr>

                              ))}

                            </tbody>

                            <tfoot>

                              <tr>

                                <td>
                                  <strong>
                                    Month Total
                                  </strong>
                                </td>

                                <td>
                                  <strong>
                                    PKR{" "}
                                    {monthGroup.totalAmount.toLocaleString()}
                                  </strong>
                                </td>

                                <td>
                                  <strong>
                                    PKR{" "}
                                    {monthGroup.totalPaid.toLocaleString()}
                                  </strong>
                                </td>

                                <td colSpan={3}>

                                  <strong
                                    className={
                                      monthGroup.totalDue > 0
                                        ? "text-danger"
                                        : "text-success"
                                    }
                                  >
                                    PKR{" "}
                                    {monthGroup.totalDue.toLocaleString()}{" "}
                                    Due
                                  </strong>

                                </td>

                              </tr>

                            </tfoot>

                          </table>

                        </div>

                      )}

                    </div>
                  );
                })}

              </div>

            </div>

          </>
        )}

      </div>
    </>
  );
}

export default Fees;