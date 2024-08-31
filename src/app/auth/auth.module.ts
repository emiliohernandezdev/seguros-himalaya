import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    IonicModule
  ],
  providers: [AuthService],
  exports: [LoginComponent]
})
export class AuthModule { }
