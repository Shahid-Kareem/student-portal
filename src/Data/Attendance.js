export const attendance = {
  total:120, present:50, absent:30, late:40, leave:0,
  monthly:[
    {month:"Sep",p:80},{month:"Oct",p:60},{month:"Nov",p:38},{month:"Dec",p:92},
    {month:"Jan",p:95},{month:"Feb",p:88},{month:"Mar",p:99},{month:"Apr",p:117},
  ],
  bySubject:[
    {name:"Mathematics",present:10,absent:5,late:5},
    {name:"Physics",present:17,absent:2,late:0},
    {name:"Chemistry",present:16,absent:3,late:1},
    {name:"Biology",present:19,absent:0,late:1},
    {name:"English",present:18,absent:1,late:0},
    {name:"Computer Sci.",present:10,absent:9,late:0},
    {name:"Urdu",present:17,absent:2,late:0},
  ],
  logs: [
    { date: "Apr 8", day: "Tuesday", subject: "Chemistry", type: "Full Day", status: "Absent" },
    { date: "Apr 2", day: "Wednesday", subject: "Physics", type: "Full Day", status: "Absent" },
    { date: "Mar 25", day: "Tuesday", subject: "Chemistry", type: "Late", status: "Late (15 min)" },
    { date: "Mar 18", day: "Wednesday", subject: "Chemistry", type: "Full Day", status: "Absent" },
    { date: "Feb 28", day: "Friday", subject: "English", type: "Partial", status: "Medical Leave" },
  ],
};
