import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.bookService.getAllProduct().subscribe(products => {
      this.products = products;    
    })
  }

  async remove(id: any){
    let conf = confirm(`Bạn có chắc chắn muốn xóa hay không?`);
    if(conf){
        this.bookService.remove(id).subscribe(prd => {
           this.getProductList();
           setTimeout(function(){ alert("Xóa thành công!"); }, 500);
        })
      }
  }

}
