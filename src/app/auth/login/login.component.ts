import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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
    private router: Router,
    private toast: ToastController
  ) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  async doLogin(method: string){
    switch(method){
      case 'mail':
        await this.byMail();
        break;
      case 'google':
        await this.byGoogle();
        break;
    }
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
      localStorage.setItem('user', JSON.stringify(result.user));
      this.authService.validateUser(result.user.email ?? '', result.user.displayName ?? '', 'local')
      .subscribe(async(e) => {
        const authAlert = await this.alertController.create({
          header: 'Ocurrio un error',
          subHeader: 'Esto no deberia pasar.',
          message: 'Vuelva a intentarlo mas tarde',
          buttons: ['Cerrar'],
        });
        if(e.success == true){
          const toast = await this.toast.create({
            message: 'Sesion iniciada con exito',
            duration: 2500,
            position: 'bottom',
            icon: 'checkmark-circle-outline'
          });
      
          await toast.present();
          switch(e.user.role.name){
            case 'admin':
              this.router.navigate(['/app'])
            break;

            case 'user':
              this.router.navigate(['/application/user/menu'])
            break;
          }
          await toast.present()
          localStorage.setItem('himalayaToken', e.token);
        }else{
          authAlert.header = 'Error de autenticacion';
          authAlert.subHeader = 'Verifique sus credenciales'
          authAlert.message = 'Y vuelva a intentarlo mas tarde.'

          await authAlert.present();
        }
      })
      
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
      localStorage.setItem('user', JSON.stringify(result.user));
      this.authService.validateUser(result.user.email ?? '', result.user.displayName ?? '', 'google')
      .subscribe(async(e) => {
        const authAlert = await this.alertController.create({
          header: 'Ocurrio un error',
          subHeader: 'Esto no deberia pasar.',
          message: 'Vuelva a intentarlo mas tarde',
          buttons: ['Cerrar'],
        });
        if(e.success == true){
          const toast = await this.toast.create({
            message: 'Sesion iniciada con exito',
            duration: 2500,
            position: 'bottom',
            icon: 'checkmark-circle-outline'
          });
          switch(e.user.role.name){
            case 'admin':
              this.router.navigate(['/app'])
            break;

            case 'user':
              this.router.navigate(['/application/user/menu'])
            break;

          }
          await toast.present()
          localStorage.setItem('himalayaToken', e.token);
        }else{
          authAlert.header = 'Error de autenticacion';
          authAlert.subHeader = 'Verifique sus credenciales'
          authAlert.message = 'Y vuelva a intentarlo mas tarde.'
          
          await authAlert.present();
        }
      })
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

  public forgotPassword(){
    return sendPasswordResetEmail(this.auth, this.loginForm.controls['email'].value)
    .then((e) => {

    })
    .catch(async(error) => { 
      const alert = await this.alertController.create({
        header: error,
        subHeader: 'Esto no deberia pasar.',
        message: 'Vuelva a intentarlo mas tarde',
        buttons: ['Cerrar'],
      });
      switch(error.code){
        case 'auth/missing-email':
          alert.header = 'Sin correo electronico';
          alert.subHeader = 'No ha ingresado su correo electronico'
          alert.message = 'Ingreselo por favor, y vuelva a intentarlo.'
          break;
      }
      
  
      await alert.present();
    })
  }
}
