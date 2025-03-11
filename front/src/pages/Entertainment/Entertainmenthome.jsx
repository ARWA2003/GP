import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";


const Entertainmenthome = () => {

    return (
      <>
      <Upperbar/>
      <div className="bg-gray-300 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <img src="/assets/shortM.png" alt="Film Illustration" className="w-80 lg:max-w-lg mt-6 md:mt-0 mx-auto " />  
        <div className="items-center justify-between text-center ">
        <h1 className="text-2xl md:text-4xl mb-4 text-gray-800 mr-32">Bringing Stories to Life ,</h1>
        <h1 className="text-2xl md:text-4xl  text-gray-800 ">Enjoy Accessible stories</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-12 flex flex-col md:flex-row gap-8 px-6">
        <Link to="/Entertainment-vid" className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 flex-1 text-center">
          <h2 className="text-3xl font-bold text-blue-700">Entertainment videos</h2>
          <p className="mt-2 text-gray-700">
            Dive into a collection of inspiring different videos crafted with American Sign Language (ASL).
          </p>
          <img src="/assets/entHome1.png" alt="Short Movies" className="mt-20 w-96 mx-auto" />
        </Link>

        <Link to="/books" className="bg-blue-200 p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 flex-1 text-center">
          <h2 className="text-3xl font-bold text-yellow-500">Books</h2>
          <p className="mt-2 text-grey-700">
            read inspire books in different topics for different ages .
          </p>
          <img src="/assets/boook.svg" alt="books" className="mt-14 w-64 mx-auto" />
        </Link>
      </div>
      <Foooter/>
      </>
  );
};

export default Entertainmenthome;