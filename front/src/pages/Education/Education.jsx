
import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

const services = [
    { title: "Sign language learning", image: "/assets/edu2.png", link: "/sign-language", bg: "bg-blue-100" , description: "sign language tutorials for all levels.", imgSize: " w-48 h-48"},
    { title: "Career Preparation", image: "/assets/edu5.png", link: "/career-prep", bg: "bg-blue-100" , description: "Interview Preparation,Resume templete Writing ,Soft Skills tips.", imgSize: "w-48 h-48"},
    { title: "Educational Support Tools", image: "/assets/edu6.png", link: "/educational-tools", bg: "bg-blue-100", description: "Apps, software, and other tools for deaf-friendly education.", imgSize: "w-48 h-48" },
   
  ];
const Education = () => {
  return ( <>
    <Upperbar/>
   <div className="bg-[#0078AA] text-white p-10 flex flex-col md:flex-row justify-between items-center">
   <div>
     <h1 className="text-5xl font-bold">Discover Sign Language: <br />
        Learn ,Practice ,Communicate</h1>
        <br />
    
     <p className="mt-3 text-[#FFC107] font-semibold text-lg">and more educational services</p>

   </div>
   <img src="/assets/edu1.png" alt="Sign Language Illustration" className="w-5/12 md:w-1/3 max-w-xs md:max-w-md lg:max-w-lg md:mr-[3cm] mt-6 md:mt-0 mx-auto" />
 </div>

<div className="max-w-5xl mx-auto p-6">

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

export default Education