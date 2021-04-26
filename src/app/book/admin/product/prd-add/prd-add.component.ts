import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { Category } from "src/app/models/category";
import { CategoryService } from 'src/app/services/category.service';
import { Author } from "src/app/models/author";
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-prd-add',
  templateUrl: './prd-add.component.html',
  styleUrls: ['./prd-add.component.css']
})
export class PrdAddComponent implements OnInit {
  'prdForm': FormGroup
  url
  categories: Category[] = []
  authors: Author[] = []
  selectedFile: File = null;
  loading = false;
  fb;
  downloadURL: Observable<string>;
  constructor(private bookService: BookService, private authorService: AuthorService, private formBuilder: FormBuilder, private router: Router, private storage: AngularFireStorage, private categoryService: CategoryService) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getAuthorList();
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


  onFileSelected(event) {
    this.loading = true;
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
            this.loading = false;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  createForm() {
    this.prdForm = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      price: ['', Validators.required],
      categoryId: ['', Validators.required],
      authorId: ['', Validators.required],
    });
  }

  get f(){
    return this.prdForm.controls;
  }
  
  
  submitForm(event: any){
    event.preventDefault();
    this.prdForm.value['image'] = this.url
    this.prdForm.value['categoryId'] = Number(this.prdForm.value['categoryId'])
    this.prdForm.value['authorId'] = Number(this.prdForm.value['authorId'])
    this.bookService.store(this.prdForm.value).subscribe(data => {
      if(data.id !=undefined){
        this.router.navigate(['admin/product']);
      }
    })
    
  }

}
