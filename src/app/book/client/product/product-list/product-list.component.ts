import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ORDER_DATA } from 'src/app/mock-data/ORDER_DATA';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private bookService: BookService, private categoryService: CategoryService) { }
  books: any;
  orderData: any[] = ORDER_DATA;
  categories: Category[] = [];
  ngOnInit(): void {
    this.getCategoryList();
    this.search();
  }
  filterObject = {
    orderBy: "1",
    keyword: ""
  }

  search(){
    this.bookService.getAll(this.filterObject).subscribe(data => {
      this.books = data;
    })
  }
  getCategoryList(){
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    })
  }

}
