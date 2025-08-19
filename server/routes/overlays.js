const express = require('express');
const Overlay = require('../models/Overlay');
const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const overlay = new Overlay(req.body);
    await overlay.save();
    res.status(201).json(overlay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const overlays = await Overlay.find();
  res.json(overlays);
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const overlay = await Overlay.findById(req.params.id);
    if (!overlay) return res.status(404).json({ error: 'Not found' });
    res.json(overlay);
  } catch {
    res.status(400).json({ error: 'Invalid id' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const overlay = await Overlay.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!overlay) return res.status(404).json({ error: 'Not found' });
    res.json(overlay);
  } catch {
    res.status(400).json({ error: 'Invalid id' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const result = await Overlay.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: 'Invalid id' });
  }
});

module.exports = router;
