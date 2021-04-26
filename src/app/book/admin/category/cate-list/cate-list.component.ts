import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-cate-list',
  templateUrl: './cate-list.component.html',
  styleUrls: ['./cate-list.component.css']
})
export class CateListComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService, private bookService: BookService) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(){
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteCate(id: any){
    this.categoryService.findById(id).subscribe(cate => {
      // if(cate.books != undefined){
      //   let ids = cate.books.map(item => item.id);
      //   this.bookService.removeMutiple(ids).subscribe(result => {
      //     this.categoryService.remove(cate.id).subscribe(data => {
      //       console.log(data);
      //     }) 
      //   })
      // }else{
      //     this.categoryService.remove(cate.id).subscribe(data => {
      //       console.log(data);
      //     })
      //     console.log(cate.books);
          
      //   }
      this.categoryService.remove(cate.id).subscribe(data => {
        this.getCategoryList();
        setTimeout(function(){alert("Xóa thành công");},500)
      }) 
    })
  }

}
