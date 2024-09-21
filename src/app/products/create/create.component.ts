import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
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
    private providerService: ProviderService, private loadingCtrl: LoadingController,
  private nav: NavController, private toast: ToastController) { 
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
    const loading = await this.loadingCtrl.create({
      message: 'Guardando producto...',
    });
    await loading.present()

    const toast = await this.toast.create({
      message: 'Hello World!',
      duration: 2500,
      position: 'bottom',
    });

    this.productService.addProduct(this.createProductForm.value)
    .subscribe(async (e) => {
      if(e.success == true){
        await loading.dismiss()
        
        toast.message = e.message ?? 'Producto creado con exito';
        toast.icon = 'checkmark-circle-outline';
        toast.color = 'success';
        await toast.present();
        this.nav.pop()
      }else{
        await loading.dismiss()
        toast.message = e.message ?? 'Error al crear el producto';
        toast.icon = 'alert-circle-outline';
        toast.color = 'danger';
        await toast.present();
      }
    })
  }

}
