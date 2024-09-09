import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent  implements OnInit {

  public addUserForm: FormGroup;
  public roles: any[] = [];
  constructor(private fb: FormBuilder, private roleService: RoleService) { 
    this.addUserForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      authProvider: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getRoles()
  }

  public async getRoles(){
    this.roleService.getRoles().subscribe((e) => {
      if(e.success == true){
        this.roles = e.roles;
      }
    })
  }

}
