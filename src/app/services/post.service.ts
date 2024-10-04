import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getPosts(limit: number) : Observable<any>{
    return this.http.get(`${environment.apiUrl}posts/feed/${limit}`)
    .pipe(map(this.extractData));
  }

  public addPost(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}posts/add`, form)
    .pipe(map(this.extractData));
  }

}
