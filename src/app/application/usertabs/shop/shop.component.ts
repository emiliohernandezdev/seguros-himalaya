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
  }

  async handleInput(event: any) {
    event.preventDefault();
    const query = event.target.value.toLowerCase();
    
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
  
    await loading.present();

    this.products = this.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  
    await loading.dismiss();
  }

  async cancel(){
    this.products = []
    this.getProducts()
  }

}
