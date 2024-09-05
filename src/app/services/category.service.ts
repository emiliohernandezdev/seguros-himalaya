import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }


  public getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}category`)
    .pipe(map(this.extractData));
  }

  public addCategory(category: CategoryModel): Observable<any> {
    return this.http.post(`${environment.apiUrl}category/add`, category)
    .pipe(map(this.extractData))
  }

}
