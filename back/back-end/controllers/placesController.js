import Places from "../models/places.js";

// Get all places
export const getPlaces = async (req, res) => {
  try {
    const places = await Places.find();
    res.status(200).json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ message: 'Error fetching places', error: error.message });
  }
};