import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}auth/users`)
    .pipe(map(this.extractData));
  }
}
