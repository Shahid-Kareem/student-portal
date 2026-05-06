import React from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import "./InfoCard.css";

const InfoCard = ({ title, data }) => {
  return (
    <Card>
      <CardHeader title={title} />

      {data.map(([label, value, icon], i) => (
        <div
          key={label}
          className="info-row"
          style={{
            borderBottom:
              i !== data.length - 1 ? "1px solid var(--border)" : "none"
          }}
        >
          <span className="icon">{icon}</span>

          <div>
            <div className="label">{label}</div>
            <div className="value">{value}</div>
          </div>
        </div>
      ))}
    </Card>
    
  );
};

export default InfoCard;