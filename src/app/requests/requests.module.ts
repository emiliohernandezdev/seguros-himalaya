import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
