import React, { useEffect, useState } from 'react';

const RecipeTags = ({ onTagClick }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes/tags')
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      })
      .catch((error) => {
        console.error('Error fetching recipe tags:', error);
      });
  }, []);

  return (
    <div>
      <h2>Select a Recipe Tag:</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag} onClick={() => onTagClick(tag)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecipeList = ({ tag, onBackClick }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/tag/${tag}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, [tag]);

  return (
    <div>
      <button onClick={onBackClick}>Back to Tags</button>
      <h2>Recipes for "{tag}"</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <h3>{recipe.name}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong></p>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleBackClick = () => {
    setSelectedTag(null);
  };

  return (
    <div>
      <h1>ACME Recipe O'Master</h1>
      {selectedTag ? (
        <RecipeList tag={selectedTag} onBackClick={handleBackClick} />
      ) : (
        <RecipeTags onTagClick={handleTagClick} />
      )}
    </div>
  );
};

export default App;