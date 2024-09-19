import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getClients(): Observable<any> {
    return this.http.get(`${environment.apiUrl}client`)
    .pipe(map(this.extractData));
  }

  public addClient(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}client/add`, form)
    .pipe(map(this.extractData));
  }

  public updateClient(uuid: string, form: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}client/update`, {uuid: uuid, ...form})
    .pipe(map(this.extractData));
  }


  public deleteClient(uuid: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}client/delete/${uuid}`)
    .pipe(map(this.extractData));
  }


  public getClientInfo(uuid: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}client/${uuid}`)
    .pipe(map(this.extractData));
  }

}
