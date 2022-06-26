import { Component, OnInit } from '@angular/core';

import { FireService } from 'src/app/_common/_services/fire.service';
import {Globals} from '../../_common/globals';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  public profiles : any;

  constructor(
    private globals: Globals,
    private fireService: FireService,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {
    if(!this.globals.profiles) {
      this.presentLoading();
      this.fireService.getProfiles().subscribe(data => {
        let res  = data;
        this.globals.profiles = res;
        });
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
