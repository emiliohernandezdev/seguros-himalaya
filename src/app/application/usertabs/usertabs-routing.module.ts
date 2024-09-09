import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintabsComponent } from './maintabs/maintabs.component';
import { FeedComponent } from './feed/feed.component';
import { ShopComponent } from './shop/shop.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MaintabsComponent,
    children: [
      {
        path: 'tab1',
        component: FeedComponent
      },
      {
        path: 'tab2',
        component: ShopComponent
      },
      {
        path: 'tab3',
        component: RequestsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsertabsRoutingModule { }
