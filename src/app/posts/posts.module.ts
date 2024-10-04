import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { ListComponent } from './list/list.component';
import { IonicModule } from '@ionic/angular';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PostService]
})
export class PostsModule { }
