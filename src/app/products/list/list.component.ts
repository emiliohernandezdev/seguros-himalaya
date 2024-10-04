import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public products: any[] = [];
  public categories: any[] = [];
  public providers: any[] = [];
  mostrarFiltros: boolean = false;
  public minPrice: number = 0;
  public maxPrice: number = 0;
  constructor(
    private router: Router,
    private productService: ProductService,
    private loadingCtrl: LoadingController,
    private categoryService: CategoryService,
    private providerService: ProviderService
  ) { }

  ngOnInit() {
    this.getPriceFilters();
    this.getProducts();
    this.getCategories();
    this.getProviders();
  }

  public async getPriceFilters(){
    this.productService.getProductsPriceFilter().subscribe(async (e) => {
      if (e.success == true) {
        this.minPrice = Number(e.data.min);
        this.maxPrice = Number(e.data.max);
      }
    })
  }

  public addForm() {
    this.router.navigate(['/products/create']);
  }

  public async getCategories() {
    this.categoryService.getCategories().subscribe(async (e) => {
      if (e.success == true) {
        this.categories = e.categories;
      }
    });
  }

  public async getProviders() {
    this.providerService.getProviders().subscribe(async (e) => {
      if (e.success == true) {
        this.providers = e.providers;
      }
    });
  }

  public async getProducts() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando productos...',
    });

    loading.present();
    this.productService.getProducts().subscribe(async (e) => {
      if (e.success == true) {
        this.products = e.products;
        await loading.dismiss();
      } else {
        await loading.dismiss()
      }
    });
  }

  public async filterProducts(field: string, event: any) {
    console.log(event.target.value);
    const loading = await this.loadingCtrl.create({
      message: 'Cargando productos...',
    });

    loading.present();

    var valueFilter = event.target.value;

    if (valueFilter == '') {
      await loading.dismiss();
      this.getProducts();
    } else {
      switch (field) {
        case 'category':
          this.products = this.products.filter(
            (e) => e.category.uuid == valueFilter
          );
          await loading.dismiss();
          break;

        case 'provider':
          this.products = this.products.filter(
            (e) => e.provider.uuid == valueFilter
          );

          await loading.dismiss();
          break;

        case 'price':
          this.products = this.products.filter(
            (e) => e.price >= event.target.value.lower && e.price <= event.target.value.upper
          )
          await loading.dismiss()
          break;
      }
    }
  }
}
