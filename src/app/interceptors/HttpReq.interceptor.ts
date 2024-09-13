import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { catchError, finalize, Observable, throwError, from } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {

  private loadingElement: HTMLIonLoadingElement | null = null;

  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Usamos from() para convertir la promesa del loading en un Observable
    return from(this.showLoading()).pipe(
      switchMap(() => next.handle(request).pipe(
        finalize(() => {
          this.hideLoading();
        }),
        catchError((error: HttpErrorResponse) => {
          this.showErrorAlert(error);
          return throwError(() => error);
        })
      ))
    );
  }

  // Función para mostrar el loader
  private async showLoading() {
    if (!this.loadingElement) {
      this.loadingElement = await this.loadingCtrl.create({
        message: 'Por favor espera...',
        spinner: 'crescent',
      });
      await this.loadingElement.present();
    }
  }

  // Función para ocultar el loader
  private hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.dismiss();
      this.loadingElement = null;
    }
  }

  // Función para mostrar una alerta de error
  private async showErrorAlert(error: HttpErrorResponse) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: `Error: ${error.message}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
