import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent  implements OnInit {

  public postForm: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService, private nav: NavController,
    private toast: ToastController
  ) { 
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null]
    })
  }

  ngOnInit() {}


  public async savePost(){
    const toast = await this.toast.create({
      message: 'Hello World!',
      duration: 3500,
      position: 'bottom',
    });
    this.postService.addPost(this.postForm.value).subscribe((res) => {
      if(res.success == true){
        toast.message = res.message ?? 'Post creado con exito';
        toast.icon = 'checkmark-circle-outline';
        toast.color = 'success';
        toast.present();
        this.nav.pop();
      }else{
        toast.message = res.message ?? 'Error al crear el post';
        toast.icon = 'alert-circle-outline';
        toast.color = 'danger';
        toast.present();
      }
    })
  }
}
