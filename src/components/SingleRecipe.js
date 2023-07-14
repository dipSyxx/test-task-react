import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/useRecipeStore";

export const SingleRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const recipeId = id;
  const recipes = useRecipeStore((state) => state.recipes);
  const recipe = recipes.find((recipe) => recipe.id === Number(recipeId));

  const handleRecipeClick = (recipe) => {
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleRecipeClick}
        style={{
          padding: 20,
          backgroundColor: "gray",
          border: 0,
          borderRadius: 10,
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Back
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={`${recipe.image_url}`}
          width={100}
          height={200}
          alt={`${recipe.name}`}
        />
        <h3>{recipe.name}</h3>
        <p>{recipe.tagline}</p>
        <p>{recipe.description}</p>
      </div>
    </>
  );
};
