import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  implements OnInit {
  public productUuid: string = '';
  public product: any = null;
  constructor(private productService: ProductService, private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { 
    this.productUuid = this.route.snapshot.paramMap.get('id') ?? '';
    this.getProductInfo()
  }

  ngOnInit() {
    
  }

  async getProductInfo(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando producto...'
    });

    loading.present();
    this.productService.getProduct(this.productUuid).subscribe(async (res) => {
      if(res.success == true){
        await loading.dismiss();
        this.product = res.product;
      }else{
        await loading.dismiss();
      }
    })
  }
}
