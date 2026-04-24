import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faBook, faFileAlt, faClipboard, faChartBar, faCalendarDays, faClipboardList, faFilePen, faChartLine, faSchool, faMoneyBill1Wave, faCreditCard, faRunning, faBell, faBullhorn, faHeadset, faChalkboardUser, faCog } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons/faTableColumns";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons/faGraduationCap";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons/faUserCheck";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">

      {/* ===== Overview Section ===== */}
      <h4 className="sidebar-heading"><FontAwesomeIcon icon={faTableColumns}/> Overview</h4>

      <div
        className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
        onClick={() => navigate("/dashboard")}
      >
        <FontAwesomeIcon icon={faHouse}/> Dashboard
      </div>

      <div
        className={`menu-item ${isActive("/profile") ? "active" : ""}`}
        onClick={() => navigate("/profile")}
      >
        <FontAwesomeIcon icon={faUser}/>  Profile
      </div>

      <div
        className={`menu-item ${isActive("/schedule") ? "active" : ""}`}
        onClick={() => navigate("/schedule")}
      >
        <FontAwesomeIcon icon={faCalendarDays}/> Schedule
      </div>

      {/* ===== Academics Section ===== */}
      <h4 className="sidebar-heading"><FontAwesomeIcon icon={faGraduationCap}/> Academics</h4>

      <div
        className={`menu-item ${isActive("/subjects") ? "active" : ""}`}
        onClick={() => navigate("/subjects")}
      >
        <FontAwesomeIcon icon={faBookOpen}/> Subjects & Grades
      </div>

      <div
        className={`menu-item ${isActive("/assignments") ? "active" : ""}`}
        onClick={() => navigate("/assignments")}
      >
        <FontAwesomeIcon icon={faClipboardList}/> Assignments
      </div>

      <div
        className={`menu-item ${isActive("/exams") ? "active" : ""}`}
        onClick={() => navigate("/exams")}
      >
        <FontAwesomeIcon icon={faFilePen}/> Exams
      </div>

      <div
        className={`menu-item ${isActive("/report") ? "active" : ""}`}
        onClick={() => navigate("/report")}
      >
        <FontAwesomeIcon icon={faChartLine}/> Report Card
      </div>

      /*.....School Life........ */
      <h4 className="sidebar-heading"><FontAwesomeIcon icon={faSchool}/> School Life</h4>
      <div
        className={`menu-item ${isActive("/attendance") ? "active" : ""}`}
        onClick={() => navigate("/attendance")}
      >
        <FontAwesomeIcon icon={faUserCheck}/> Attendance
      </div>
      <div
        className={`menu-item ${isActive("/Fee & payments") ? "active" : ""}`}
        onClick={() => navigate("/Fee&payments")}
      >
        <FontAwesomeIcon icon={faCreditCard}/> Fee & Payments
      </div>
      <div
        className={`menu-item ${isActive("/library") ? "active" : ""}`}
        onClick={() => navigate("/library")}
      >
        <FontAwesomeIcon icon={faBook}/> Library
      </div>
      <div
        className={`menu-item ${isActive("/activities") ? "active" : ""}`}
        onClick={() => navigate("/activities")}
      >
        <FontAwesomeIcon icon={faRunning}/> Activities
      </div>
      <div
        className={`menu-item ${isActive("/attendance") ? "active" : ""}`}
        onClick={() => navigate("/attendance")}
      >
        <FontAwesomeIcon icon={faUserCheck}/> Attendance
      </div>
      <div
        className={`menu-item ${isActive("/notices") ? "active" : ""}`}
        onClick={() => navigate("/notices")}
      >
        <FontAwesomeIcon icon={faBell}/> Notices
      </div>

      /*.....SUPPORT..... */
      <h4 className="sidebar-heading"><FontAwesomeIcon icon={faHeadset}/> Support</h4>
      <div
        className={`menu-item ${isActive("/teachers") ? "active" : ""}`}
        onClick={() => navigate("/teachers")}
      >
        <FontAwesomeIcon icon={faChalkboardUser}/> Teachers
      </div>
      <div
        className={`menu-item ${isActive("/settings") ? "active" : ""}`}
        onClick={() => navigate("/settings")}
      >
        <FontAwesomeIcon icon={faCog}/> Settings
      </div>







    </div>
  );
}

export default Sidebar;