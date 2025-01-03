const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

// Get All Recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Recipes by Category
router.get("/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const recipes = await Recipe.find({ category });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Recipe
router.post("/", async (req, res) => {
  const { title, description, image, category, ingredients, instructions } =
    req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      image,
      category,
      ingredients,
      instructions,
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
