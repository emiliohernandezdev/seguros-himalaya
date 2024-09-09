import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getRoles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}role`)
    .pipe(map(this.extractData));
  }
}
