import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListComponent } from './list/list.component';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from '../services/category.service';
import { AddComponent } from './add/add.component';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    CategoryComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
