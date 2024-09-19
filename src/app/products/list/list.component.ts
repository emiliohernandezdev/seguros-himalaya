import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  public products: any[] = [];
  constructor(private router: Router, private productService: ProductService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  public addForm(){
    this.router.navigate(['/products/create']);
  }

  public async getProducts(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando productos...',
    });

    loading.present();
    this.productService.getProducts()
    .subscribe(async (e) => {
      if(e.success == true){
        this.products = e.products;
        await loading.dismiss()
      }else{

      }
    })
  }

}
