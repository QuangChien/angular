import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cate-add',
  templateUrl: './cate-add.component.html',
  styleUrls: ['./cate-add.component.css']
})
export class CateAddComponent implements OnInit {
  cateForm: FormGroup;
  constructor(private categoryService: CategoryService, private router: Router) { 
    this.cateForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  get f(){
    return this.cateForm.controls;
  }

  submitForm(event:any){
    event.preventDefault();
    this.categoryService.store(this.cateForm.value).subscribe(category => {
      if(category.id != undefined){
        this.router.navigate(['/admin/category']);
      }
    })
  }

}
