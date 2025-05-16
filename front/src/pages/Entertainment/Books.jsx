import { motion } from "framer-motion";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState, useEffect } from "react";
import { getBooks } from "../../../api";

// Define the circle animation
const circleAnimation = {
  animate: {
    y: [0, -20, 0], // Moves up and down
    scale: [1, 1.1, 1], // Subtle scaling
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books from the backend when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const bookData = await getBooks();
        setBooks(bookData);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Upperbar />
      <div className="relative min-h-screen bg-gradient-to-br from-yellow-300 to-blue-400 p-6 flex flex-col items-center overflow-hidden">
        {/* Animated Circles */}
        <motion.div
          variants={circleAnimation}
          animate="animate"
          className="absolute w-[400px] h-[400px] bg-yellow-400 rounded-full top-[-150px] left-[-150px] blur-md opacity-50 shadow-lg"
        />
        <motion.div
          variants={circleAnimation}
          animate="animate"
          className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px] blur-md opacity-50 shadow-lg"
        />

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-600 mt-16 md:mt-20 mb-8 z-10">
          Explore Books
        </h1>

        {/* Search Input */}
        <div className="relative max-w-lg w-full mb-8 z-10">
          <input
            type="text"
            placeholder="Search book name..."
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm text-center"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl z-10">
          {loading ? (
            <p className="text-yellow-600 col-span-full text-center">Loading books...</p>
          ) : error ? (
            <p className="text-red-600 col-span-full text-center">{error}</p>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <motion.div
                key={book._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-300 border border-yellow-200 hover:border-yellow-400 hover:shadow-xl"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-40 h-60 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{book.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{book.description}</p>
                <div className="flex gap-4">
                  <a
                    href={book.buylink}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-all duration-300"
                  >
                    Buy
                  </a>
                  <a
                    href={book.downloadlink}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300"
                  >
                    Download
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-700 col-span-full text-center text-lg">No matching books found.</p>
          )}
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default Books;