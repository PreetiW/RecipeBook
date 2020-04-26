import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'French Fries',
      imageUrl: 'https://dummyimage.com/600x400/000/fff',
      ingredients: ['Potato', 'Oil'],
    },
    {
      id: 'r2',
      title: 'Hakka Noodles',
      imageUrl: 'https://dummyimage.com/600x400/000/fff',
      ingredients: ['Noodles', 'Oil', 'Tomato'],
    },
  ];

  constructor() {}

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find((recipe) => {
        return recipe.id === recipeId;
      }),
    };
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter((recipe) => {
      return recipe.id !== recipeId;
    });
    console.log(this.recipes);
  }
}
