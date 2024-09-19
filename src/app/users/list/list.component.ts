import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  public users: any[] = [];
  constructor(private userService: UserService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getUsers()
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

  public async addModal() {
    const modal = await this.modalCtrl.create({
      component: AddComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
      
    }
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


}
