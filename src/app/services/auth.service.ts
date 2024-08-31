import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, UserCredential, signInWithPopup } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  private auth = inject(Auth);
  constructor() { }


  byGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  
}
