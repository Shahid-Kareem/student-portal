import React, { useState } from "react";
import Topbar from '../Components/Topbar';
import { notices } from "../Data/Notices";
import NoticeCard from "../Components/NoticeCard";
import Card from "../Components/Card";
import "./Notices.css";

const Notices = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
    <Topbar 
        page="notices" 
        pageTitles={{ notices: "Notices" }} 
      />

    <div className="notices-container">

      {/* LIST */}
      <div className="notices-grid">
        {notices.map((n, i) => (
          <NoticeCard
            key={i}
            notice={n}
            isOpen={selected === i}
            onClick={() => setSelected(selected === i ? null : i)}
          />
        ))}
      </div>

      {/* INFO CARD */}
      <Card className="notice-info">
        📌 Click any notice to expand it. More notices will appear here when posted by school administration.
      </Card>

    </div>
    </>

  );
};

export default Notices;