import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  cateId
  category
  categories
  constructor(private categoryService: CategoryService,private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    await this.getCategoryList();
    await this.route.params.subscribe(params => {
      this.cateId = params.id
    });
    await this.categoryService.findById(this.cateId).subscribe(cate => {     
      this.category = cate
    });
  }

  getCategoryList(){
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    })
  }
  async getCate(){
    await this.route.params.subscribe(params => {
      this.cateId = params.id
    });
    await this.categoryService.findById(this.cateId).subscribe(cate => {
      this.category = cate
    });
  }

}
