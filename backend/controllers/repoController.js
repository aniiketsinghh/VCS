const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

// ------------------------- CREATE REPOSITORY -------------------------

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Repository name is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User ID!" });
    }

    const userExists = await User.findById(owner);
    if (!userExists) {
      return res.status(404).json({ error: "Owner user not found!" });
    }

    const newRepository = new Repository({
      name,
      description: description || "",
      visibility: visibility ?? true,
      owner,
      content: content || [],
      issues: issues || [],
    });

    const result = await newRepository.save();

    res.status(201).json({
      message: "Repository created!",
      repositoryID: result._id,
    });
  } catch (err) {
    console.error("Error during repository creation:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// ------------------------- GET ALL REPOSITORIES -------------------------

async function getAllRepositories(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner", "-password") // hide password
      .populate("issues");

    res.json(repositories);
  } catch (err) {
    console.error("Error during fetching repositories:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// ------------------------- FETCH BY ID -------------------------

async function fetchRepositoryById(req, res) {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Repository ID!" });
    }

    const repository = await Repository.findById(id)
      .populate("owner", "-password")
      .populate("issues");

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repository:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// ------------------------- FETCH BY NAME -------------------------

async function fetchRepositoryByName(req, res) {
  const { name } = req.params;

  try {
    const repository = await Repository.find({ name })
      .populate("owner", "-password")
      .populate("issues");

    if (!repository || repository.length === 0) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repository:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// ------------------------- FETCH USER REPOSITORIES -------------------------

async function fetchRepositoriesForCurrentUser(req, res) {
  const { userID } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid User ID!" });
    }

    const repositories = await Repository.find({ owner: userID });

    if (!repositories || repositories.length === 0) {
      return res.status(404).json({ error: "User Repositories not found!" });
    }

    res.json({
      message: "Repositories found!",
      repositories,
    });
  } catch (err) {
    console.error("Error during fetching user repositories:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// ------------------------- UPDATE REPOSITORY -------------------------

async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    if (content) repository.content.push(content);
    if (description) repository.description = description;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository updated successfully!",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error during updating repository:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// ------------------------- TOGGLE VISIBILITY -------------------------

async function toggleVisibilityById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository visibility toggled successfully!",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error during toggling visibility:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// ------------------------- DELETE REPOSITORY -------------------------

async function deleteRepositoryById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findByIdAndDelete(id);

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    res.json({ message: "Repository deleted successfully!" });
  } catch (err) {
    console.error("Error during deleting repository:", err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
