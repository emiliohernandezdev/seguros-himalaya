import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { IonicModule } from '@ionic/angular';
import { QuotationComponent } from './usertabs/quotation/quotation.component';
import { ProductService } from '../services/product.service';
import { RequestService } from '../services/request.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestdetailComponent } from './usertabs/requestdetail/requestdetail.component';


@NgModule({
  declarations: [
    QuotationComponent,
    RequestdetailComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ApplicationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, RequestService]
})
export class ApplicationModule { }
