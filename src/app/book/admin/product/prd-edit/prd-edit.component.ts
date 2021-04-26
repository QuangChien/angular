import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from "src/app/models/category";
import { CategoryService } from 'src/app/services/category.service';
import { Author } from "src/app/models/author";
import { AuthorService } from 'src/app/services/author.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: 'app-prd-edit',
  templateUrl: './prd-edit.component.html',
  styleUrls: ['./prd-edit.component.css']
})
export class PrdEditComponent implements OnInit {
  prdId: string
  editForm: FormGroup;
  categories: Category[] = [];
  authors: Author[] = [];
  url
  selectedFile: File = null;
  fb;
  image
  downloadURL: Observable<string>;
  constructor(private bookService: BookService, private authorService: AuthorService, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private storage: AngularFireStorage) { 
    this.editForm = this.updateForm();
  }

  async ngOnInit() {
    await this.getCategoryList();
    await this.getAuthorList();
    await this.route.params.subscribe(params => {
      this.prdId = params.id
    });
    await this.bookService.findById(this.prdId).subscribe(prd => {
      this.image = prd.image;
      this.editForm.setValue({
        id: prd.id,
        title: prd.title,
        price: prd.price,
        categoryId: prd.categoryId,
        authorId: prd.authorId,

      })
    });
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Uploads/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            this.url = this.fb
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  updateForm(){
    return new FormGroup({
      id: new FormControl(),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      price: new FormControl('', [
        Validators.required,
      ]),
      categoryId: new FormControl('', [
        Validators.required,
      ]),
      authorId: new FormControl('', [
        Validators.required,
      ]),
      
    })
  }

  getCategoryList(){
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    })
  }

  getAuthorList(){
    this.authorService.getAllAuthor().subscribe(authors => {
      this.authors = authors;
    })
  }

  get f(){
    return this.editForm.controls;
  }

  submitEditForm(event:any){
    event.preventDefault();
    this.editForm.value['image'] = this.url;
    if(this.url != undefined){
      this.editForm.value['image'] = this.url;
      // this.image = this.url;
    }
    if(this.url == undefined){
      this.editForm.value['image'] = this.image;
    }
    console.log(this.url);
    this.editForm.value['categoryId'] = Number(this.editForm.value['categoryId'])
    this.editForm.value['authorId'] = Number(this.editForm.value['authorId'])
    this.bookService.updatePrd(this.editForm.value).subscribe(product =>{
      this.router.navigate(['/admin/product']);
    })
    
  }

}
