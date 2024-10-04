import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent  implements OnInit {

  public requests: any[] = [];
  constructor(private requestService: RequestService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getMyRequests()
  }

  async getMyRequests() {
    this.requests = [];
    const loading = await this.loadingCtrl.create({
      message: 'Cargando solicitudes...',
    });

    loading.present();

    this.requestService.getMyRequests()
    .subscribe(async (e) => {
      if(e.success == true) {
        await loading.dismiss()
        this.requests = e.requests;
      }else{
        await loading.dismiss()
      }
    })
  }

}
