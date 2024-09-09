import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './list/list.component';
import { UserService } from '../services/user.service';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../services/role.service';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    RoleService
  ]
})
export class UsersModule { }
