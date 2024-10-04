import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AddComponent } from '../add/add.component';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  public users: any[] = [];
  public roles: any[] = [];
  constructor(private userService: UserService,
    private roleService: RoleService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers()
    this.getRoles()
    this.roleSocket()
  }

  public async getUsers() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando usuarios...'
    });

    await loading.present();

    this.userService.getUsers()
      .subscribe(async (e) => {
        if (e.success == true) {
          await loading.dismiss();
          this.users = e.users;
        } else {
          this.users = [];
          await loading.dismiss();
        }
      })
  }

  public async getRoles() {
    this.roleService.getRoles()
      .subscribe(async (e) => {
        if (e.success == true) {
          this.roles = e.roles;
        } else {
          this.roles = [];
        }
      })
  }

  public async addModal() {
    this.router.navigate(['/users/add'])
  }


  handleRefresh(event: any) {
    this.users = [];
    this.getUsers()
      .then(() => {
        event.target.complete();
      })
  }

  public async cancel() {
    this.getUsers()
  }

  public async roleSocket(){
    this.userService.onRoleUpdated((data) => {
      this.users = this.users.map((user) => {
        if (user.uuid == data.uuid) {
          user.role = data.role
        }
        return user
      })
    })
  }

  public async search($event: any) {
    $event.preventDefault();
    
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
  
    await loading.present();
  
    const searchTerm = $event.target.value.toLowerCase();
  
    this.users = this.users.filter((user) => {
      return (
        user.displayName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
  
    await loading.dismiss();
  }

  public async disableUser(user: any){
    const alert = await this.alertCtrl.create({
      header: 'Desactivacion de usuario',
      subHeader: 'Desea desactivar el usuario: ' + user.email + '?',
      message: 'Si lo desactiva, el usuario no podra autenticarse, no podra acceder al sistema.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            
          }
        },
        {
          text: 'Desactivar',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }


  public async changeRol(user: any){
    const alert = await this.alertCtrl.create({
      header: 'Cambio de rol',
      message: 'Seleccione el nuevo rol',
      inputs: this.roles.map((role) => {
        return {
          name: role.name,
          type: 'radio',
          label: role.label,
          value: role.uuid,
          checked: role.uuid == user.role.uuid
        }
      }),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cambiar',
          handler: async(ev) => {
            const loading = await this.loadingCtrl.create({
              message: 'Actualizando rol...',
            });
        
            loading.present();

            const toast = await this.toastCtrl.create({
              message: 'Hello World!',
              duration: 1500,
              position: 'bottom',
            });
  
            this.userService.changeRole(user.uuid, ev)
            .subscribe(async (e) => {
              if (e.success == true) {
                toast.color = 'success';
                toast.message = e.message ?? 'Rol actualizado';
                toast.icon = 'checkmark-circle-outline';

                await loading.dismiss();
                await toast.present();

                this.userService.emitRoleUpdated({
                  uuidRole: ev,
                  uuidUser: user.uuid
                });
              } else {
                toast.color = 'danger';
                toast.message = e.message ?? 'Error al cambiar el rol';
                toast.icon = 'alert-circle-outline';

                await loading.dismiss();
                await toast.present();
              }
            })
          },
        },
      ],
    });

    await alert.present();
  }

}
