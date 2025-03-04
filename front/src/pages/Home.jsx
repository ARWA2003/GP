
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const floatingAnimation = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

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

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
    >
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

      <motion.img
        src="../../public/assets/logo123.png"
        alt="Logo"
        className="w-72 h-72 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl font-bold text-blue-700 mb-8"
      >
        Choose your Role
      </motion.h1>

      <div className="flex gap-16">
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
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

        <motion.div
          variants={floatingAnimation}
          animate="animate"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
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
