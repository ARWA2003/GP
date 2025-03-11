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

  // Improved search function for Arabic support
  const normalizeText = (text) => {
    return text
      .normalize("NFKD") // Decompose combined characters
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[إأآ]/g, "ا") // Normalize different forms of Alif
      .replace(/ة/g, "ه") // Normalize Ta Marbuta to Ha
      .replace(/ي/g, "ى") // Normalize Ya to Alef Maksura
      .trim();
  };

  const filteredPlaces = places.filter((place) => {
    const normalizedPlaceName = normalizeText(place.name);
    const normalizedSearch = normalizeText(search);
    return normalizedPlaceName.includes(normalizedSearch);
  });

  if (loading) return <div>Loading places...</div>;
  if (error) return <div>{error}</div>;

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
          <h2 className="text-3xl font-bold">استكشف الأماكن المناسبة للصم</h2>
          <p className="text-lg mt-2 opacity-80">ابحث عن مواقع يسهل الوصول إليها بالقرب منك</p>

          <div className="mt-6 flex justify-center">
            <div className="bg-white p-2 rounded-lg flex items-center w-full max-w-lg">
              <input
                type="text"
                placeholder="ابحث عن المكان الذي يناسبك"
                className="flex-1 px-4 py-2 text-black outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => {
                  const matchedPlace = filteredPlaces[0];
                  if (matchedPlace) {
                    navigate(`/PlaceDetails/${encodeURIComponent(matchedPlace.name)}`);
                  }
                }}
              >
                <FiSearch /> بحث
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold">الأماكن الأكثر تميزًا</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <div
                key={place._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => navigate(`/PlaceDetails/${encodeURIComponent(place.name)}`)}
              >
                <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
                <div className="p-2">
                  <h3 className="text-sm font-bold">{place.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">لم يتم العثور على أماكن</p>
          )}
        </div>
      </section>

      <Foooter />
    </div>
  );
}