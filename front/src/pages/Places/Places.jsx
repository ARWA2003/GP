import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { getPlaces } from "../../../api"; // Adjust path to your API file

export default function Places() {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const placesData = await getPlaces();
        setPlaces(placesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch places: " + err.message);
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center text-yellow-600">Loading places...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gradient-to-br from-yellow-300 to-blue-400 min-h-screen">
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
          <h2 className="text-3xl font-bold text-yellow-600">Explore Deaf-Friendly Places</h2>
          <p className="text-lg mt-2 text-gray-800 opacity-80">Find accessible locations around you.</p>

          <div className="mt-6 flex justify-center">
            <div className="bg-white p-2 rounded-lg flex items-center w-full max-w-lg shadow-md">
              <input
                type="text"
                placeholder="Find the place that best suits you."
                className="flex-1 px-4 py-2 text-gray-800 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
                onClick={() => {
                  const matchedPlace = filteredPlaces[0];
                  if (matchedPlace) {
                    navigate(`/PlaceDetails/${encodeURIComponent(matchedPlace.name)}`);
                  }
                }}
              >
                <FiSearch /> Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-blue-700">Most Featured Places</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <div
                key={place._id} // Using _id from MongoDB
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 hover:border-yellow-400 border-2 border-transparent"
                onClick={() => navigate(`/PlaceDetails/${encodeURIComponent(place.name)}`)}
              >
                <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
                <div className="p-2">
                  <h3 className="text-sm font-bold text-gray-800">{place.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-700">No places found.</p>
          )}
        </div>
      </section>

      <Foooter />
    </div>
  );
}