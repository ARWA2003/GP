import { Routes, Route } from 'react-router-dom';
import DeafSignUp from './pages/DeafSignUp/deafsignuplogin';
import Home from './pages/Home'; // Homepage with role selection
import DeafLogin from './pages/DeafSignUp/DeafLogin.jsx';
import DeafForgotPassword from './pages/DeafSignUp/DeafForgotPassword.jsx';
import VolunteerLogin from './pages/VolunteerSignUp/VolunteerLogin.jsx';
import Deafhomepage from './pages/Deafhomepage/Deafhomepage.jsx';
import VolunteerSignUp from './pages/VolunteerSignUp/Volunteersignuplogin';
import Volunteerhomepage from './pages/VolunteerHomepage/Volunteerhomepage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs/ContactUs.jsx';
import VolunteerForgotPassword from './pages/VolunteerSignUp/VolunteerForgotPassword.jsx'
import Entertainmenthome from './pages/Entertainment/Entertainmenthome.jsx'
import Education from './pages/Education/Education.jsx';
import DeafVolunteerAssistance from './pages/DeafVolunteerAssistance/DeafVolunteerAssistance.jsx';
import Reels from './pages/Entertainment/Reels.jsx';
import ShortMovies from './pages/Entertainment/ShortM.jsx';
import JobPortal from './pages/Jobs/JobPortal.jsx';
import Careers from './pages/Jobs/Careers.jsx';
import JobDetails from './pages/Jobs/JobDetails.jsx';
import Profile from './pages/Profile/Profile.jsx';
import EntV from './pages/Entertainment/EntV.jsx';
import Etools from './pages/Education/Etools.jsx';
import Courses from './pages/Education/courses.jsx';
import Careerhome from './pages/Education/Careerhome..jsx';
import CareerResume from './pages/Education/Careerresume.jsx';
const App = () => {
  return (<>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deaf-signup" element={<DeafSignUp />} />
      <Route path="/volunteer-signup" element={<VolunteerSignUp />} />
      <Route path="/deaf-login" element={<DeafLogin />} />
      <Route path="/deaf-forgot-password" element={<DeafForgotPassword />} />
      <Route path="/volunteer-login" element={<VolunteerLogin />} />
      <Route path="/volunteer-forgot-password" element={<VolunteerForgotPassword />} />
      <Route path="/Deafhomepage" element={<Deafhomepage />} />
      <Route path="/volunteerhomepage" element={<Volunteerhomepage />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/Entertainment-home" element={<Entertainmenthome />} />
      <Route path="/education" element={<Education />} />
      <Route path="/DeafVolunteerAssistance" element={<DeafVolunteerAssistance />} />
      <Route path="/Reels" element={<Reels />} />
      <Route path="/ShortMovies" element={<ShortMovies />} />
      <Route path="/jobs" element={<JobPortal/>}/>
      <Route path="/careers" element={<Careers/>}/>
      <Route path="/job-details" element={<JobDetails/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/Entertainment-vid" element={<EntV />} />
      <Route path="/Etools" element={<Etools />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/Careerhome" element={<Careerhome />} />
      <Route path="/Careercv" element={<CareerResume />} />


      





    </Routes>
  </>
  
    
  );
};

export default App;
