import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent  implements OnInit {

  public createProviderForm: FormGroup;
  constructor(private fb: FormBuilder, private providerService: ProviderService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { 
    this.createProviderForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      color: ['', Validators.required],
      logo: ['', Validators.required],
    })
  }

  ngOnInit() {}

  public async createProvider(){
    const loading = await this.loadingCtrl.create({
      message: 'Guardando proveedor...'
    });

    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 2500,
      position: 'bottom',
    });

    await loading.present();
    this.providerService.addProvider(this.createProviderForm.value).subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss()
        toast.message = e.message ?? 'Proveedor creado';
        toast.icon = 'checkmark-circle-outline';
        await toast.present();
        this.navCtrl.pop();
      }else{
        await loading.dismiss()
        toast.message = e.message ?? 'Error al crear el proveedor';
        toast.icon = 'alert-circle-outline';
        await toast.present();
      }
    })
  }
}
