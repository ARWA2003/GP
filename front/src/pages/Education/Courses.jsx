
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const courses = [{ title: "BI Course", description: "course for Bi topic , it provide with subtitle and sign language",link: "https://example.com/bi-course" },
    { title: "Data Science Course", description: "course for Data Science topic , it provide with subtitle and sign language", link: "https://example.com/data-science-course" },
    { title: "Machine Learning Course", description: "course for Machine Learning topic , it provide with subtitle and sign language", link: "https://example.com/machine-learning-course" },
    { title: "Deep Learning Course", description: "course for Deep Learning topic , it provide with subtitle and sign language", link: "https://example.com/deep-learning-course" },
    { title: "Natural Language Processing Course", description: "course for Natural Language Processing topic , it provide with subtitle and sign language", link: "https://example.com/natural-language-processing-course" },
  ];
  const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return ( <>
    <Upperbar/>
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <input type="text"placeholder="Search for course"className="w-1/2 p-2 border rounded mb-4"value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      {filteredCourses.map((course, index) => (
        <div key={index} className="bg-gray-300 p-4 rounded-lg shadow-md w-1/2 mb-4">
          <h2 className="font-bold">{course.title}</h2>
          <p>{course.description}</p>
          <a href={course.link} target="_blank" rel="noopener noreferrer"className="bg-yellow-100 p-2 rounded mt-2 block text-center hover:bg-yellow-200 transition">Visit</a>
          
        </div>
      ))}
    </div>
<Foooter/>
 </>
     );
}

export default Courses;