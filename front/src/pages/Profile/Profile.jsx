import { useState, useEffect } from "react";
import { getDeafUserProfile } from "../../../api";
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
  const [deafUser, setDeafUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem("userEmail"); // Get email from storage

  useEffect(() => {
    if (!email) {
      setError("No user email found.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await getDeafUserProfile(email);
        setDeafUser(response.data);
      } catch (err) {
        setError("Failed to load profile.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
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
        <h2 className="text-blue-800 mb-5 text-5xl font-semibold">profile</h2>

      {deafUser && (
        <div className="">
          <p className="text-xl"><strong className="text-2xl text-yellow-600">- Name:</strong> {deafUser.firstName} {deafUser.lastName}</p>
          <p className="text-xl"><strong className="text-2xl text-yellow-600">- Email:</strong> {deafUser.email}</p>
          <p className="text-xl"><strong className="text-2xl text-yellow-600">- Phone Number:</strong> {deafUser.phoneNumber}</p>
          <p className="text-xl"><strong className="text-2xl text-yellow-600">- Gender:</strong> {deafUser.gender}</p>
          <p className="text-xl"><strong className="text-2xl text-yellow-600">- Blood Type:</strong> {deafUser.bloodType}</p>
          <p className="text-xl"><strong className="text-2xl text-yellow-600">- Medical Condition:</strong> {deafUser.medicalCondition || "None"}</p>
          <p className="text-xl"><strong className="text-2xl text-yellow-600">- Medications:</strong> {deafUser.medications || "None"}</p>

          <strong className="text-2xl text-yellow-600">- Emergency Contacts</strong>
          {deafUser.emergencyContacts.length > 0 ? (
            <ul >
              {deafUser.emergencyContacts.map((contact, index) => (
                <li key={index} >
                 <p className="text-xl ml-8"><strong className="text-2xl text-yellow-400">{index+1}] Name:</strong> {contact.name}</p>
                 <p className="text-xl ml-16"><strong className="text-2xl text-yellow-400">   Phone:</strong> {contact.phoneNumber}</p>
                 <p className="text-xl ml-16"><strong className="text-2xl text-yellow-400">   Relationship:</strong> {contact.relationship}</p>
                </li>
              ))}
            </ul>
          ) : (
            <strong className="text-2xl text-yellow-400">No emergency contacts added.</strong>
          )}
        </div>
      )}
      <Link to="/" className="mt-3 inline-block bg-[#1034d7] text-white px-10 py-7 rounded-lg font-semibold text-xl hover:bg-blue-700">
        Sign Out
      </Link>
            </div>
            </div>
        </div>
      <Foooter/>
    </div>
  );
};

export default Profile;
