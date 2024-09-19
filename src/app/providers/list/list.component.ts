import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-list-providers',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  public providers: any[] = [];
  constructor(private router: Router, private providerService: ProviderService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getProviders()
  }

  public addForm(){
    this.router.navigate(['/providers/create']);
  }

  public async getProviders(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando proveedores...',
    });

    loading.present();
    this.providerService.getProviders()
    .subscribe(async (e) => {
      if(e.success == true){
        this.providers = e.providers; 
        await loading.dismiss()
      }else{
        await loading.dismiss()
      }
    })
  }
}
