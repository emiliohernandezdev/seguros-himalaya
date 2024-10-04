import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithEmailLink } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent  implements OnInit {
  private auth = inject(Auth);
  public addUserForm: FormGroup;
  public roles: any[] = [];
  constructor(private fb: FormBuilder, private roleService: RoleService, private authService: AuthService,
    private toast: ToastController, private nav: NavController
  ) { 
    this.addUserForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      authProvider: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getRoles()
  }

  public async getRoles(){
    this.roleService.getRoles().subscribe((e) => {
      if(e.success == true){
        this.roles = e.roles;
      }
    })
  }


  public async saveUser(){
    const toast = await this.toast.create({
      message: 'Hello World!',
      position: 'bottom',
    });

    return createUserWithEmailAndPassword(this.auth, this.addUserForm.value.email, "123456").then((e) => {
      this.authService.validateUser(this.addUserForm.value.email, this.addUserForm.value.displayName, this.addUserForm.value.authProvider).subscribe((e) => {
        if(e.success == true){
          toast.color = 'success';
          toast.message = e.message ?? 'Usuario creado';
          toast.icon = 'checkmark-circle-outline';
          toast.duration = 2000;
          toast.present();
          this.nav.pop()
        }
        else{
          toast.color = 'danger';
          toast.message = e.message ?? 'Error al crear el usuario';
          toast.icon = 'alert-circle-outline';
          toast.duration = 2000;
          toast.present();
        }
      })
    })
    .catch((err) => {
      toast.color = 'danger';
      toast.message = 'Error al crear el usuario, puede que ya este registrado.';
      toast.icon = 'alert-circle-outline';
      toast.duration = 2000;
      toast.present();
    })
  }
}
