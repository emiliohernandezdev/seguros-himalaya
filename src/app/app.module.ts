import { ApplicationConfig, LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { AuthModule } from './auth/auth.module';
import { environment } from 'src/environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import localeEsGt from '@angular/common/locales/es-GT';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localeEsGt, 'es-Gt');

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};

const config: SocketIoConfig = { url: environment.socket, options: {} };


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    mode: 'ios',
    backButtonText: 'Atrás'
  }), AppRoutingModule, AuthModule, BrowserAnimationsModule,
  SocketIoModule.forRoot(config),
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: !isDevMode(),
    // Register the ServiceWorker as soon as the application is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    { provide: LOCALE_ID, useValue: "es-Gt" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
