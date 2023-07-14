import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecipeStore } from "../store/useRecipeStore";

const apiUrl = "https://api.punkapi.com/v2/beers";

export const RecipeList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showedRecipes, setShowedRecipes] = useState([]);
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const selectedRecipes = useRecipeStore((state) => state.selectedRecipes);
  const deleteSelectedRecipes = useRecipeStore(
    (state) => state.deleteSelectedRecipes
  );
  const toggleRecipeSelection = useRecipeStore(
    (state) => state.toggleRecipeSelection
  );

  const fetchRecipes = async (pageNum) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}?page=${pageNum}`);
      const data = await response.json();
      if (data.length > 0) {
        useRecipeStore.setState((state) => ({
          recipes: [...state.recipes, ...data],
        }));
      }
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(1);
  }, []);

  useEffect(() => {
    setShowedRecipes(recipes.slice(0, 15));
  }, [recipes]);

  const handleScroll = () => {
    if (!isLoading && showedRecipes.length >= 15) {
      setShowedRecipes((prevRecipes) => {
        const nextRecipes = recipes.slice(
          prevRecipes.length,
          prevRecipes.length + 5
        );
        return [...prevRecipes.slice(5), ...nextRecipes];
      });
    }
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleRightClick = (e, recipe) => {
    e.preventDefault();
    toggleRecipeSelection(recipe);
  };

  const handleDeleteClick = () => {
    deleteSelectedRecipes();
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <InfiniteScroll
          dataLength={showedRecipes.length}
          next={handleScroll}
          hasMore={showedRecipes.length < recipes.length}
          height={350}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              rowGap: 70,
            }}
          >
            {showedRecipes.map((recipe) => (
              <li
                key={recipe.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "0 1 20%",
                  backgroundColor: selectedRecipes.includes(recipe)
                    ? "lightblue"
                    : "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                onContextMenu={(e) => handleRightClick(e, recipe)}
              >
                <img
                  src={`${recipe.image_url}`}
                  width={100}
                  height={200}
                  alt={`${recipe.name}`}
                />
                <h3>{recipe.name}</h3>
                <button
                  style={{
                    padding: 10,
                    backgroundColor: "green",
                    border: 0,
                    borderRadius: 10,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRecipeClick(recipe)}
                >
                  Learn more
                </button>
              </li>
            ))}
          </ul>
          {showedRecipes.length === 0 && <h1>No more recipes available.</h1>}
        </InfiniteScroll>
      )}

      {selectedRecipes.length > 0 && (
        <button
          style={{
            position: "fixed",
            bottom: 50,
            right: 50,
            padding: 10,
            backgroundColor: "red",
            border: 0,
            borderRadius: 10,
            color: "#fff",
          }}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      )}
    </>
  );
};
