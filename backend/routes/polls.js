// backend/routes/polls.js
const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");
const auth = require("../middleware/auth");

// 🟢 Get all polls
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Server error while fetching polls" });
  }
});

// 🟢 Get a single poll by ID
router.get("/:id", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.json(poll);
  } catch (error) {
    console.error("Error fetching poll:", error);
    res.status(500).json({ message: "Server error while fetching poll" });
  }
});

// 🟢 Create a new poll (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res
        .status(400)
        .json({ message: "Provide a question and at least two options" });
    }

    const poll = new Poll({
      question,
      options: options.map((opt) => ({ text: opt, votes: 0 })),
      createdBy: req.user.id,
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Server error while creating poll" });
  }
});

// 🟢 Vote for a poll option (protected)
router.post("/:id/vote", auth, async (req, res) => {
  try {
    const { optionIndex } = req.body;

    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const userId = req.user.id;

    // Prevent duplicate votes
    if (poll.voters.includes(userId)) {
      return res.status(400).json({ message: "You have already voted" });
    }

    // Validate option index
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: "Invalid option selected" });
    }

    poll.options[optionIndex].votes += 1;
    poll.voters.push(userId);
    await poll.save();

    res.json(poll);
  } catch (error) {
    console.error("Error voting:", error);
    res.status(500).json({ message: "Server error while voting" });
  }
});

module.exports = router;
