import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit {

  authorForm: FormGroup;
  constructor(private authorService: AuthorService, private router: Router) { 
    this.authorForm = this.createForm();
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
    return this.authorForm.controls;
  }

  submitForm(event:any){
    event.preventDefault();
    this.authorService.store(this.authorForm.value).subscribe(author => {
      if(author.id != undefined){
        this.router.navigate(['/admin/author']);
      }
    })
  }

}
