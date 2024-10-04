import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class ClientService {

  private socket: Socket;
  constructor(private http: HttpClient) { 
    this.socket = io(`${environment.socket}clients`);
  }

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

  emitClientAdded(data: any) {
    this.socket.emit('clientAdded', data);
  }

  onClientAdded(callback: (data: any) => void) {
    this.socket.on('clientAddedData', callback);
  }

  emitClientDeleted(data: any) {
    this.socket.emit('clientDeleted', data);
  }

  onClientDeleted(callback: (data: any) => void) {
    this.socket.on('clientDeletedData', callback);
  }

  emitClientUpdated(data: any) {
    this.socket.emit('clientUpdated', data);
  }

  onClientUpdated(callback: (data: any) => void) {
    this.socket.on('clientUpdatedData', callback);
  }

}
