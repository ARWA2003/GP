import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

export default function Places() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Cafes");

  const places = [
    { name: "Al Azhar Park", image: "/assets/places/places2.jpeg", category: "Parks" },
    { name: "Library of Alexandria", image: "/assets/places/places5.jpeg", category: "Education" },
    { name: "Guiza Pyramids", image: "/assets/places/places3.jpeg", category: "Historical" },
    { name: "Wadi Degla Protectorate", image: "/assets/places/places4.jpeg", category: "Sports" },
    { name: "Al Muizz Street", image: "/assets/places/places1.jpeg", category: "Historical" },
  ];

  // Filtered places based on search input
  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Upperbar />

      <header
        className="relative p-6"
        style={{
          backgroundImage: "url('/assets/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center mt-10">
          <h2 className="text-3xl font-bold">Explore deaf friendly places.</h2>
          <p className="text-lg mt-2 opacity-80">Lorem ipsum dolor sit amet, consectetur adipis.</p>

          <div className="mt-6 flex justify-center">
            <div className="bg-white p-2 rounded-lg flex items-center w-full max-w-lg">
              <input
                type="text"
                placeholder="Find the place that best suits you."
                className="flex-1 px-4 py-2 text-black outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FiSearch /> Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <img src="/assets/places-pic.png" alt="Map" className="h-40" />
        </div>
      </header>

      <section className="container mx-auto p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Most featured places</h2>
          <a href="#" className="text-blue-500">View all places →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
                <div className="p-2">
                  <h3 className="text-sm font-bold">{place.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No places found.</p>
          )}
        </div>
      </section>
      <Foooter/>
    </div>
  );
}
