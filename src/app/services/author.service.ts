import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private API_URL = "http://localhost:3000/authors";
  constructor(private http: HttpClient) { }

  // list
  getAllAuthor(): Observable<Author[]>{
    return this.http.get<Author[]>(`${this.API_URL}?_embed=books`);
  }

  store(object: Author): Observable<Author> {
    return this.http.post<Author>(this.API_URL, object);
  }

  findById(id: any): Observable<Author> {
    let requestUrl = `${this.API_URL}/${id}?_embed=books`;
    return this.http.get<Author>(requestUrl);
  }

  updateAuthor(object: Author): Observable<Author>{
    let requestUrl = `${this.API_URL}/${object.id}`;
    return this.http.put<Author>(requestUrl, object);
  }

  remove(id: any): Observable<Author> {
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<Author>(requestUrl);
  }
}
