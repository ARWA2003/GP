import { useState } from "react";
import { Link } from "react-router-dom";

const UpperbarV = () => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    return (
        <header className="sticky top-0 bg-white shadow-md z-50 p-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <img src="/assets/4.png" alt="Logo" className="h-28 w-28" />
                </div>
        
                <nav className="flex space-x-6 text-lg font-semibold">
                  <Link to="/" className="hover:text-yellow-500">Home</Link>
                  
                  <div 
                    className="relative" 
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button className="hover:text-yellow-500">Resources</button>
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 bg-white shadow-lg rounded-md p-2 w-40">
                        <Link to="/ASLlevels" className="block px-4 py-2 hover:bg-gray-100">ASL learning</Link>
                        <Link to="/EmerRes" className="block px-4 py-2 hover:bg-gray-100">Emergency responed</Link>
                        <Link to="/all-resources" className="block px-4 py-2 hover:bg-gray-100">Daily needs</Link>
                      </div>
                    )}
                  </div>
                  
                  <Link to="/about" className="hover:text-yellow-500">About Us</Link>
                  <Link to="/contact" className="hover:text-yellow-500">Contact Us</Link>
                </nav>
        
                <img src="/assets/profile.png" alt="Profile" className="h-14 w-auto rounded-full cursor-pointer" />
              </header>
    );
}

export default UpperbarV;