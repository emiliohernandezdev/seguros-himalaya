import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ListComponent } from './list/list.component';
import { IonicModule } from '@ionic/angular';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProviderService } from '../services/provider.service';


@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    IonicModule,
    CommonModule,
    ProvidersRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ProviderService]
})
export class ProvidersModule { }
