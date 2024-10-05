import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  implements OnInit {

  public requestUuid: string = '';
  public request: any = null;
  public requestData: any = null;

  constructor(private requestService: RequestService, private activated: ActivatedRoute,
    private loading: LoadingController, private toast: ToastController,
    private nav: NavController
  ) {
    this.requestUuid = this.activated.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit() {
    this.getRequest()
  }

  public async getRequest(){
    const toast = await this.toast.create({
      message: 'Hello World!',
      duration: 3500,
      position: 'bottom',
    });

    const loading = await this.loading.create({
      message: 'Cargando solicitud...',
    });

    loading.present();
    this.requestService.getRequestById(this.requestUuid).subscribe(async (res: any) => {
      if(res.success == true){
        await loading.dismiss()
        this.request = res.request;
        this.getData(this.request);
      }else{
        await loading.dismiss();
        toast.message = res.message ?? 'Error al cargar el detalle';
        toast.icon = 'alert-circle-outline';
        toast.color = 'danger';
        toast.present();
        this.nav.pop();
      }
    })
  }


  public async getData(request: any){
    this.requestData = JSON.parse(request.data);
  }

  public async tramitar(){
    const toast = await this.toast.create({
      message: 'Hello World!',
      duration: 3500,
      position: 'bottom',
    });

    const loading = await this.loading.create({
      message: 'Tramitando...',
    });

    await loading.present();

    this.requestService.updateState(this.request, "inprogress")
    .subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss();
        toast.message = e.message ?? 'Solicitud tramitada';
        toast.color ='success';
        toast.icon = 'checkmark-circle-outline';

        await toast.present();
        this.nav.pop();
      }else{
        await loading.dismiss();
        toast.message = e.message ?? 'Error al tramitar la solicitud';
        toast.color ='danger';
        toast.icon = 'close-outline';

        await toast.present();
      }
    })
  }


  public async approve(){
    const toast = await this.toast.create({
      message: 'Hello World!',
      duration: 3500,
      position: 'bottom',
    });

    const loading = await this.loading.create({
      message: 'Aprobando...',
    });

    await loading.present();

    this.requestService.updateState(this.request, "approved")
    .subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss();
        toast.message = e.message ?? 'Solicitud aprobada';
        toast.color ='success';
        toast.icon = 'checkmark-circle-outline';

        await toast.present();
        this.nav.pop();
      }else{
        await loading.dismiss();
        toast.message = e.message ?? 'Error al aprobar la solicitud';
        toast.color ='danger';
        toast.icon = 'close-outline';

        await toast.present();
      }
    })
  }

  public async reject(){
    const toast = await this.toast.create({
      message: 'Hello World!',
      duration: 3500,
      position: 'bottom',
    });

    const loading = await this.loading.create({
      message: 'Rechazando...',
    });

    await loading.present();

    this.requestService.updateState(this.request, "rejected")
    .subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss();
        toast.message = e.message ?? 'Solicitud rechazada';
        toast.color ='success';
        toast.icon = 'checkmark-circle-outline';

        await toast.present();
        this.nav.pop();
      }else{
        await loading.dismiss();
        toast.message = e.message ?? 'Error al rechazar la solicitud';
        toast.color ='danger';
        toast.icon = 'close-outline';

        await toast.present();
      }
    })
  }
}
