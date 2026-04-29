import React from 'react'
import Topbar from '../Components/Topbar'
import {student} from '../Data/Student';
import ProfileCard from '../Components/ProfileCard';
import InfoCard from '../Components/InfoCard';

function Profile() {
  return (
    <>
        <Topbar 
             page="dashboard" 
             pageTitles={{ dashboard: "Profile" }} />
          <div>
            <ProfileCard student={student} />
          </div>

            <InfoCard
              title="👤 Personal Information"
              data={[
              ["Full Name", student.name, "👤"],
              ["Date of Birth", student.dob, "🎂"],
              ["Blood Group" , student.blood, "🩸"],
              ["Nationality", student.nationality, "🌍"],
              ["Email", student.email, "✉️"],
              ["Address", student.address, "📍"]
              ]}
            />    
            <InfoCard
              title="📚 Academic Information"
              data={[
              ["School", student.school, "🏫"],
              ["Grade", student.grade, "📋"],
              ["Roll No", student.roll,"🔢"],
              ["Section", student.section, "🔤"],
              ["Board", student.board, "📜"],
              ["Enrollment Date", student.enrolled, "📅"],
              ["Student ID", student.id, "🪪"]
              ]}
            />
            <InfoCard
              title="👨‍👩‍👧 Guardian Info"
              data={[
              ["Guardian Name", student.guardian, "👨‍👦"],
              ["Relationship", student.relation, "🤝"],
              ["Phone", student.guardianPhone, "📞"],
              ["Email", student.gardianmail,"✉️"],
              ["Occupation",student.occupation,"💼"],
              ["CNIC",student.fathercnic,"🪪"]
              ]}
            />
            <InfoCard
             title="🏆 Achievements"
             data={[
             ["Chess Winner", "School Level", "♟"],
             ["Top 10%", "Class Rank", "🥇"],
             ]}
            />
          
    </>
       
      
       

      
     
  
  )
}

export default Profile