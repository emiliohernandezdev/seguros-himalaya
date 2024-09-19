import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicate, maskitoTransform } from '@maskito/core';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent  implements OnInit {
  public clientUuid: string = '';
  public clientInfo: any = null;
  public updateForm: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private clientService: ClientService,
    private toast: ToastController,
    private nav: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      bornDate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      type: ['', Validators.required],
    })
      this.clientUuid = this.route.snapshot.paramMap.get('id') ?? '';

      this.clientService.getClientInfo(this.clientUuid).subscribe((e) => {
        if(e.success == true){
          this.clientInfo = e.client;
          this.updateForm.patchValue(this.clientInfo);
        }
      })
   }

  ngOnInit() {}

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


  public async updateClient(){
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando cliente...'
    });

    await loading.present();
    const toast = await this.toast.create({
      message: 'Hello World!',
      position: 'bottom',
      duration: 2500
    });

    this.clientService.updateClient(this.clientUuid, this.updateForm.value).subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss()
        toast.message = e.message ?? 'Cliente actualizado';
        toast.icon = 'checkmark-circle-outline';
        await toast.present()
        this.nav.pop()
      }else{
        await loading.dismiss()
        toast.message = e.message ?? 'Error al actualizar el cliente';
        toast.icon = 'alert-circle-outline';
        await toast.present()
      }
    })
  }
}
