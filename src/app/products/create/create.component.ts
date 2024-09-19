import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent  implements OnInit {

  public createProductForm: FormGroup;
  public categories: any[] = [];
  public providers: any[] = [];
  constructor(private fb: FormBuilder, private productService: ProductService,
    private categoryService: CategoryService, 
    private providerService: ProviderService, private loadingCtrl: LoadingController) { 
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      isAvailable: [true, Validators.required],
      category: [null, Validators.required],
      provider: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.getCategories()
    this.getProviders()
  }

  public async getCategories(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando categorias...',
    });

    loading.present();
    this.categoryService.getCategories().subscribe(async (e) => {
      if(e.success == true){
        this.categories = e.categories;
        await loading.dismiss()
      }else{
        await loading.dismiss()
      }
    })
  }

  public async getProviders(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando proveedores...',
    });
    this.providerService.getProviders().subscribe(async (e) => {
      if(e.success == true){
        this.providers = e.providers;
        await loading.dismiss()
      }else{
        await loading.dismiss()
      }
    })
  }

  public async saveProduct(){
    this.productService.addProduct(this.createProductForm.value)
    .subscribe((e) => {
      console.log(e)
    })
  }

}
