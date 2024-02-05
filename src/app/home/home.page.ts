import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public coordinates: {
    latitude: number,
    longitude: number
  } = {
      latitude: 0,
      longitude: 0
    };
  public spin: boolean = false;

  constructor(private toastController: ToastController) {

    this.toastController.create({
      message: 'Request permissions...',
      duration: 2000,
      color: 'success'
    }).then(toast => {
      toast.present();
    });

    let perm = Geolocation.requestPermissions();

    this.printCurrentPosition();
    setInterval(() => {
      this.printCurrentPosition();
    }, 7000);
  }

  printCurrentPosition = async () => {
    this.spin = true;
    try {
      let coord = await Geolocation.getCurrentPosition();
      console.log('Current position:', coord);

      this.coordinates.latitude = coord.coords.latitude;
      this.coordinates.longitude = coord.coords.longitude;

      this.toastController.create({
        message: 'Position gefunden',
        duration: 2000,
        color: 'success'
      }).then(toast => {
        toast.present();
      });

    } catch (e) {
      this.toastController.create({
        message: '#E: ' + e,
        duration: 2000,
        color: 'danger'
      }).then(toast => {
        toast.present();
      });
    }
    this.spin = false;
  };
}
