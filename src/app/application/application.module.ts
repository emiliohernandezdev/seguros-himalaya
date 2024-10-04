import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { IonicModule } from '@ionic/angular';
import { QuotationComponent } from './usertabs/quotation/quotation.component';
import { ProductService } from '../services/product.service';


@NgModule({
  declarations: [
    QuotationComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ApplicationRoutingModule
  ],
  providers: [ProductService]
})
export class ApplicationModule { }
