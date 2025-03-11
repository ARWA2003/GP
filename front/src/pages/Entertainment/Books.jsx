import { motion } from "framer-motion";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState, useEffect } from "react";
import { getBooks } from "../../../api"; // Adjust the import path based on your file structure

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
        const bookData = await getBooks(); // Call the API function
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
      <div className="relative min-h-screen bg-gray-100 p-6 flex flex-col items-center overflow-hidden">
        {/* Animated Circles */}
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

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search book name..."
          className="w-[80%] max-w-md p-2 border border-gray-400 rounded-md text-center mb-6 z-[1]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] max-w-6xl z-[1]">
          {loading ? (
            <p className="text-gray-600">Loading books...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <motion.div
                key={book._id} // Use _id from MongoDB instead of id
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-40 h-60 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{book.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{book.description}</p>
                <div className="flex gap-4">
                  <a
                    href={book.buylink}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition"
                  >
                    Buy
                  </a>
                  <a
                    href={book.downloadlink}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Download
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600">No matching books found.</p>
          )}
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default Books;