import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Upperbar = () => {
  const navigate = useNavigate();
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    return(
        <>
      <header className="sticky top-0 bg-white shadow-md z-50 p-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/assets/4.png" alt="Logo" className="h-28 w-28" />
      </div>

      <nav className="flex space-x-6 text-lg font-semibold">
        <Link to="/Deafhomepage" className="hover:text-yellow-500">Home</Link>
        
        <div 
          className="relative" 
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <button className="hover:text-yellow-500">Services</button>
          {isServicesOpen && (
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-md p-2 w-40">
              <Link to="/entertainment" className="block px-4 py-2 hover:bg-gray-100">Emergency report</Link>
              <Link to="/text-to-speech" className="block px-4 py-2 hover:bg-gray-100">Text to Speech trasnlator</Link>
              <Link to="/jobs" className="block px-4 py-2 hover:bg-gray-100">Job Opportunities</Link>
              <Link to="/Courses" className="block px-4 py-2 hover:bg-gray-100">Education</Link>
              <Link to="/Entertainment-home" className="block px-4 py-2 hover:bg-gray-100">Entertainment</Link>
              <Link to="/places-to-go" className="block px-4 py-2 hover:bg-gray-100">deaf-friendly places</Link>
              <Link to="/dailylife" className="block px-4 py-2 hover:bg-gray-100">volunteer assistance</Link>
            </div>
          )}
        </div>
        
        <Link to="/AboutUs" className="hover:text-yellow-500">About Us</Link>
        <Link to="/contact" className="hover:text-yellow-500">Contact Us</Link>
      </nav>

      <img
        src="/assets/profile.png"
        alt="Profile"
        className="h-14 w-auto rounded-full cursor-pointer"
        onClick={() => navigate("/profile")}
      />
     </header>

        </>

    );
}

export default Upperbar;