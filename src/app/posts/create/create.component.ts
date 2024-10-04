import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent  implements OnInit {

  public postForm: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService) { 
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null]
    })
  }

  ngOnInit() {}


  public savePost(){
    this.postService.addPost(this.postForm.value).subscribe((res: any) => {
      console.log(res)
    })
  }
}
