import { Link } from "react-router-dom";
import Foooter from "../footer/footer";
import UpperbarV from "../UpperbarV";



const services = [
  { title: "ASL learning", image: "/assets/Vhome2.png", link: "/ASLlevels", bg: "bg-blue-100" , description: "", imgSize: "w-40 h-40"},
  { title: "Emergency Response", image: "/assets/Vhome5.png", link: "/EmerRes", bg: "bg-yellow-100", description: "", imgSize: "w-48 h-48" },
  { title: "Help with Daily life: Chat/video call", image: "/assets/dailylifeneedsV.png", link: "/dailylifeV", bg: "bg-blue-100", description: "", imgSize: "w-48 h-48" },

  
];
const Volunteerhomepage = () => {

  return (
    <>
      <UpperbarV/>
      {/* Hero Section */}
      <div className="bg-[#0078AA] text-white p-10 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">Welcome back</h1>
          <p className="mt-2 text-xl max-w-lg">Ready to make a difference? Explore new volunteer opportunities and help create a more inclusive world!</p>
          {/* <Link to="/get-involved" className="mt-2 inline-block bg-[#ffffff] text-black px-10 py-7 rounded-lg font-semibold text-xl hover:bg-yellow-500">
            Get Involved
          </Link> */}
        </div>
        <img src="/assets/volunteerheader.png" alt="Sign Language Illustration" className="w-5/12 md:w-1/3 max-w-xs md:max-w-md lg:max-w-lg md:mr-[3cm] mt-6 md:mt-0 mx-auto" />
      </div>

      {/* Cards Section */}
     
      <div className="max-w-5xl mx-auto p-6">
      {/* <h2 className="text-3xl font-bold text-center text-blue-700">Volunteering Opportuinities</h2> */}
      {/* <p className="text-center text-gray-600 mt-2 max-w-xl mx-auto">
      The first platform to combine emergency assistance, sign language learning, job opportunities, and community support—all in one place!
      </p>  */}
 <div className="mt-8 space-y-8">
        {services.map((service, index) => (
          <Link
            to={service.link}
            key={service.title}
            className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""} p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${service.bg}`}
          >
            <img src={service.image} alt={service.title} className="${service.imgSize} object-cover" />
            <div className="p-6 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
</div>


<Foooter/>
    </>
  );
};

export default Volunteerhomepage;