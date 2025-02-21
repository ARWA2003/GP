import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const floatingAnimation = {
  animate: {
    y: [0, -5, 0],  // Moves the card up and down slightly
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl font-bold text-blue-700 mb-8"
      >
        Choose your Role
      </motion.h1>

      <div className="flex gap-16">
        {/* Deaf Role */}
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="card bg-blue-700 text-white p-8 rounded-xl flex flex-col items-center shadow-lg cursor-pointer w-56 h-56 justify-center"
          onClick={() => navigate("/deaf-signup")}
        >
          <motion.img
            src="../../public/assets/Deaf111.png"
            alt="Deaf/Hard of Hearing"
            className="w-24 h-24 object-contain mb-4"
            whileHover={{ scale: 1.2 }}
          />
          <p className="text-lg font-semibold">Deaf/Hard of Hearing</p>
        </motion.div>

        {/* Volunteer Role */}
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="card bg-white text-yellow-500 p-8 rounded-xl flex flex-col items-center shadow-lg border cursor-pointer w-56 h-56 justify-center"
          onClick={() => navigate("/volunteer-signup")}
        >
          <motion.img
            src="../../public/assets/volun1.png"
            alt="Volunteer"
            className="w-24 h-24 object-contain mb-4"
            whileHover={{ scale: 1.2 }}
          />
          <p className="text-lg font-semibold">Volunteer</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
