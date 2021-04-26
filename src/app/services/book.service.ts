import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private API_URL = "http://localhost:3000/books";
  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.API_URL}?_expand=category&_expand=author`);
  }

  findById(id: any): Observable<Product> {
    let requestUrl = `${this.API_URL}/${id}?_expand=category&_expand=author`;
    return this.http.get<Product>(requestUrl);
  }

  removeMutiple(idList: any[]): Observable<any> {
    let requestUrl = idList.map(
      id => this.http.delete<any>(`${this.API_URL}/${id}`)
    );
    return forkJoin(requestUrl);
  }

  store(obj: Product): Observable<any>{
    return this.http.post(this.API_URL, obj);
  }

  updatePrd(object: Product): Observable<Product>{
    let requestUrl = `${this.API_URL}/${object.id}`;
    return this.http.put<Product>(requestUrl, object);
  }

  remove(id: any): Observable<any>{
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  getAll(filter: any): Observable<any>{
    let requestUrl = this.API_URL + "?_expand=category&_expand=author";
    switch (filter.orderBy) {
      case "1":
        requestUrl += "&_sort=price&_order=asc";  
        break;
      case "2":
        requestUrl += "&_sort=price&_order=desc";
        break;
      case "3":
        requestUrl += "&_sort=title&_order=asc";
        break;
      case "4": 
        requestUrl += "&_sort=title&_order=desc";
        break;
      default:
        break;
    }
    if(filter.keyword.length > 0){
      requestUrl += `&title_like=${filter.keyword}`;
    }
    
    return this.http.get<any>(requestUrl);
  }

}
