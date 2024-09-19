import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}product`)
    .pipe(map(this.extractData));
  }

  public addProduct(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}product/add`, form)
    .pipe(map(this.extractData));
  }
}
