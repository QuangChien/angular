import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/app/models/author';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    this.getCategoryList()
    this.getAuthorList()
    this.getProductList()
  }
  authors: Author[] = [];
  categories: Category[] = [];
  products: Product[] = [];
  constructor(private categoryService: CategoryService,private bookService: BookService,private authorService: AuthorService ) { }

  getAuthorList(){
    this.authorService.getAllAuthor().subscribe(authors => {
      this.authors = authors;
    })
  }

  getCategoryList(){
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    })
  }

  getProductList(){
    this.bookService.getAllProduct().subscribe(products => {
      this.products = products;    
    })
  }

}
