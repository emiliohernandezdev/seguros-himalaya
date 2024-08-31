import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  constructor() { 
    
  }

  ngOnInit() {}


  byGoogle(){
    // return signInWithPopup(this.auth, new GoogleAuthProvider());

  }
}
