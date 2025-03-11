import { motion } from "framer-motion";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";

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

const books = [
  {
    id: 1,
    title: "El Deafo",
    image:
      "https://images-us.bookshop.org/ingram/9781419712173.jpg?height=500&v=v2-12989c393d0d9050fbca145799a44d08",
    description:
      "Cece Bell depicts what it feels like to grow up deaf in the mainstream education system as she grapples with the emotional consequences of being different from one’s peers. The book offers insights into the common assumptions that people make about deafness and provides young deaf readers a rare chance to see themselves represented in fiction.",
    buyLink: "#",
    downloadLink: "#",
  },
  {
    id: 2,
    title: "True Biz",
    image: "https://images-us.bookshop.org/ingram/9780593241523.jpg?height=500&v=v2-b3ba5343331ec4c0cd7fc889be8ae076",
    description:
      "On the rare occasions that a deaf character features in fiction, they are often isolated figures, stranded in hearing society. In True Biz, Novic gives us the diversity of Deaf experience through a variety of characters who come together at a school for deaf students which is being threatened with closure. Novic paints an engaging, tender and passionate picture of contemporary Deaf culture, illuminating a range of issues that affect deaf people today, while paying homage to the school’s central role in Deaf history.",
    buyLink: "#",
    downloadLink: "#",
  },
  {
    id: 3,
    title: "Book 3",
    image: "https://via.placeholder.com/150",
    description:
      "Book 3 is an engaging story that captures the reader’s attention through well-crafted narratives and compelling characters.",
    buyLink: "#",
    downloadLink: "#",
  },
  {
    id: 4,
    title: "Book 3",
    image: "https://via.placeholder.com/150",
    description:
      "Book 3 is an engaging story that captures the reader’s attention through well-crafted narratives and compelling characters.",
    buyLink: "#",
    downloadLink: "#",
  },
  {
    id: 5,
    title: "Book 3",
    image: "https://via.placeholder.com/150",
    description:
      "Book 3 is an engaging story that captures the reader’s attention through well-crafted narratives and compelling characters.",
    buyLink: "#",
    downloadLink: "#",
  },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
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
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-40 h-60 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{book.description}</p>
                <div className="flex gap-4">
                  <a
                    href={book.buyLink}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition"
                  >
                    Buy
                  </a>
                  <a
                    href={book.downloadLink}
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
