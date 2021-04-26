import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  authorId: string;
  editForm: FormGroup;
  constructor(private authorService: AuthorService, private route: ActivatedRoute, private router: Router) {
    this.editForm = this.updateForm();
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.authorId = params.id
    });
    await this.authorService.findById(this.authorId).subscribe(author => {
      this.editForm.setValue({
        id: author.id,
        name: author.name
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
    this.authorService.updateAuthor(this.editForm.value).subscribe(author =>{
      this.router.navigate(['/admin/author']);
    })
  }

}
