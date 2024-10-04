import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent  implements OnInit {

  public productId: string;
  public product: any = null;
  public formType: string = 'car';
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
    private loadingCtrl: LoadingController, private nav: NavController, private toastCtrl: ToastController
  ) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('product') ?? '';

    
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

}
