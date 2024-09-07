import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public categories: any[] = [];
  constructor(private categoryService: CategoryService, private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  public async getCategories() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando categorias...'
    });

    await loading.present();

    this.categoryService.getCategories()
      .subscribe(async (e) => {
        if (e.success == true) {
          await loading.dismiss();
          this.categories = e.categories;
        } else {
          this.categories = [];
          await loading.dismiss();
        }
      })
  }

  public async addModal() {
    const modal = await this.modalCtrl.create({
      component: AddComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
      this.categories.push(data)
    }
  }


  handleRefresh(event: any) {
    this.categories = [];
    this.getCategories()
      .then(() => {
        event.target.complete();
      })
  }

  public async cancel() {
    this.getCategories()
  }

  public async search($event: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });

    await loading.present();

    $event.preventDefault();

    this.categories = this.categories.filter((e) => e.name.toLowerCase().includes($event.target.value.toLowerCase()))
    await loading.dismiss()
  }

  public async delete(category: any) {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Desea eliminar la categoria?',
      buttons: [
        {
          text: 'Si, eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando...'
            });

            await loading.present()

            this.categoryService.deleteCategory(category.uuid)
              .subscribe(async(e) => {
                if (e.success == true) {
                  const toast = await this.toastController.create({
                    message: e.message,
                    duration: 2300,
                    position: 'bottom',
                  });
              
                  await loading.dismiss()
                  await toast.present();
                  this.categories = this.categories.filter((e) => e.uuid != category.uuid)
                }else{
                  const toast = await this.toastController.create({
                    message: e.message,
                    duration: 2300,
                    position: 'bottom',
                  });
                  await loading.dismiss()
                  await toast.present();
                }
              })
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();


  }
}
