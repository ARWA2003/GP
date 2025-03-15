import Bank from "../models/bank.js";

// Get all bank
export const getBank = async (req, res) => {
    try {
      const bank = await Bank.find();
      res.status(200).json(bank);
    } catch (error) {
      console.error('Error fetching bank:', error);
      res.status(500).json({ message: 'Error fetching bank', error: error.message });
    }
  };