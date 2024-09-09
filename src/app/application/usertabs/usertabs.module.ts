import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsertabsRoutingModule } from './usertabs-routing.module';
import { MaintabsComponent } from './maintabs/maintabs.component';
import { IonicModule } from '@ionic/angular';
import { FeedComponent } from './feed/feed.component';
import { ShopComponent } from './shop/shop.component';
import { RequestsComponent } from './requests/requests.component';


@NgModule({
  declarations: [
    MaintabsComponent,
    FeedComponent,
    ShopComponent,
    RequestsComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    UsertabsRoutingModule
  ]
})
export class UsertabsModule { }
