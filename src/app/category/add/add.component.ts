import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private categoryService: CategoryService
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


  save(){
    this.categoryService.addCategory(this.category)
    .subscribe((e) => {
      if(e.succes == true){
        this.modalCtrl.dismiss(null, 'confirm');
      }
    })
  }

}
