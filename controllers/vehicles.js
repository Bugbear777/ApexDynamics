const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("vehicles").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve vehicles.", error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection("vehicles").findOne({ _id: vehicleId });

    if (!result) {
      return res.status(404).json({ message: "Vehicle not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve vehicle.", error: err.message });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      blockCount: req.body.blockCount,
      topSpeed: req.body.topSpeed,
      crewSize: req.body.crewSize,
      mainWeapon: req.body.mainWeapon,
      weight: req.body.weight
    };

    const response = await mongodb.getDb().collection("vehicles").insertOne(vehicle);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to create vehicle." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to create vehicle.", error: err.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);
    const vehicle = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      blockCount: req.body.blockCount,
      topSpeed: req.body.topSpeed,
      crewSize: req.body.crewSize,
      mainWeapon: req.body.mainWeapon,
      weight: req.body.weight
    };

    const response = await mongodb.getDb().collection("vehicles").replaceOne({ _id: vehicleId }, vehicle);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Vehicle not found or no changes made." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update vehicle.", error: err.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection("vehicles").deleteOne({ _id: vehicleId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Vehicle deleted successfully." });
    } else {
      res.status(404).json({ message: "Vehicle not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete vehicle.", error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createVehicle,
  updateVehicle,
  deleteVehicle
};