import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  categories: Category[] = [];
  constructor(private route: ActivatedRoute,
    private bookService: BookService, private categoryService: CategoryService) { }

    bookId: string;
    book: any;
    async ngOnInit() {
      await this.getCategoryList()
      await this.route.params.subscribe(params => {
        this.bookId = params['bookId'];
      });
  
      await this.bookService.findById(this.bookId).subscribe(data => {
        this.book = data;
      });
    }

    getCategoryList(){
      this.categoryService.getAllCategory().subscribe(categories => {
        this.categories = categories;
      })
    }

}
