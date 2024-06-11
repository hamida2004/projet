// exitNoteController.js
const db = require("../models");

// Create a new ExitNote
exports.createExitNote = async (req, res) => {
  try {
    const exitNote = await db.ExitNote.create(req.body);
    res.status(201).json(exitNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all ExitNotes
exports.getAllExitNotes = async (req, res) => {
  try {
    const exitNotes = await db.ExitNote.findAll();
    res.status(200).json(exitNotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single ExitNote by ID
exports.getExitNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const exitNote = await db.ExitNote.findByPk(id);
    if (!exitNote) {
      res.status(404).json({ error: "ExitNote not found" });
    } else {
      res.status(200).json(exitNote);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an ExitNote by ID
exports.updateExitNote = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.ExitNote.update(req.body, {
      where: { exit_note_id: id },
    });
    if (updated) {
      const updatedExitNote = await db.ExitNote.findByPk(id);
      res.status(200).json(updatedExitNote);
    } else {
      res.status(404).json({ error: "ExitNote not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an ExitNote by ID
exports.deleteExitNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.ExitNote.destroy({
      where: { exit_note_id: id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "ExitNote not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
