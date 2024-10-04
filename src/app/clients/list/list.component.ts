import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  public clients: any[] = [];
  constructor(private clientService: ClientService, private router: Router,
    private loadingCtrl: LoadingController, private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getClients()
    this.clientSocket()
  }


  async clientSocket(){
    this.clientService.onClientAdded((data: any) => {
      this.clients.push(data);
    })

    this.clientService.onClientDeleted((data: any) => {
      this.clients = this.clients.filter((client: any) => client.uuid != data.uuid)
    })

    this.clientService.onClientUpdated((data: any) => {
      var index = this.clients.findIndex((client: any) => client.uuid == data.uuid);

      if(index > -1){
        this.clients[index] = data;
      }
    })
  }

  async getClients(){
    this.clients = []
    const loading = await this.loadingCtrl.create({
      message: 'Cargando clientes...'
    });

    loading.present();
    this.clientService.getClients()
    .subscribe(async (e) => {
      if(e.success == true){
        this.clients = e.clients;
        await loading.dismiss()
      }else{
        await loading.dismiss();

      }
    })
  }

  addForm(){
    this.router.navigate(['/clients/create']);
  }

  public async cancel() {
    this.getClients()
  }

  public async update(client: any){
    this.router.navigate(['/clients/update', client.uuid]);
  }

  public async search($event: any) {
    $event.preventDefault();
    
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
  
    await loading.present();
  
    const searchTerm = $event.target.value.toLowerCase();
  
    this.clients = this.clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(searchTerm) ||
        client.surname.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm)
      );
    });
  
    await loading.dismiss();
  }

  calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
  
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
  
    // Si el mes actual es menor que el mes de nacimiento o si es el mismo mes pero el día actual es menor, restamos un año
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
  
    return age;
  }

  handleRefresh(event: any) {
    this.clients = [];
    this.getClients()
      .then(() => {
        event.target.complete();
      })
  }

  public async delete(client: any) {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Desea eliminar al cliente: ' + client.name + ' ' + client.surname + '?',
      buttons: [
        {
          text: 'Si, eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando...'
            });

            await loading.present()

            this.clientService.deleteClient(client.uuid)
              .subscribe(async(e) => {
                if (e.success == true) {
                  const toast = await this.toastController.create({
                    message: e.message,
                    duration: 2300,
                    position: 'bottom',
                  });
              
                  await loading.dismiss()
                  await toast.present();
                  this.clientService.emitClientDeleted(client);
                }else{
                  const toast = await this.toastController.create({
                    message: e.message,
                    duration: 2300,
                    position: 'bottom',
                  });
                  await loading.dismiss()
                  await toast.present();
                }
              })
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();


  }
}
