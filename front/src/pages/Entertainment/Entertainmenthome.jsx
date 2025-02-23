import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";


const Entertainmenthome = () => {

    return (
      <>
      <Upperbar/>
      <div className="bg-gray-300 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <img src="/assets/entHome1.png" alt="Film Illustration" className="w-5/12 md:w-1/3 md:max-w-md lg:max-w-lg mt-6 md:mt-0 mx-auto" />  
        <div className="items-center justify-between text-center ">
        <h1 className="text-2xl md:text-4xl mb-4 text-gray-800">Bringing Stories to Life ,</h1>
        <h1 className="text-2xl md:text-4xl  text-gray-800">Enjoy Accessible Short Films & Reels</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-12 flex flex-col md:flex-row gap-8 px-6">
        <Link to="/Entertainment-vid" className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 flex-1 text-center">
          <h2 className="text-3xl font-bold text-blue-700">Entertainment videos</h2>
          <p className="mt-2 text-gray-700">
            Dive into a collection of inspiring different videos crafted with American Sign Language (ASL).
          </p>
          <img src="/assets/shortM.png" alt="Short Movies" className="mt-4 w-60 mx-auto" />
        </Link>

        <Link to="/Reels" className="bg-yellow-200 p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 flex-1 text-center">
          <h2 className="text-3xl font-bold text-blue-700">Reels</h2>
          <p className="mt-2 text-gray-700">
            Reels that speak to everyone: subtitled & signed for full accessibility.
          </p>
          <img src="/assets/reels.png" alt="Reels" className="mt-14 w-60 mx-auto" />
        </Link>
      </div>
      <Foooter/>
      </>
  );
};

export default Entertainmenthome;