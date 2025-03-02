import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

const services = [
   
   
    // { title: "Event organizing", image: "/assets/deafvol6.png", link: "/event", bg: "bg-blue-100", description: "Apps, software, and other tools for deaf-friendly education.", imgSize: "w-48 h-48" },
];

const DeafVolunteerAssistance = () => {
  return (
    <>
      <Upperbar />

      {/* Find Support Section */}
      <div className="bg-[#F2DF3A] p-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[#0078AA]">Find Support</h1>
        <img 
          src="/assets/deafvol1.png" 
          alt="Sign Language Illustration" 
          className="w-10/12 md:w-7/12 lg:w-5/12 max-w-lg mt-6"
        />
        <p className="mt-3 text-[#0078AA] font-semibold text-lg">
          Connect with a Caring Volunteer
        </p>
      </div>

      {/* Clickable "Daily life needs" Section */}
      <Link to="/dailylife" className="block">
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-blue-100 rounded-lg shadow-md text-center hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Daily life needs</h3>
          
          {/* Two-Image Layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Left Image (Chat) */}
            <div className="flex flex-col items-center p-4 border rounded-lg w-full md:w-1/2">
              <img
                src="/assets/deafvol2.png"
                alt="Chat with Volunteer"
                className="w-40 h-40 object-cover"
              />
              <p className="text-gray-800 mt-2 text-center">
                Connect with volunteer through chat
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-40 bg-gray-400"></div>

            {/* Right Image (Video Call) */}
            <div className="flex flex-col items-center p-4 w-full md:w-1/2">
              <img
                src="/assets/deafvol3.png"
                alt="Video Call with Volunteer"
                className="w-40 h-40 object-cover"
              />
              <p className="text-gray-800 mt-2 text-center">
                Connect with volunteer through video call
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Rest of the Services */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="mt-8 space-y-8">
          {services.map((service) => (
            <Link
              to={service.link}
              key={service.title}
              className={`flex flex-col md:flex-row items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${service.bg}`}
            >
              <img src={service.image} alt={service.title} className={`${service.imgSize} object-cover`} />
              <div className="p-6 text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Foooter />
    </>
  );
};

export default DeafVolunteerAssistance;
