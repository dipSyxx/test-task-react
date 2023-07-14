import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecipeList } from "./components/RecipeList";

const App = () => {
  return (
    <div>
      <h1>Recipes List</h1>
      <hr />
      <Routes>
        <Route exact path="/" element={<RecipeList />} />
      </Routes>
    </div>
  );
};

export default App;
