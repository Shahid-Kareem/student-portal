import React from "react";
import "./Fees.css";
import Topbar from '../Components/Topbar.jsx';
import { fees } from "../Data/Fees.js";
import Card from "../Components/Card";
import CardHeader from "../Components/CardHeader";
import ProgressBar from "../Components/ProgressBar";

function Fees() {
  const paid = fees
    .filter((f) => f.status === "paid")
    .reduce((a, f) => a + f.amount, 0);

  const unpaid = fees
    .filter((f) => f.status === "unpaid")
    .reduce((a, f) => a + f.amount, 0);

  const nextDue = fees.find((f) => f.status === "unpaid");

  return (
    <>
      <Topbar 
        page="fee" 
        pageTitles={{ fee: "Fee & Payments" }} 
      />
    <div className="fee">

      {/* Summary Cards */}
      <div className="fee-summary">
        {[
          ["Total Paid", `PKR ${paid.toLocaleString()}`, "var(--success)", "✅"],
          ["Due Balance", `PKR ${unpaid.toLocaleString()}`, "var(--danger)", "⚠️"],
          [
            "Next Due",
            nextDue ? nextDue.label : "—",
            "var(--warn)",
            "📅",
          ],
        ].map(([label, value, color, icon]) => (
          <div key={label} className="fee-card">
            <div className="icon">{icon}</div>
            <div>
              <h3 style={{ color }}>{value}</h3>
              <p>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="fee-grid">

        {/* Payment History */}
        <Card>
          <CardHeader title="💰 Payment History" />

          <table className="fee-table">
            <thead>
              <tr>
                {["Description", "Amount", "Date", "Status"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {fees.map((f) => (
                <tr key={f.id}>
                  <td>{f.label}</td>
                  <td className="amount">
                    PKR {f.amount.toLocaleString()}
                  </td>
                  <td className="date">{f.date || "—"}</td>
                  <td>
                    <span
                      className={
                        f.status === "paid"
                          ? "status paid"
                          : "status unpaid"
                      }
                    >
                      {f.status === "paid" ? "✓ Paid" : "⚠ Unpaid"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Right Side */}
        <div className="fee-right">

          {/* Breakdown */}
          <Card>
            <CardHeader title="📊 Fee Breakdown" />

            {fees.map((item) => (
              <div key={item.label} className="breakdown-item">
                <div className="breakdown-top">
                  <span>{item.label}</span>
                  <span style={{ color: item.color }}>
                    PKR {item.amount.toLocaleString()}
                  </span>
                </div>

                <ProgressBar
                  pct={(item.amount / 55000) * 100}
                  color={item.color}
                />
              </div>
            ))}
          </Card>

          {/* Reminder */}
          <div className="fee-reminder">
            <h4>⚠️ Payment Reminder</h4>
            <p>
              {nextDue ? (
                <>
                  {nextDue.label} of{" "}
                  <strong>PKR {nextDue.amount.toLocaleString()}</strong>{" "}
                  is due soon. Late fine:{" "}
                  <strong className="danger">PKR 50/day</strong>
                </>
              ) : (
                "No pending payments 🎉"
              )}
            </p>

            <button className="pay-btn">Pay Online →</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Fees;