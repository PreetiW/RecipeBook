import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe.model';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeSrv: RecipesService,
    private location: Location,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        this.navigateBack();
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipeSrv.getRecipe(recipeId);
    });
  }

  async onDeleteRecipe() {
    const deleteAlert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really wan to delete the recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.recipeSrv.deleteRecipe(this.loadedRecipe.id);
            this.navigateBack();
          },
        },
      ],
    });

    await deleteAlert.present();
  }

  navigateBack() {
    this.location.back();
  }
}
