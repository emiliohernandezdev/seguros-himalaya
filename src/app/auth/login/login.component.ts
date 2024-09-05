import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  private auth = inject(Auth);
  showPassword = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private loadingCtrl: LoadingController, private alertController: AlertController,
    private router: Router
  ) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.authService.getUsers().subscribe(console.log)
  }


  async byMail(){
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesion...',
      animated: true,
      backdropDismiss: false
    });

    await loading.present();

    return signInWithEmailAndPassword(this.auth, this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
    .then(async(result) => {
      console.log(result)
      localStorage.setItem('user', JSON.stringify(result.user));
      this.authService.validateUser(result.user.email ?? '', result.user.displayName ?? '', 'local').subscribe(console.log)
      this.router.navigate(['/app'])
      await loading.dismiss();
    })
    .catch(async (error) => {

      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Ocurrio un error',
        subHeader: 'Esto no deberia pasar.',
        message: 'Vuelva a intentarlo mas tarde',
        buttons: ['Cerrar'],
      });
      switch(error.code){
        case 'auth/invalid-credential':
          alert.header = 'Credenciales invalidas';
          alert.subHeader = 'Verifique sus credenciales'
          alert.message = 'Y vuelva a intentarlo mas tarde.'
          break;

          default:
            alert.header = 'Ocurrio un error';
            alert.subHeader = 'Esto no deberia pasar.';
            alert.message = 'Vuelva a intentarlo mas tarde'
            break;
      }
      
      await alert.present();
    })
  }


  async byGoogle(){
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando con Google...',
      animated: true,
      backdropDismiss: false
    });

    await loading.present();

    return signInWithPopup(this.auth, new GoogleAuthProvider())
    .then(async(result) => {
      console.log(result)
      localStorage.setItem('user', JSON.stringify(result.user));
      this.authService.validateUser(result.user.email ?? '', result.user.displayName ?? '', 'google').subscribe(console.log)
      this.router.navigate(['/app'])
      await loading.dismiss();
    })
    .catch(async (error) => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Ocurrio un error',
        subHeader: 'Esto no deberia pasar.',
        message: 'Vuelva a intentarlo mas tarde',
        buttons: ['Cerrar'],
      });
  
      await alert.present();
    })
  }

  public togglePassword(){
    this.showPassword = !this.showPassword;
  }
}
