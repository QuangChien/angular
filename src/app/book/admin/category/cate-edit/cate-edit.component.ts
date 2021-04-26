import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cate-edit',
  templateUrl: './cate-edit.component.html',
  styleUrls: ['./cate-edit.component.css']
})
export class CateEditComponent implements OnInit {
  cateId: string;
  editForm: FormGroup;
  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {
    this.editForm = this.updateForm();
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.cateId = params.id
    });
    await this.categoryService.findById(this.cateId).subscribe(cate => {
      this.editForm.setValue({
        id: cate.id,
        name: cate.name
      })
    });
  }

  updateForm(){
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  get f(){
    return this.editForm.controls;
  }


  submitEditForm(event:any){
    event.preventDefault();
    this.categoryService.updateCate(this.editForm.value).subscribe(category =>{
      this.router.navigate(['/admin/category']);
    })
  }

}
