import React from 'react'
import { useState } from 'react';

 function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const[cuisine, setCuisine] = useState('Any');

  const createRecipe = async () => {
   try{
            const response = await fetch ('http://localhost:8080/recipe-creator?prompt=${prompt}')
            const data = await response.text();
            console.log( data);
            setRecipe(data);
            }
            catch (error) {
                console.error('Error generating recipe:', error);

    }
  };

  return (
    <div className='font-medium text-xl p-4'>
    <h2 className='mb-4 '>Recipe Generating</h2>
    <div className='flex flex-col gap-4'>
    <input className='border p-2 rounded-lg mb-4'
    type='text'
    value={ingredients}
    onChange={(e) => setIngredients(e.target.value)} 
    placeholder='Enter ingredients here'/>

     <input className='border p-2 rounded-lg mb-4'
    type='text'
    value={cuisine}
    onChange={(e) => setCuisine(e.target.value)} 
    placeholder='Enter cuisine type'/>

     <input className='border p-2 rounded-lg mb-4'
    type='text'
    value={dietaryRestrictions}
    onChange={(e) => setDietaryRestrictions(e.target.value)} 
    placeholder='Enter dietary Restrictions'/>
    </div>

    <button className=' bg-blue-800 hover:bg-blue-950 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 text-gray-50 p-1 rounded-lg' onClick={createRecipe}>create Recipe </button>

    <div>
      <pre className='recipe-text'>{recipe}</pre>
    </div>

    </div>

  );
}

export default RecipeGenerator;