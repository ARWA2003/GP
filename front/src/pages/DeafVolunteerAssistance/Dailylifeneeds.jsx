import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import Footer from "../footer/footer";

const DailyLifeNeeds = () => {
  return (
    <>
      <Upperbar />

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

      {/* Two Cards for Chat and Video Call */}
      <div className="max-w-4xl mx-auto mt-8 p-6 flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Chat Card */}
        <Link
          to="/chat-with-volunteer"
          className="w-full md:w-1/2 p-6 bg-blue-100 rounded-lg shadow-md text-center hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          <img
            src="/assets/deafvol2.png" // Replace with the actual path to your chat illustration
            alt="Chat with Volunteer"
            className="w-40 h-40 object-cover mx-auto"
          />
          <h3 className="text-xl font-bold text-gray-800 mt-4">Chat with Volunteer</h3>
          <p className="text-gray-600 mt-2">
            Connect with a caring volunteer through text chat for daily life support.
          </p>
        </Link>

        {/* Video Call Card */}
        <Link
          to="/video-call-with-volunteer"
          className="w-full md:w-1/2 p-6 bg-blue-100 rounded-lg shadow-md text-center hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          <img
            src="/assets/deafvol3.png" // Replace with the actual path to your video call illustration
            alt="Video Call with Volunteer"
            className="w-40 h-40 object-cover mx-auto"
          />
          <h3 className="text-xl font-bold text-gray-800 mt-4">Video Call with Volunteer</h3>
          <p className="text-gray-600 mt-2">
            Connect with a caring volunteer through video call for daily life support.
          </p>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default DailyLifeNeeds;