import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    // this.configService.getSettings().subscribe((res) => {
    //   this.applyColors(res.config);
    // })
  }

  applyColors(config: any) {
    const root = document.documentElement;
    var primary = config.find((x:any) => x.key == 'COLOR.PRIMARY');
    console.log(primary)
    if (config.primaryColor) {
      root.style.setProperty('--ion-color-primary', '#894DEB');
    }

    if (config.secondaryColor) {
      root.style.setProperty('--ion-color-secondary', config.secondaryColor);
    }

  }
}
