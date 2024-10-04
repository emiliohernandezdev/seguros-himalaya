import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  public requests: any[] = [];
  constructor(private requestService: RequestService, private loadingCtrl: LoadingController) { }

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

}
