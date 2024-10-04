import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent  implements OnInit {
  public products: any[] = [];
  constructor(private productService: ProductService, private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.getProducts()
  }

  public async getProducts(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando productos...',
    });

    loading.present();
    this.productService.getProducts().subscribe(async (e) => {
      if(e.success == true){
        this.products = e.products;
        await loading.dismiss()
      }else{
        await loading.dismiss()
      }
    })
  }

  public async requestBudget(product: any){
    this.router.navigate(['/application/quotation', product.uuid]);
    // const alert = await this.alertCtrl.create({
    //   header: 'Solicitar cotizacion',
    //   subHeader: product.name + ' de ' + product.provider.name,
    //   inputs: [
    //     {
    //       type: 'text',
    //       label: 'Nombre',
    //       placeholder: 'Nombre de cliente',
    //       name: 'name'
    //     },
    //     {
    //       type: 'date',
    //       label: 'Fecha de nacimiento',
    //       placeholder: 'Fecha nacimiento cliente',
    //       name: 'birthDate'
    //     },
    //     {
    //       type: 'email',
    //       label: 'Correo electronico',
    //       placeholder: 'Correo electronico cliente',
    //       name: 'email'
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancelar',
    //       role: 'destructive',
    //     },
    //     {
    //       text: 'Solicitar',
    //       handler: (data) => {
    //         console.log(data);
    //       },
    //     }
    //   ]
    // })

    // await alert.present()
  }

}
