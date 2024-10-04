import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsertabsRoutingModule } from './usertabs-routing.module';
import { MaintabsComponent } from './maintabs/maintabs.component';
import { IonicModule } from '@ionic/angular';
import { FeedComponent } from './feed/feed.component';
import { ShopComponent } from './shop/shop.component';
import { RequestsComponent } from './requests/requests.component';
import { ProductService } from 'src/app/services/product.service';
import { PostService } from 'src/app/services/post.service';


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
  ],
  providers: [ProductService, PostService]
})
export class UsertabsModule { }
