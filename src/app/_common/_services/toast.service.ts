import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  isToasting = false;

  constructor(private toast: ToastController) { }

  showToast(message: string) {
    this.isToasting = true;
    this.toast.create({
      message,
      position: 'bottom',
      duration: 2500
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('Dismiss'));
        }
      });
    });
  }

  success(message: string) {
    this.isToasting = true;
    this.toast.create({
      message,
      position: 'bottom',
      duration: 2500,
      color: 'success'
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('Dismiss'));
        }
      });
    });
  }

  error(message: string) {
    this.isToasting = true;
    this.toast.create({
      message,
      position: 'bottom',
      duration: 2500,
      color: 'danger'
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('Dismiss'));
        }
      });
    });
  }

}
