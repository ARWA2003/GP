// src/JobDetails.js

import { FaHome, FaUser, FaEnvelope } from 'react-icons/fa';

function JobDetails() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <img src="/assets/logo123.png" alt="Logo" className="h-10" />
        <nav>
          <ul className="flex space-x-4">
            <li className="flex items-center">
              <FaHome className="mr-1" /> Home
            </li>
            <li className="flex items-center">
              <FaUser className="mr-1" /> About
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-1" /> Contact
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-4">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="mb-4">This is a sample paragraph. Replace this with your content.</p>
          <img src="https://via.placeholder.com/600x400" alt="Sample" className="w-full h-auto" />
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
}

export default JobDetails;
