import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationComponent } from './usertabs/quotation/quotation.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./usertabs/usertabs.module').then(m => m.UsertabsModule)
  },
  {
    path: 'quotation/:product',
    component: QuotationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
