import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  public requests: any[] = [];
  constructor(private requestService: RequestService, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  public async getRequests(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando solicitudes...'
    });
    await loading.present();
    this.requestService.getRequests().subscribe((res: any) => {
      if(res.success == true){
        this.requests = res.requests;
        loading.dismiss();
      }else{
        loading.dismiss();
      }
    });
  }

  public states: any[] = [
    {
      label: 'Enviada',
      value: 'sended'
    },
    {
      label: 'En progreso',
      value: 'inprogress'
    },
    {
      label: 'Aprobada',
      value: 'approved'
    },
    {
      label: 'Rechazada',
      value: 'rejected'
    }
  ];
  public async changeState(request: any){
    const alert = await this.alertCtrl.create({
      header: 'Cambio de estado de solicitud',
      subHeader: 'Seleccione un nuevo estado',
      inputs: this.states.map((state) => {
        return {
          name: state.value,
          type: 'radio',
          label: state.label,
          value: state.value,
          checked: state.value == request.state
        }
      }),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Cambiando estado...'
            });
            await loading.present();
            // this.requestService.changeState(request.uuid, request.state.uuid).subscribe((res: any) => {
            //   if(res.success == true){
            //     loading.dismiss();
            //     this.getRequests();
            //   }else{
            //     loading.dismiss();
            //   }
            // });
          }
        }
      ],
    });

    await alert.present();
  }

}
