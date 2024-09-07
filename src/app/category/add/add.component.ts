import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent  implements OnInit {

  public addCategoryForm: FormGroup;
  public category: CategoryModel = new CategoryModel();
  constructor(private modalCtrl: ModalController, private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastCtrl: ToastController
  ) { 
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      color: ['', Validators.required]
    })
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    // return this.modalCtrl.dismiss(null, 'confirm');
  }


  async save(){
    const toast = await this.toastCtrl.create({
      message: 'Hello World!',
      duration: 2500,
      position: 'bottom',
    });

    
    this.categoryService.addCategory(this.addCategoryForm.value)
    .subscribe(async (e) => {
      if(e.success == true){
        toast.message = e.message;
        await toast.present()
        .then(async( ) => {
          await this.modalCtrl.dismiss(e.category, 'confirm')
        })
      }else{
        toast.message = e.message;
        await toast.present();
      }
    })
  }

}
