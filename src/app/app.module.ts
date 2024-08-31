import { ApplicationConfig, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAkeTxvDeZu6zKFn83OkFE7LVQQvhgnctE",
      authDomain: "seguroshimalaya-cc45a.firebaseapp.com",
      projectId: "seguroshimalaya-cc45a",
      storageBucket: "seguroshimalaya-cc45a.appspot.com",
      messagingSenderId: "963903228895",
      appId: "1:963903228895:web:3094b5e556949af87b126a",
      measurementId: "G-0TG72D900G"
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
