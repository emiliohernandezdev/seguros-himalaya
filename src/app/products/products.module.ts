import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { IonicModule } from '@ionic/angular';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ProviderService } from '../services/provider.service';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, CategoryService, ProviderService]
})
export class ProductsModule { }
