import { Link } from "react-router-dom"
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { motion } from "framer-motion";
const circleAnimation = {
  animate: {
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const Profile = () => {
  return (
    <>
         <Upperbar/>
         <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
    
    <motion.div
      variants={circleAnimation}
      animate="animate"
      className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-150px] left-[-150px] shadow-lg"
    ></motion.div>

    <motion.div
      variants={circleAnimation}
      animate="animate"
      className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px]"
    ></motion.div>

  
        <div className="relative bg-gradient-to-r from-yellow-200 to-blue-500 p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl grid place-items-center">
        <div className="relative bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl grid place-items-center">
        <img src="../../../public/assets/logo123.png" alt="HearMeOut Logo" className="w-40 h-40 mx-auto" />
        <h2 className="text-blue-800 mb-32 text-3xl font-semibold">profile</h2>

    <Link to="/" className="mt-2 inline-block bg-[#1034d7] text-white px-10 py-7 rounded-lg font-semibold text-xl hover:bg-blue-700">
        Sign Out
      </Link>
       
      </div>
    </div>
  </div>
      <Foooter/>
      
    </>
    
  )
}

export default Profile