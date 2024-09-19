import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './list/list.component';
import { ClientService } from '../services/client.service';
import { CreateComponent } from './create/create.component';
import { MaskitoDirective } from '@maskito/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ClientsRoutingModule,
    MaskitoDirective,
    ReactiveFormsModule
  ],
  providers: [ClientService]
})
export class ClientsModule { }
