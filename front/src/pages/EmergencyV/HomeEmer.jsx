import { useState, useEffect } from "react";
import Foooter from "../footer/footer";
import { Link } from "react-router-dom";
import UpperbarV from "../UpperbarV";

const HomeEmer = () => {
  const alerts = [
    { type: "fire", location: "new cairo" },
    { type: "injurey", location: "alexandria" },
    { type: "fire", location: "aswan" }
  ];

  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>  
<UpperbarV/>
    <div className="flex flex-col items-center gap-4 p-4">
      {alerts.map((alert, index) => (
        <div key={index} className="relative w-96 h-96 bg-gray-300 p-10 mt-10 rounded-lg text-center">
          <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-red-600 text-8xl font-extrabold mt-10">!</span>
          </div>
          <h2 className={`text-red-600 font-bold text-5xl mt-11 ${flash ? "opacity-100" : "opacity-60"}`}>Emergency</h2>
          <p className="text-black text-3xl font-bold mt-11">{alert.type}</p>
          <p className="text-black text-3xl font-bold mt-4">{alert.location}</p>
          <Link to="/detailsEmer">
           <button className="bg-red-400 text-white font-bold px-4 py-1 mt-2 rounded w-28 h-20 hover:bg-red-500">details</button>
           </Link>
        </div>
      ))}
    </div>
    <Foooter/>

</>
  );
};

export default HomeEmer;