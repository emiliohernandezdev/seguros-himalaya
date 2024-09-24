import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-list-providers',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  public providers: any[] = [];
  constructor(private router: Router, private providerService: ProviderService,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
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

  public async deleteProvider(provider: any){
    const alert = await this.alertController.create({
      header: '¿Desea eliminar el proveedor?',
      subHeader: 'Si lo elimina, esta acción no tiene vuelta atrás',
      buttons: [
        {
          text: 'Aceptar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando proveedor...',
            });
            await loading.present();
        
            this.providerService.deleteProvider(provider.uuid)
            .subscribe(async (e) => {
              if(e.success == true){
                await loading.dismiss()
              }else{
                await loading.dismiss()
              }
            })
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: async() => { 
            await alert.dismiss()
          }
        }
      ],
    });

    await alert.present();

    
  }

  public async providerOptions(provider: any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Acciones para el proveedor',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteProvider(provider)
          }
        },
        {
          text: 'Editar',
          icon: 'pencil',
          handler() {
            
          },
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
