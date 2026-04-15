import express from "express";
import Poll from "../models/Poll.js";

const router = express.Router();

// ✅ Create a poll
router.post("/", async (req, res) => {
  try {
    const { question, options, createdBy } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: "Please provide at least 2 options" });
    }

    const poll = new Poll({
      question,
      options: options.map((opt) => ({ text: opt, votes: 0 })),
      createdBy: createdBy || "admin",
    });

    const savedPoll = await poll.save();
    res.status(201).json(savedPoll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all polls
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get a poll by ID
router.get("/:id", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    res.status(200).json(poll);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Vote for an option
router.post("/:id/vote", async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll || optionIndex === undefined) {
      return res.status(400).json({ message: "Invalid vote" });
    }

    poll.options[optionIndex].votes += 1;
    const updatedPoll = await poll.save();

    res.status(200).json(updatedPoll);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
