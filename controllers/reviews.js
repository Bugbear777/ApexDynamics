const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("reviews").find();
    const reviews = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve reviews.", error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection("reviews").findOne({ _id: reviewId });

    if (!result) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve review.", error: err.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await mongodb.getDb().collection("reviews").find({ userId });
    const reviews = await result.toArray();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve reviews.", error: err.message });
  }
};

const getByVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const result = await mongodb.getDb().collection("reviews").find({ vehicleId });
    const reviews = await result.toArray();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve reviews.", error: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const review = {
      userId: req.body.userId,
      vehicleId: req.body.vehicleId,
      rating: req.body.rating,
      title: req.body.title,
      comment: req.body.comment,
      createdAt: new Date()
    };

    const response = await mongodb.getDb().collection("reviews").insertOne(review);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to add review." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to add review.", error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = new ObjectId(req.params.id);
    const review = {
      userId: req.body.userId,
      vehicleId: req.body.vehicleId,
      rating: req.body.rating,
      title: req.body.title,
      comment: req.body.comment,
      updatedAt: new Date()
    };

    const response = await mongodb.getDb().collection("reviews").replaceOne(
      { _id: reviewId },
      review
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to update review.", error: err.message });
  }
};

const removeReview = async (req, res) => {
  try {
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection("reviews").deleteOne({ _id: reviewId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Review deleted successfully." });
    } else {
      res.status(404).json({ message: "Review not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to remove review.", error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  getByUser,
  getByVehicle,
  addReview,
  updateReview,
  removeReview
};