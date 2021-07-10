import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoriesService } from 'src/app/services/categories.service';
import { TipsService } from 'src/app/services/tips.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: any = [];
  tips: any = [];
  categoryName = "";

  constructor(
    private categoriesService: CategoriesService,
    private tipsService: TipsService,
    private ngxService: NgxUiLoaderService
  ) { }

  async ngOnInit() {
    await this.getCategories();
  }

  async getCategories() {
    this.ngxService.start();

    let response: any = await this.categoriesService.get();
    this.categories = response.data;

    this.ngxService.stop();
  }

  async getTips(category, name) {
    this.ngxService.start();
    this.categoryName = name;

    let response: any = await this.tipsService.get(null, { category: category });
    console.log(response);

    this.tips = await response.data;


    this.ngxService.stop();
  }
}
