import React, { useState } from 'react';

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [cuisine, setCuisine] = useState('Any');

  const createRecipe = async () => {
    try {
      // Construct the prompt from input fields
      const prompt = `Ingredients: ${ingredients}, Cuisine: ${cuisine}, Restrictions: ${dietaryRestrictions}`;

      const response = await fetch(`http://localhost:8080/recipe-creator?prompt=${encodeURIComponent(prompt)}`, {
        method: 'GET',
        credentials: 'include' // Allows cookies for session if needed
      });

      const data = await response.text();
      console.log('Recipe:', data);
      setRecipe(data);
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  return (
    <div className="font-medium text-xl p-4 max-w-2xl mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Recipe Generator</h2>

      <div className="flex flex-col gap-4 mb-4">
        <input
          className="border p-2 rounded-lg"
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma-separated)"
        />

        <input
          className="border p-2 rounded-lg"
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Enter cuisine type (e.g., Indian, Italian)"
        />

        <input
          className="border p-2 rounded-lg"
          type="text"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
          placeholder="Enter dietary restrictions (optional)"
        />
      </div>

      <button
        className="bg-blue-800 hover:bg-blue-950 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-700"
        onClick={createRecipe}
      >
        Generate Recipe
      </button>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Generated Recipe:</h3>
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{recipe}</pre>
      </div>
    </div>
  );
}

export default RecipeGenerator;
