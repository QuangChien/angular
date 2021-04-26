import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = "http://localhost:3000/categories";
  constructor(private http: HttpClient) { }

  // list
  getAllCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.API_URL}?_embed=books`);
  }

  // add
  store(object: Category): Observable<Category> {
    return this.http.post<Category>(this.API_URL, object);
  }

  findById(id: any): Observable<Category> {
    let requestUrl = `${this.API_URL}/${id}?_embed=books`;
    return this.http.get<Category>(requestUrl);
  }

  updateCate(object: Category): Observable<Category>{
    let requestUrl = `${this.API_URL}/${object.id}`;
    return this.http.put<Category>(requestUrl, object);
  }

  remove(id: any): Observable<Category> {
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<Category>(requestUrl);
  }

}
