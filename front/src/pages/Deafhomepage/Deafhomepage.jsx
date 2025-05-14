
import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

const services = [
  { title: "Fast Emergency Service", image: "/assets/emergency-pic.png", link: "/emergency", bg: "bg-yellow-100" , description: "Quick access to emergency assistance for urgent situations.", imgSize: " w-48 h-48"},
  { title: "Lecture Live Transcription", image: "../../../public/assets/lecture1.png", link: "/transcription", bg: "bg-blue-100" , description: "Live transcription for deaf students", imgSize: "w-48 h-48"},
  { title: "Mental Health ChatBot", image: "../../../public/assets/chat1.jpg", link: "/chatbot", bg: "bg-yellow-100" , description: "Offering mental health advice for deaf individuals", imgSize: "w-48 h-48"},



  // { title: "Volunteer Assistance", image: "/assets/volunteer-help-pic.png", link: "/dailylife", bg: "bg-blue-100", description: "Connect with volunteers who know sign language and are ready to help.", imgSize: "w-48 h-48" },
  { title: "Education", image: "/assets/education-pic.png", link: "/Courses", bg: "bg-blue-100", description: "Access courses for better learning.", imgSize: "w-48 h-48" },
  { title: "Job Opportunities", image: "/assets/job-opp-pic.png", link: "/jobs", bg: "bg-yellow-100", description: "Explore job opportunities tailored for the deaf community.", imgSize: "w-48 h-48" },
  { title: "Entertainment Services", image: "/assets/entertainment-pic.png", link: "/Entertainment-home", bg: "bg-blue-100", description: "Enjoy entertainment services accessible for the deaf.", imgSize: "w-48 h-48" },
  { title: " places recommendations", image: "/assets/places-pic.png", link: "/places-to-go", bg: "bg-yellow-100", description: "Discover deaf-friendly places", imgSize: "w-48 h-48" }
];

const Deafhomepage = () => {
   
  

    return (
        <>
     <Upperbar/>
    <div className="bg-[#0078AA] text-white p-10 flex flex-col md:flex-row justify-between items-center">
    <div>
      <h1 className="text-5xl font-bold">Welcome,</h1>
      <p className="mt-2 text-xl max-w-lg">Every step you take here brings us closer to a world with better communication and understanding. Explore, engage, and grow with the community</p>
      <p className="mt-3 text-[#FFC107] font-semibold text-lg">Need immediate Help?</p>
      <Link to="/emergency" className="mt-2 inline-block bg-[#D71010] text-white px-10 py-7 rounded-lg font-semibold text-xl hover:bg-red-700">
        Emergency case
      </Link>
    </div>
    <img src="/assets/homeheader.png" alt="Sign Language Illustration" className="w-5/12 md:w-1/3 max-w-xs md:max-w-md lg:max-w-lg md:mr-[3cm] mt-6 md:mt-0 mx-auto" />
  </div>

<div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700">Why Us</h2>
      <p className="text-center text-gray-600 mt-2 max-w-xl mx-auto">
      The first platform to combine emergency assistance, sign language learning, job opportunities, and community support—all in one place!
      </p> 
      <div className="mt-8 space-y-8">
        {services.map((service, index) => (
          <Link
            to={service.link}
            key={service.title}
            className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""} p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${service.bg}`}
          >
            <img src={service.image} alt={service.title} className="${service.imgSize} object-cover" />
            <div className="p-6 text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
</div>
<Foooter/>
  </>
      );
}

export default Deafhomepage;
