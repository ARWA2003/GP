import Foooter from "./footer/footer";
import Upperbar from "./Upperbar";

export default function AboutUs() {
    return (
      <div className="bg-gray-200 ">
   
<Upperbar/>
<div className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-20px] left-[-150px] shadow-lg flex items-center justify-center"> </div>
<div className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px]"></div>

       <div className="bg-gray-200 min-h-screen flex flex-col items-center p-8 mt-[40px]">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#0078AA] z-[1]">About us</h2>
        
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl text-center">
          {/* Our Mission */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md z-[1]">
            <h3 className="text-xl font-semibold text-center mb-3 text-[#0078AA]">our mission</h3>
            <p className="text-[gray-700]">
              To empower the deaf and mute community by providing accessible tools, 
              resources, and opportunities that promote inclusion and independence.
            </p>
          </div>
  
          {/* Who We Help */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md z-[1]">
            <h3 className="text-xl font-semibold text-center mb-3 text-[#0078AA]">Who We Help</h3>
            <p className="text-gray-700">
              <strong>- Deaf & Mute Individuals</strong> – Access tools and services designed to support everyday life.
              <br />
              <strong>- Hearing Individuals</strong> – Learn sign language and become more inclusive in communication.
              <br />
              <strong>- Businesses</strong> – Create a deaf-friendly environment and improve accessibility.
              <br />
              <strong>- Volunteers</strong> – Connect with the community and offer assistance where needed.
            </p>
          </div>
  
          {/* Why HearMeOut */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md z-[1]">
            <h3 className="text-xl font-semibold text-center mb-3 text-[#0078AA]">Why HearMeOut?</h3>
            <p className="text-gray-700">
              Unlike any other platform, we bring all essential services together to create a truly 
              inclusive space. Whether it’s learning sign language, finding job opportunities, or 
              seeking emergency help, we are here to support every step of the journey.
            </p>
          </div>
        </div>
        
      </div>
      
<Foooter/>

      </div>
    );
  }
  