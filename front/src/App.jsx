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
import Banking from './pages/Jobs/Banking.jsx';
import Writing from './pages/Jobs/Writing.jsx';
import Design from './pages/Jobs/Design.jsx';
import IT from './pages/Jobs/IT.jsx';
import Business from './pages/Jobs/Business.jsx';
import Finance from './pages/Jobs/Finance.jsx';
import JobCategories from './pages/Jobs/JobCategories.jsx';
import Profile from './pages/Profile/Profile.jsx';
import EntV from './pages/Entertainment/EntV.jsx';
import Etools from './pages/Education/Etools.jsx';
import Courses from './pages/Education/courses.jsx';
import Careerhome from './pages/Education/Careerhome..jsx';
import CareerResume from './pages/Education/Careerresume.jsx';
import TextToSpeechPage from './pages/TextToSpeechPage/TextToSpeechPage.jsx';
import ASLlevels from './pages/ASLlearning/ASLlevels.jsx';
import Beg from './pages/ASLlearning/Beg.jsx';
import Advanc from './pages/ASLlearning/Advan.jsx';
import Inter from './pages/ASLlearning/Inter.jsx';
import HomeEmer from './pages/EmergencyV/HomeEmer.jsx';
import Emptyemer from './pages/EmergencyV/Emptyemer.jsx';
import DetailsEme from './pages/EmergencyV/DetailsEme.jsx';
import DailyLifeNeeds from './pages/DeafVolunteerAssistance/Dailylifeneeds.jsx';
import Chat from './pages/DeafVolunteerAssistance/Chat.jsx';
import ChatInterface from './pages/DeafVolunteerAssistance/ChatInterface.jsx';
import VideoCallInterface from './pages/DeafVolunteerAssistance/VideoCallInterface.jsx';
import VideoCall from './pages/DeafVolunteerAssistance/VideoCall.jsx';
import VolunteerChat from './pages/VolunteerDailyLifeNeeds/VolunteerChat.jsx';
import VolunteerChatInterface from './pages/VolunteerDailyLifeNeeds/VolunteerChatInterface.jsx';
import VolunteerVideoCall from './pages/VolunteerDailyLifeNeeds/VolunteerVideoCall.jsx';
import VolunteerVideoCallInterface from './pages/VolunteerDailyLifeNeeds/VolunteerVideoCallInterface.jsx';
import DailylifeV from './pages/VolunteerDailyLifeNeeds/DailylifeV.jsx';
import Places from './pages/Places/Places.jsx';
import ScrollToTop from "./pages/ScrollToTop";
import PlaceDetails from './pages/Places/PlaceDetails.jsx';
import ProfileV from './pages/Profile/ProfileV.jsx';
import CourseDetail from './pages/Education/CourseDetail.jsx';
import Books from './pages/Entertainment/Books.jsx';
import EmergencyForm from './pages/EmergencyFeature/EmergencyForm.jsx';
import ChatInGroup from './pages/ChatInGroup/ChatInGroup.jsx';
// import JobListings from './pages/Jobs/Careers.jsx';
const App = () => {
  return (<>
  <ScrollToTop />
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
      {/* <Route path="/job-categories" element={<JobListings/>}/> */}
      <Route path="/job-categories" element={<JobCategories/>}/>

      <Route path="/banking" element={<Banking />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/business" element={<Business />} />
        <Route path="/design" element={<Design />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/it" element={<IT />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/Entertainment-vid" element={<EntV />} />
      <Route path="/Etools" element={<Etools />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:category" element={<CourseDetail />} />
      <Route path="/Careerhome" element={<Careerhome />} />
      <Route path="/Careercv" element={<CareerResume />} />
      <Route path="/text-to-speech" element={<TextToSpeechPage />} />
      <Route path="/beginner" element={<Beg/>} />
      <Route path="/intermediate" element={<Inter />} />
      <Route path="/advanced" element={<Advanc />} />
      <Route path="/ASLlevels" element={<ASLlevels />} />
      <Route path="/EmerRes" element={<HomeEmer />} />
      <Route path="/Emptyemer" element={<Emptyemer />} />
      <Route path="/detailsEmer" element={<DetailsEme />} />
      <Route path="/dailylife" element={<DailyLifeNeeds />} />
      <Route path="/chat-with-volunteer" element={<Chat />} />
      <Route path="/chat-with-volunteer/:id" element={<ChatInterface />} />
      <Route path="/video-call-with-volunteer" element={<VideoCall />} />
      <Route path="/video-call-with-volunteer/:id" element={<VideoCallInterface />} />
        <Route path="/volunteer-chat" element={<VolunteerChat />} />
        <Route path="/volunteer-chat-interface/:id" element={<VolunteerChatInterface />} />
        <Route path="/volunteer-video-call" element={<VolunteerVideoCall />} />
        <Route path="/volunteer-video-call-interface/:id" element={<VolunteerVideoCallInterface />} />
        <Route path="/dailylifeV" element={<DailylifeV />} />
        <Route path="/places-to-go" element={<Places />} />
        <Route path="/PlaceDetails/:placeName" element={<PlaceDetails />} />
        <Route path="/profileV" element={<ProfileV/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/emergency" element={<EmergencyForm/>} />
        <Route path="/ChatInGroup" element={<ChatInGroup/>} />









      





    </Routes>
  </>
  
    
  );
};

export default App;
