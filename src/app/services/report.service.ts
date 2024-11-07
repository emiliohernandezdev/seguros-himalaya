import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getReports(): Observable<any> {
    return this.http.get(`${environment.apiUrl}report/all`)
    .pipe(map(this.extractData));
  }
}
