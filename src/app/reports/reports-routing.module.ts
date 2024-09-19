import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { WidgetsComponent } from './widgets/widgets.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'widgets',
    component: WidgetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
