import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public validateUser(email: string, displayName: string, authProvider?: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/validate`, {
      email: email,
      displayName: displayName,
      authProvider: authProvider
    })
    .pipe(map(this.extractData));
  }
}
