import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class UserService {
  private socket: Socket;
  constructor(private http: HttpClient) {
    this.socket = io(`${environment.socket}auth`);
   }

  private extractData(res: any){
    let body = res;
    return body || { };
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}auth/users`)
    .pipe(map(this.extractData));
  }

  public changeRole(uuidUser: string, uuidRole: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}auth/changeRole`, 
      {
        uuidUser: uuidUser,
        uuidRole: uuidRole
      }
    )
    .pipe(map(this.extractData));
  }

  emitRoleUpdated(data: any) {
    this.socket.emit('roleUpdated', data);
  }

  onRoleUpdated(callback: (data: any) => void) {
    this.socket.on('roleUpdatedData', callback);
  }
}
