import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  public addForm() {
    this.router.navigate(['/posts/add']);
  }

}
