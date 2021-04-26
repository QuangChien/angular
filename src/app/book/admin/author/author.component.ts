import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/app/models/author';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authors: Author[] = [];
  constructor(private authorService: AuthorService, private bookService: BookService) { 
    this.getAuthorList()
  }

  ngOnInit(): void {
    
  }

  getAuthorList(){
    this.authorService.getAllAuthor().subscribe(authors => {
      this.authors = authors;
    })
  }

  deleteAuthor(id: any){
    this.authorService.findById(id).subscribe(cate => {
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
      this.authorService.remove(cate.id).subscribe(data => {
        this.getAuthorList();
        setTimeout(function(){alert("Xóa thành công");},500)
      }) 
    })
  }

}
