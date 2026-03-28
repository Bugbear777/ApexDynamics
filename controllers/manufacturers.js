const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("manufacturers").find();
    const list = await result.toArray();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve manufacturers.", error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const manufacturerId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection("manufacturers").findOne({ _id: manufacturerId });

    if (!result) {
      return res.status(404).json({ message: "Manufacturer not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve manufacturer.", error: err.message });
  }
};

const createManufacturer = async (req, res) => {
  try {
    const manufacturer = {
      name: req.body.name,
      country: req.body.country,
      foundedYear: req.body.foundedYear,
      specialty: req.body.specialty,
      ceo: req.body.ceo,
      employeeCount: req.body.employeeCount,
      isActive: req.body.isActive
    };

    const response = await mongodb.getDb().collection("manufacturers").insertOne(manufacturer);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to create manufacturer." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to create manufacturer.", error: err.message });
  }
};

const updateManufacturer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const manufacturerId = new ObjectId(req.params.id);
    const manufacturer = {
      name: req.body.name,
      country: req.body.country,
      foundedYear: req.body.foundedYear,
      specialty: req.body.specialty,
      ceo: req.body.ceo,
      employeeCount: req.body.employeeCount,
      isActive: req.body.isActive
    };

    const response = await mongodb.getDb().collection("manufacturers").replaceOne(
      { _id: manufacturerId },
      manufacturer
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Manufacturer not found or no changes made." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update manufacturer.", error: err.message });
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const manufacturerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection("manufacturers").deleteOne({ _id: manufacturerId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Manufacturer deleted successfully." });
    } else {
      res.status(404).json({ message: "Manufacturer not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete manufacturer.", error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer
};