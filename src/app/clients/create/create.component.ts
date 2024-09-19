import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicate, maskitoTransform } from '@maskito/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent  implements OnInit {
  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '5', '0', '2', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  // Validar el valor inicial usando la máscara
  myPhoneNumber = maskitoTransform('45893513', this.phoneMask);

  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(3).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  public createClientForm: FormGroup;
  constructor(private fb: FormBuilder, private clientService: ClientService, private nav: NavController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.createClientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      bornDate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      type: ['', Validators.required],
    })
   }

  ngOnInit() {}


  async saveForm(){
    const loading = await this.loadingCtrl.create({
      message: 'Guardando registro...',
    });

    await loading.present();
    this.clientService.addClient(this.createClientForm.value)
    .subscribe(async (e) => {
      if(e.success == true){
        this.nav.pop()

        const toast = await this.toastController.create({
          message: e.message ?? 'Cliente creado con exito',
          duration: 2000,
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        });
        await loading.dismiss();
        await toast.present();
        
      }else{
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: e.message ?? 'Error al crear el cliente',
          duration: 2000,
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
        await toast.present();
      }
    })
  }
}
