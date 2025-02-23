import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";




const categories = [
    {title: "Kids Story",image: "/assets/kidsstory.png",link: "/kids-story",},
    {title: "Daily Vlogs",image: "/assets/vlogsimg.svg",link: "/daily-vlogs",},
    {title: "Short Movies",image: "/assets/shortmovie.png",link: "/short-movies",},
  ];
const EntV = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredCategories = categories.filter((category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <Upperbar/>    
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Entertainment Videos</h2>


        <input
          type="text"
          placeholder="Search by category"
          className="w-[80%] max-w-md p-2 border border-gray-400 rounded-md text-center mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


        <div className="flex flex-col gap-6 w-[80%] max-w-lg">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="bg-gray-300 p-4 rounded-lg shadow-lg flex flex-col items-center transition-transform hover:scale-105"
              >
                <img src={category.image} alt={category.title} className="w-50 h-50 object-cover rounded-md mb-3" />
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </a>
            ))
          ) : (
            <p className="text-gray-600">No matching categories found.</p>
          )}
        </div>
      </div>

    
        <Foooter/>
     </>
       );
};

export default EntV;