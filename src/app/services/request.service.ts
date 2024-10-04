import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getRequests(): Observable<any> {
    return this.http.get(`${environment.apiUrl}request/all`)
    .pipe(map(this.extractData));
  }

  public getMyRequests(): Observable<any> {
    const token = localStorage.getItem('himalayaToken')?.toString() ?? '';

    // Crear los encabezados y agregar el token JWT con el esquema Bearer
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.apiUrl}request/my`, { headers })	
    .pipe(map(this.extractData));
  }

  public addRequest(product: any, form: any): Observable<any> {
    const token = localStorage.getItem('himalayaToken')?.toString() ?? '';


    var formData= {
      uuidProduct: product.uuid,
      description: form.comments,
      data: JSON.stringify(form)
    };


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.apiUrl}request/add`, formData, { headers })	
    .pipe(map(this.extractData));
  }
}
