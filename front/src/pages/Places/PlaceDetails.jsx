// PlaceDetails.js
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlaces } from "../../../api"; // Adjust path to your API file

export default function PlaceDetails() {
  const { placeName } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const placesData = await getPlaces();
        const foundPlace = placesData.find(
          (p) => p.name.toLowerCase() === decodeURIComponent(placeName).toLowerCase()
        );
        if (foundPlace) {
          setPlace({
            name: foundPlace.name,
            image: foundPlace.image,
            location: foundPlace.location,
            tickets: foundPlace.price,
            times: foundPlace.time,
          });
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch place details: " + err.message);
        setLoading(false);
      }
    };
    fetchPlaceDetails();
  }, [placeName]);

  if (loading) return <div>Loading place details...</div>;
  if (error) return <div>{error}</div>;
  if (!place) return <p className="text-center text-gray-500">Place not found.</p>;

  // Create a more specific Google Maps URL by combining place name and location
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name}, ${place.location}`
  )}`;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/places-to-go")}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Places
      </button>
      <div className="relative">
        <img src={place.image} alt={place.name} className="w-full h-64 object-cover rounded-lg" />
        <h1 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg text-xl font-bold shadow-lg">
          {place.name}
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold flex items-center justify-center gap-2">
            <img src="/assets/Ticket.jpg" alt="Tickets Icon" className="w-6 h-6" />
            Tickets
          </h2>
          <p className="bg-gray-200 px-4 py-2 rounded mt-2">{place.tickets}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold flex items-center justify-center gap-2">
            <img src="/assets/Opening.jpeg" alt="Opening Times Icon" className="w-6 h-6" />
            Opening Times
          </h2>
          <p className="mt-2">{place.times}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold flex items-center justify-center gap-2">
            <img src="/assets/Location.jpeg" alt="Location Icon" className="w-6 h-6" />
            Location
          </h2>
          <a
            href={place.location}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-500 hover:underline block"
          >
           {place.location}
          </a>
    
        </div>
      </div>
    </div>
  );
}