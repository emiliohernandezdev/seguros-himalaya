import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  public categories = [];
  constructor(private categoryService: CategoryService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.categoryService.getCategories()
    .subscribe((e) => {
      if(e.succes == true){
        this.categories = e.categories;
      }
    })
  }

  public async addModal(){
    const modal = await this.modalCtrl.create({
      component: AddComponent,
    });
    modal.present();
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}
