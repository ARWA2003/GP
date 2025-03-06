import { useParams, useNavigate } from "react-router-dom";

export default function PlaceDetails() {
  const { placeName } = useParams();
  const navigate = useNavigate();

  const placeData = {
    "Al Azhar Park": {
      image: "/assets/places/places2.jpeg",
      location: "Salah Salem Street, Cairo",
      tickets: { children: "30 EGP", adults: "50 EGP" },
      times: { weekday: "9 AM - 5 PM", weekend: "Closed" },
    },
    "Library of Alexandria": {
      image: "/assets/places/places5.jpeg",
      location: "Corniche St, Alexandria",
      tickets: { children: "Free", adults: "20 EGP" },
      times: { weekday: "10 AM - 6 PM", weekend: "Closed" },
    },
    "Guiza Pyramids": {
      image: "/assets/places/places3.jpeg",
      location: "Giza Plateau, Giza",
      tickets: { children: "60 EGP", adults: "200 EGP" },
      times: { weekday: "8 AM - 5 PM", weekend: "8 AM - 5 PM" },
    },
    "Wadi Degla Protectorate": {
      image: "/assets/places/places4.jpeg",
      location: "Maadi, Cairo",
      tickets: { children: "10 EGP", adults: "30 EGP" },
      times: { weekday: "7 AM - 6 PM", weekend: "7 AM - 6 PM" },
    },
    "Al Muizz Street": {
      image: "/assets/places/places1.jpeg",
      location: "Islamic Cairo, Cairo",
      tickets: { children: "20 EGP", adults: "50 EGP" },
      times: { weekday: "9 AM - 5 PM", weekend: "9 AM - 5 PM" },
    },
  };

  const place = placeData[decodeURIComponent(placeName)];

  if (!place) {
    return <p className="text-center text-gray-500">Place not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/places-to-go")}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Places
      </button>
      <div className="relative">
        <img src={place.image} alt={placeName} className="w-full h-64 object-cover rounded-lg" />
        <h1 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg text-xl font-bold shadow-lg">
          {placeName}
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <img
                src="/assets/Ticket.jpg"
                alt="Tickets Icon"
                className="w-6 h-6"
              />
              Tickets
            </h2>
          <p className="bg-gray-200 px-4 py-2 rounded mt-2">Children: {place.tickets.children}</p>
          <p className="bg-gray-300 px-4 py-2 rounded mt-2">Adults: {place.tickets.adults}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <img
                src="/assets/Opening.jpeg"
                alt="Opening Times Icon"
                className="w-6 h-6"
              />
              Opening Times
            </h2>
          <p className="mt-2">Weekdays: {place.times.weekday}</p>
          <p className="font-bold text-red-500">Weekends: {place.times.weekend}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <img
                src="/assets/Location.jpeg"
                alt="Location Icon"
                className="w-6 h-6"
              />
              Location
            </h2>
          <p className="mt-2">{place.location}</p>
        </div>
      </div>
    </div>
  );
}