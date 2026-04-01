const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("favorites").find();
    const favorites = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve favorites.", error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const favoriteId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection("favorites").findOne({ _id: favoriteId });

    if (!result) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve favorite.", error: err.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await mongodb.getDb().collection("favorites").find({ userId });
    const favorites = await result.toArray();
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve favorites.", error: err.message });
  }
};

const getByVehicle = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await mongodb.getDb().collection("favorites").find({ vehicleId });
    const favorites = await result.toArray();
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve favorites.", error: err.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const favorite = {
      userId: req.body.userId,
      vehicleId: req.body.vehicleId,
      createdAt: new Date()
    };

    const response = await mongodb.getDb().collection("favorites").insertOne(favorite);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to add favorite." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to add favorite.", error: err.message });
  }
};

const updateFavorite = async (req, res) => {
  try {
    const favoriteId = new ObjectId(req.params.id);
    const favorite = {
      userId: req.body.userId,
      vehicleId: req.body.vehicleId,
      updatedAt: new Date()
    };

    const response = await mongodb.getDb().collection("favorites").replaceOne(
      { _id: favoriteId },
      favorite
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to update favorite.", error: err.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const favoriteId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection("favorites").deleteOne({ _id: favoriteId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Favorite deleted successfully." });
    } else {
      res.status(404).json({ message: "Favorite not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to remove favorite.", error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  getByUser,
  getByVehicle,
  addFavorite,
  updateFavorite,
  removeFavorite
};