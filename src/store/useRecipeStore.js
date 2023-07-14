import create from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],
  selectedRecipes: [],
  deleteSelectedRecipes: () => {
    set((state) => ({
      recipes: state.recipes.filter(
        (recipe) => !state.selectedRecipes.includes(recipe)
      ),
      selectedRecipes: [],
    }));
  },
  toggleRecipeSelection: (recipe) => {
    set((state) => ({
      selectedRecipes: state.selectedRecipes.includes(recipe)
        ? state.selectedRecipes.filter((selected) => selected !== recipe)
        : [...state.selectedRecipes, recipe],
    }));
  },
}));
