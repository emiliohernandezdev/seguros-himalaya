import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ProviderService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getProviders(): Observable<any> {
    return this.http.get(`${environment.apiUrl}provider`)
    .pipe(map(this.extractData));
  }

  public addProvider(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}provider/add`, form)
    .pipe(map(this.extractData));
  }
}
