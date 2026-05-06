import React from "react";
import Topbar from "../Components/Topbar";
import ScheduleCard from "../Components/ScheduleCard";

function Schedule() {
  return (
    <>
      <Topbar 
        page="schedule" 
        pageTitles={{ schedule: "Schedule" }} 
      />

      <ScheduleCard />
    </>
  );
}

export default Schedule;