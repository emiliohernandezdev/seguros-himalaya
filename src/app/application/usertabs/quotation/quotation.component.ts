import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent  implements OnInit {

  public productId: string;
  public product: any = null;
  public formType: string = '';
  public clientForm: FormGroup;
  public houseForm: FormGroup;
  public carForm: FormGroup;
  public quotation = {
    product: null,
    value: null
  };

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
    private loadingCtrl: LoadingController, private nav: NavController, private toastCtrl: ToastController,
    private fb: FormBuilder, private requestService: RequestService
  ) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('product') ?? '';

    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      bornDate: [null, Validators.required],
      comments: ['', Validators.required]
    });

    this.houseForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      price: [0.00, Validators.required],
      comments: ['', Validators.required]
    })

    this.carForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [0, Validators.required],
      plate: ['', Validators.required],
      price: [0.00, Validators.required],
      comments: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getProduct()
  }

  public async getProduct(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando producto...',
    });

    loading.present();

    const toast = await this.toastCtrl.create({
      duration: 3500,
      position: 'bottom',
    });
    
    this.productService.getProduct(this.productId).subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss()
        this.product = e.product;
        this.formType = e.product.formType;
        this.quotation.product = this.product;
      }else{
        await loading.dismiss()
        toast.message  = e.message ?? 'Error al cargar el producto';
        toast.icon = 'alert-circle-outline';
        toast.color = 'danger';
        await toast.present();
        this.nav.pop()
      }
    })
  }

  public async sendClientQuotation(){
    this.quotation.value = this.clientForm.value;

    const loading = await this.loadingCtrl.create({
      message: 'Enviando solicitud...',
    });

    loading.present();
    
    const toast = await this.toastCtrl.create({
      duration: 3500,
      position: 'bottom',
    });

    this.requestService.addRequest(this.quotation.product, this.quotation.value)
    .subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss()
        this.nav.pop();
        toast.message  = e.message ?? 'Solicitud enviada';
        toast.icon = 'checkmark-circle-outline';
        toast.color = 'success';
        await toast.present();
      }else{
        await loading.dismiss()
        toast.message  = e.message ?? 'Error al enviar la solicitud';
        toast.icon = 'alert-circle-outline';
        toast.color = 'danger';
        await toast.present();
      }
    })
  }

  public async sendHouseQuotation(){
    this.quotation.value = this.houseForm.value;
    const loading = await this.loadingCtrl.create({
      message: 'Enviando solicitud...',
    });

    loading.present();
    
    const toast = await this.toastCtrl.create({
      duration: 3500,
      position: 'bottom',
    });

    this.requestService.addRequest(this.quotation.product, this.quotation.value)
    .subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss()
        this.nav.pop();
        toast.message  = e.message ?? 'Solicitud enviada';
        toast.icon = 'checkmark-circle-outline';
        toast.color = 'success';
        await toast.present();
      }else{
        await loading.dismiss()
        toast.message  = e.message ?? 'Error al enviar la solicitud';
        toast.icon = 'alert-circle-outline';
        toast.color = 'danger';
        await toast.present();
      }
    })
  }

  public async sendCarQuotation(){
    this.quotation.value = this.carForm.value;
    const loading = await this.loadingCtrl.create({
      message: 'Enviando solicitud...',
    });

    loading.present();
    
    const toast = await this.toastCtrl.create({
      duration: 3500,
      position: 'bottom',
    });

    this.requestService.addRequest(this.quotation.product, this.quotation.value)
    .subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss()
        this.nav.pop();
        toast.message  = e.message ?? 'Solicitud enviada';
        toast.icon = 'checkmark-circle-outline';
        toast.color = 'success';
        await toast.present();
      }else{
        await loading.dismiss()
        toast.message  = e.message ?? 'Error al enviar la solicitud';
        toast.icon = 'alert-circle-outline';
        toast.color = 'danger';
        await toast.present();
      }
    })
  }

}
